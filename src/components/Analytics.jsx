import React from 'react';
import { motion } from 'framer-motion';
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  // Line Chart Data
  const lineChartData = {
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

  // Bar Chart Data
  const barChartData = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Incidents by Severity',
        data: [5, 8, 12, 7],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(234, 179, 8, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
        ],
      },
    ],
  };

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: ['Resolved', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(234, 179, 8, 0.8)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const stats = [
    {
      title: 'Total Incidents',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'bg-blue-500',
    },
    {
      title: 'Resolution Rate',
      value: '91%',
      change: '+5%',
      trend: 'up',
      icon: ArrowTrendingUpIcon,
      color: 'bg-green-500',
    },
    {
      title: 'Average Response Time',
      value: '2.5h',
      change: '-15%',
      trend: 'down',
      icon: ClockIcon,
      color: 'bg-yellow-500',
    },
    {
      title: 'Critical Issues',
      value: '8',
      change: '-3%',
      trend: 'down',
      icon: ArrowTrendingDownIcon,
      color: 'bg-red-500',
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Analytics Dashboard
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            variants={itemVariants}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.change}
                  </span>
                  <stat.icon className={`w-4 h-4 ml-1 ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Incident Trends</h3>
          <Line data={lineChartData} options={chartOptions} />
        </motion.div>

        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Severity Distribution</h3>
          <Bar data={barChartData} options={chartOptions} />
        </motion.div>

        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Resolution Status</h3>
          <Doughnut data={doughnutChartData} options={chartOptions} />
        </motion.div>

        <motion.div variants={itemVariants} className="glass-effect p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-4">Key Metrics</h3>
          <div className="space-y-4">
            {[
              { label: 'Average Resolution Time', value: '4.2 hours' },
              { label: 'First Response Time', value: '15 minutes' },
              { label: 'Customer Satisfaction', value: '92%' },
              { label: 'System Uptime', value: '99.9%' },
            ].map((metric) => (
              <div key={metric.label} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <span className="text-gray-400">{metric.label}</span>
                <span className="font-semibold">{metric.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Analytics; 