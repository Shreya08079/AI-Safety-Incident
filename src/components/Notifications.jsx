import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon, 
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Critical System Alert',
      message: 'Multiple safety incidents detected in the last hour',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'success',
      title: 'Incident Resolved',
      message: 'Safety incident #123 has been successfully resolved',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New safety protocols have been implemented',
      time: '2 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'warning',
      title: 'Performance Warning',
      message: 'System response time is above threshold',
      time: '3 hours ago',
      read: false,
    },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />;
      case 'success':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'info':
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />;
      default:
        return <BellIcon className="w-6 h-6 text-gray-500" />;
    }
  };

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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: { x: 20, opacity: 0 },
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold"
      >
        Notifications
      </motion.div>

      <div className="flex space-x-4 mb-6">
        {['all', 'unread', 'critical', 'success', 'info', 'warning'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg ${
              filter === type
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <AnimatePresence>
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`glass-effect p-4 rounded-xl ${
                !notification.read ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                    <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Notifications; 