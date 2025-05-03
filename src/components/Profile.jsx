import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserCircleIcon,
  ShieldCheckIcon,
  BellIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    name: 'Shreya Singh',
    role: 'Safety Administrator',
    email: 'shreya08097@gmail.com',
    phone: '+91 8292017170',
    location: 'Punjab, India',
    avatar: 'https://ui-avatars.com/api/?name=Shreya+Singh&background=0D8ABC&color=fff',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    security: {
      twoFactor: true,
      lastLogin: '2024-03-15 14:30',
      devices: [
        { name: 'MacBook Pro', lastActive: '2024-03-15 14:30' },
        { name: 'iPhone 12', lastActive: '2024-03-15 13:45' },
      ],
    },
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: UserCircleIcon },
    { id: 'security', label: 'Security', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
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
        className="text-3xl font-bold flex items-center gap-3"
      >
        <span role="img" aria-label="wave">👋</span> Hello, {user.name.split(' ')[0]}!
      </motion.div>

      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-effect p-8 rounded-2xl shadow-xl max-w-2xl mx-auto relative"
      >
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="flex items-center space-x-8">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-28 h-28 rounded-full border-4 border-blue-400 shadow-lg animate-float"
                  style={{ boxShadow: '0 0 0 6px rgba(59,130,246,0.15)' }}
                />
                <span className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">Verified</span>
              </div>
              <div>
                <h2 className="text-3xl font-extrabold flex items-center gap-2">{user.name}</h2>
                <p className="text-blue-400 font-semibold">{user.role}</p>
                <div className="flex items-center space-x-3 mt-2">
                  <a href={`mailto:${user.email}`} className="hover:text-blue-400 transition"><EnvelopeIcon className="w-5 h-5 inline" /></a>
                  <a href={`tel:${user.phone}`} className="hover:text-blue-400 transition"><PhoneIcon className="w-5 h-5 inline" /></a>
                </div>
              </div>
            </div>

            {/* User Stats Row */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mt-6">
              <div className="flex-1 bg-white/10 rounded-xl p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-blue-400">12</span>
                <span className="text-gray-300 text-xs mt-1">Incidents Reported</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-green-400">{user.security.devices.length}</span>
                <span className="text-gray-300 text-xs mt-1">Active Devices</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-xl p-4 flex flex-col items-center">
                <span className="text-lg font-bold text-yellow-400">{user.security.lastLogin}</span>
                <span className="text-gray-300 text-xs mt-1">Last Login</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span>Last Login</span>
                    <span className="text-gray-400">{user.security.lastLogin}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span>Active Sessions</span>
                    <span className="text-gray-400">{user.security.devices.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center space-x-3">
                <KeyIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={user.security.twoFactor}
                  onChange={() => setUser({
                    ...user,
                    security: {
                      ...user.security,
                      twoFactor: !user.security.twoFactor,
                    },
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Active Devices</h3>
              {user.security.devices.map((device, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="font-medium">{device.name}</p>
                    <p className="text-sm text-gray-400">Last active: {device.lastActive}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-600">Sign Out</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Email Notifications</h3>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.notifications.email}
                    onChange={() => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        email: !user.notifications.email,
                      },
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <BellIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">Push Notifications</h3>
                    <p className="text-sm text-gray-400">Receive push notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.notifications.push}
                    onChange={() => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        push: !user.notifications.push,
                      },
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <h3 className="font-semibold">SMS Notifications</h3>
                    <p className="text-sm text-gray-400">Receive SMS alerts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.notifications.sms}
                    onChange={() => setUser({
                      ...user,
                      notifications: {
                        ...user.notifications,
                        sms: !user.notifications.sms,
                      },
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile; 