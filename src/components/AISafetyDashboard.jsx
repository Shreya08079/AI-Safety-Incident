import React, { useState, useEffect, useRef } from 'react';
import { initialIncidents, addNewIncident } from '../data/incidentsData';
import './AISafetyDashboard.css';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  ClockIcon,
  InformationCircleIcon,
  DownloadIcon,
  PlusCircleIcon,
  ChartBarIcon as ChartBarSolidIcon,
  CloudArrowDownIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AISafetyDashboard = () => {
  // State management
  const [incidents, setIncidents] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedIncidents, setExpandedIncidents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });

  const reportFormRef = useRef(null);
  const navigate = useNavigate();

  // Tooltip content for each stat
  const statTooltips = {
    'Total Incidents': 'Total number of incidents detected by the system.',
    'Resolved': 'Number of incidents that have been resolved.',
    'Pending': 'Number of incidents still pending resolution.',
    'Success Rate': 'Percentage of incidents resolved successfully.'
  };

  // Map stat to filter value
  const statToFilter = {
    'Total Incidents': 'All',
    'Resolved': 'Resolved', // You can implement this if you have a resolved field
    'Pending': 'Pending',   // You can implement this if you have a pending field
    'Success Rate': 'All',
  };

  // Track which stat card is active (for highlight)
  const [activeStat, setActiveStat] = useState('Total Incidents');

  // For react-select severity filter
  const severityOptions = [
    { value: 'All', label: 'All', color: '#64748b' },
    { value: 'Low', label: 'Low', color: '#22c55e' },
    { value: 'Medium', label: 'Medium', color: '#facc15' },
    { value: 'High', label: 'High', color: '#ef4444' },
  ];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#232b3e',
      borderColor: state.isFocused ? '#3b82f6' : '#232b3e',
      boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : 'none',
      color: '#f3f4f6',
      borderRadius: '0.75rem',
      minWidth: 160,
      fontWeight: 500,
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#232b3e',
      color: '#f3f4f6',
      borderRadius: '0.75rem',
      marginTop: 2,
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? '#334155'
        : '#232b3e',
      color: state.isSelected ? '#fff' : '#f3f4f6',
      fontWeight: state.isSelected ? 700 : 500,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#f3f4f6',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#64748b',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    input: (provided) => ({ ...provided, color: '#f3f4f6' }),
  };

  const getBadge = (option) => (
    <span style={{
      display: 'inline-block',
      width: 12,
      height: 12,
      borderRadius: '50%',
      background: option.color,
      marginRight: 8,
    }} />
  );

  // Load initial data
  useEffect(() => {
    setIncidents(initialIncidents);
  }, []);

  // Filter and sort incidents
  const filteredIncidents = incidents.filter(incident => 
    severityFilter === 'All' || incident.severity === severityFilter
  );

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    const dateA = new Date(a.reported_at).getTime();
    const dateB = new Date(b.reported_at).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Toggle incident details
  const toggleDetails = (id) => {
    setExpandedIncidents(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const updatedIncidents = addNewIncident(incidents, formData);
    setIncidents(updatedIncidents);
    setFormData({ title: '', description: '', severity: 'Medium' });
    setShowForm(false);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Safety Incidents',
        data: [12, 19, 15, 17, 14, 13],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.4,
      },
      {
        label: 'Resolved Incidents',
        data: [10, 15, 12, 14, 11, 10],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Safety Incidents Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const stats = [
    {
      title: 'Total Incidents',
      value: '156',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
    },
    {
      title: 'Resolved',
      value: '142',
      icon: CheckCircleIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Pending',
      value: '14',
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      title: 'Success Rate',
      value: '91%',
      icon: ChartBarIcon,
      color: 'bg-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  // Handle stat card click
  const handleStatClick = (stat) => {
    setActiveStat(stat.title);
    if (stat.title === 'Pending') {
      setSeverityFilter('High'); // Example: Pending = High severity
    } else if (stat.title === 'Resolved') {
      setSeverityFilter('Low'); // Example: Resolved = Low severity (customize as needed)
    } else {
      setSeverityFilter('All');
    }
  };

  const handleReportIncident = () => {
    setShowForm(true);
    setTimeout(() => {
      reportFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleDownloadReport = () => {
    // Generate a detailed report
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ', ' + now.toLocaleTimeString();
    let report = '';
    report += 'AI Safety Dashboard Report\n';
    report += '=========================\n';
    report += `Generated for: Shreya Singh\n`;
    report += `Date: ${dateStr}\n\n`;
    report += `Summary:\n- Total Incidents: ${incidents.length}\n\n`;
    report += 'Incidents:\n';
    incidents.forEach((incident, idx) => {
      report += `${idx + 1}. [${incident.severity}] ${incident.title} (${incident.reported_at.slice(0, 10)})\n`;
      report += `   ${incident.description}\n\n`;
    });
    const blob = new Blob([report], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ai-safety-report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', severity: 'Medium' });

  // Delete incident
  const handleDeleteIncident = (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      setIncidents(incidents.filter(inc => inc.id !== id));
    }
  };

  // Start editing
  const handleEditIncident = (incident) => {
    setEditingId(incident.id);
    setEditData({ title: incident.title, description: incident.description, severity: incident.severity });
  };

  // Save edit
  const handleSaveEdit = (id) => {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, ...editData } : inc));
    setEditingId(null);
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="glass-effect p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-xl mb-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">Welcome back, Shreya! 👋</h2>
          <p className="text-gray-300 text-lg">Empowering safe and responsible AI, every day.</p>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button onClick={handleReportIncident} className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-3 rounded-xl shadow card-animate transition">
          <PlusCircleIcon className="w-6 h-6" /> Report Incident
        </button>
        <button onClick={handleViewAnalytics} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl shadow card-animate transition">
          <ChartBarSolidIcon className="w-6 h-6" /> View Analytics
        </button>
        <button onClick={handleDownloadReport} className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold px-5 py-3 rounded-xl shadow card-animate transition">
          <CloudArrowDownIcon className="w-6 h-6" /> Download Report
        </button>
      </div>

      {/* Wavy SVG Divider */}
      <div className="w-full overflow-hidden mb-8">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
          <path fill="#3b82f6" fillOpacity="0.08" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* Recent Activity Feed */}
      <div className="glass-effect p-6 rounded-2xl shadow mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center gap-3 text-gray-200">
            <PlusCircleIcon className="w-5 h-5 text-blue-400" /> New incident reported: <span className="font-semibold text-white">Unauthorized Model Access Attempt</span> <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
          </li>
          <li className="flex items-center gap-3 text-gray-200">
            <ChartBarSolidIcon className="w-5 h-5 text-green-400" /> Analytics viewed <span className="ml-auto text-xs text-gray-400">Today</span>
          </li>
          <li className="flex items-center gap-3 text-gray-200">
            <CloudArrowDownIcon className="w-5 h-5 text-purple-400" /> Report downloaded <span className="ml-auto text-xs text-gray-400">Yesterday</span>
          </li>
        </ul>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        AI Safety Dashboard
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)' }}
            className={`glass-effect card-animate p-6 rounded-xl cursor-pointer transition-all relative border-2 ${activeStat === stat.title ? 'border-blue-500 shadow-lg' : 'border-transparent'}`}
            onClick={() => handleStatClick(stat)}
            data-tooltip-id={`stat-tooltip-${index}`}
            data-tooltip-content={statTooltips[stat.title]}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <ReactTooltip id={`stat-tooltip-${index}`} place="top" effect="solid" className="z-50" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="glass-effect card-animate p-6 rounded-xl"
      >
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <motion.div variants={itemVariants} className="glass-effect card-animate p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Recent Incidents</h3>
          <div className="space-y-4">
            {(() => {
              const [expandedRecent, setExpandedRecent] = useState(null);
              // Example static data for demonstration
              const recentIncidents = [
                { id: 1, title: 'Incident #1', description: 'Unauthorized access attempt detected from external IP. Blocked and logged for review.', severity: 'Critical', time: '2 hours ago' },
                { id: 2, title: 'Incident #2', description: 'Model output flagged for potential bias. Review required by compliance team.', severity: 'Critical', time: '2 hours ago' },
                { id: 3, title: 'Incident #3', description: 'Unusual spike in API requests detected. Possible misuse or attack.', severity: 'Critical', time: '2 hours ago' },
              ];
              return recentIncidents.map((item) => (
                <div
                  key={item.id}
                  className={`flex flex-col transition-all bg-white/5 rounded-xl shadow-md border border-white/10 group cursor-pointer ${expandedRecent === item.id ? 'ring-2 ring-blue-400' : ''}`}
                  onClick={() => setExpandedRecent(expandedRecent === item.id ? null : item.id)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <ExclamationTriangleIcon className="w-7 h-7 text-red-500 bg-red-100 rounded-full p-1 shadow" />
                      <div>
                        <p className="font-bold text-white text-base">{item.title}</p>
                        <p className="text-sm text-gray-400">Detected {item.time}</p>
                      </div>
                    </div>
                    <span className="px-4 py-1 rounded-full text-sm font-bold bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition">{item.severity}</span>
                  </div>
                  {/* Expandable details */}
                  {expandedRecent === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 text-gray-200"
                    >
                      <p className="text-base leading-relaxed">{item.description}</p>
                    </motion.div>
                  )}
                </div>
              ));
            })()}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-effect card-animate p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">System Status</h3>
          <div className="space-y-4">
            {[
              { name: 'AI Model', status: 'Operational', color: 'bg-green-500' },
              { name: 'Safety Checks', status: 'Active', color: 'bg-green-500' },
              { name: 'Monitoring', status: 'Running', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span>{item.name}</span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-400">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Controls Section */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0 mb-6">
        <div className="flex items-center space-x-2">
          <label htmlFor="severity-filter" className="text-gray-400 font-medium">Filter by Severity:</label>
          <div className="min-w-[160px]">
            <Select
              id="severity-filter"
              options={severityOptions}
              value={severityOptions.find(opt => opt.value === severityFilter)}
              onChange={opt => setSeverityFilter(opt.value)}
              styles={customSelectStyles}
              isSearchable={false}
              components={{ Option: props => (
                <div {...props.innerProps} style={props.getStyles('option', props)}>
                  {getBadge(props.data)} {props.data.label}
                </div>
              ),
              SingleValue: props => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {getBadge(props.data)} {props.data.label}
                </div>
              )}}
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-gray-400 font-medium">Sort by Date:</label>
          <button
            onClick={() => setSortOrder('newest')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sortOrder === 'newest' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
          >
            Newest First
          </button>
          <button
            onClick={() => setSortOrder('oldest')}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${sortOrder === 'oldest' ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
          >
            Oldest First
          </button>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="ml-auto bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded-lg shadow transition-all"
        >
          {showForm ? 'Cancel' : 'Report New Incident'}
        </button>
      </div>

      {showForm && (
        <form ref={reportFormRef} onSubmit={handleSubmit} className="glass-effect max-w-4xl mx-auto p-8 rounded-2xl shadow-xl mt-10 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Report New Incident</h2>
          <div className="form-group">
            <label htmlFor="title" className="block text-gray-200 font-semibold mb-2">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full bg-[#232b3e] text-white rounded-lg px-4 py-3 border border-[#334155] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-gray-200 font-semibold mb-2">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full bg-[#232b3e] text-white rounded-lg px-4 py-3 border border-[#334155] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition min-h-[100px]"
            />
          </div>

          <div className="form-group">
            <label htmlFor="severity" className="block text-gray-200 font-semibold mb-2">Severity:</label>
            <div className="min-w-[160px]">
              <Select
                id="severity"
                name="severity"
                options={severityOptions.slice(1)}
                value={severityOptions.find(opt => opt.value === formData.severity)}
                onChange={opt => setFormData(prev => ({ ...prev, severity: opt.value }))}
                styles={customSelectStyles}
                isSearchable={false}
                components={{ Option: props => (
                  <div {...props.innerProps} style={props.getStyles('option', props)}>
                    {getBadge(props.data)} {props.data.label}
                  </div>
                ),
                SingleValue: props => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getBadge(props.data)} {props.data.label}
                  </div>
                )}}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg shadow card-animate transition w-full md:w-auto">
            Submit Incident
          </button>
        </form>
      )}

      {/* Incident List Section */}
      <div className="incidents-list space-y-6 mt-10">
        {sortedIncidents.length > 0 ? (
          sortedIncidents.map((incident, idx) => {
            let icon, badgeColor, iconBg;
            if (incident.severity === 'High') {
              icon = <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />;
              badgeColor = 'bg-red-100 text-red-600';
              iconBg = 'bg-red-100';
            } else if (incident.severity === 'Medium') {
              icon = <InformationCircleIcon className="w-6 h-6 text-yellow-500" />;
              badgeColor = 'bg-yellow-100 text-yellow-700';
              iconBg = 'bg-yellow-100';
            } else {
              icon = <CheckCircleIcon className="w-6 h-6 text-green-500" />;
              badgeColor = 'bg-green-100 text-green-700';
              iconBg = 'bg-green-100';
            }
            const isEditing = editingId === incident.id;
            return (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
                className="glass-effect card-animate p-6 rounded-2xl shadow-lg border border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left: Icon, Title, Description */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`p-2 rounded-full ${iconBg} shadow-md flex-shrink-0`}>{icon}</div>
                    <div className="flex flex-col min-w-0">
                      {isEditing ? (
                        <>
                          <input
                            className="bg-[#232b3e] text-white rounded-lg px-2 py-1 border border-[#334155] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none font-bold text-lg mb-1"
                            value={editData.title}
                            onChange={e => setEditData(ed => ({ ...ed, title: e.target.value }))}
                          />
                          <textarea
                            className="bg-[#232b3e] text-white rounded-lg px-2 py-1 border border-[#334155] focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                            value={editData.description}
                            onChange={e => setEditData(ed => ({ ...ed, description: e.target.value }))}
                          />
                          <div className="min-w-[120px] mt-2">
                            <Select
                              options={severityOptions.slice(1)}
                              value={severityOptions.find(opt => opt.value === editData.severity)}
                              onChange={opt => setEditData(ed => ({ ...ed, severity: opt.value }))}
                              styles={customSelectStyles}
                              isSearchable={false}
                              components={{ Option: props => (
                                <div {...props.innerProps} style={props.getStyles('option', props)}>
                                  {getBadge(props.data)} {props.data.label}
                                </div>
                              ),
                              SingleValue: props => (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {getBadge(props.data)} {props.data.label}
                                </div>
                              )}}
                              menuPortalTarget={document.body}
                              menuPosition="fixed"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-extrabold text-white mb-1 break-words">{incident.title}</h3>
                          <p className="text-gray-400 text-base truncate max-w-full">{incident.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                  {/* Right: Severity, Date, Actions */}
                  <div className="flex flex-col items-end gap-3 min-w-[220px]">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}>{incident.severity}</span>
                      <span className="text-gray-400 text-sm whitespace-nowrap">{formatDate(incident.reported_at)}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {isEditing ? (
                        <>
                          <button onClick={() => handleSaveEdit(incident.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"><CheckIcon className="w-4 h-4" />Save</button>
                          <button onClick={handleCancelEdit} className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"><XMarkIcon className="w-4 h-4" />Cancel</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEditIncident(incident)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"><PencilSquareIcon className="w-4 h-4" />Edit</button>
                          <button onClick={() => handleDeleteIncident(incident.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1"><TrashIcon className="w-4 h-4" />Delete</button>
                        </>
                      )}
                      <motion.button
                        onClick={() => toggleDetails(incident.id)}
                        whileTap={{ scale: 0.97 }}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-all"
                      >
                        {expandedIncidents.includes(incident.id) ? 'Hide Details' : 'View Details'}
                      </motion.button>
                    </div>
                  </div>
                </div>
                {/* Details full width below */}
                {expandedIncidents.includes(incident.id) && !isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="w-full mt-6 bg-white/10 rounded-lg p-4 text-gray-200"
                  >
                    <p className="text-base leading-relaxed">{incident.description}</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })
        ) : (
          <p className="no-results text-center text-gray-400">No incidents found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default AISafetyDashboard;