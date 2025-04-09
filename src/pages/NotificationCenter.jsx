import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import {
  Bell,
  Briefcase,
  Calendar,
  MessageSquare,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Trash2
} from 'lucide-react';

const NotificationCenter = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'job_match',
      title: 'New Job Match',
      message: 'Frontend Developer position at TechNova Solutions matches your profile',
      date: '2025-03-18T10:30:00',
      read: false,
      link: '/jobs/frontend-developer-technova'
    },
    {
      id: 2,
      type: 'application_update',
      title: 'Application Status Update',
      message: 'Your application for Data Analyst at DataViz Corp has moved to interview stage',
      date: '2025-03-17T15:45:00',
      read: true,
      link: '/applications/2'
    },
    {
      id: 3,
      type: 'event',
      title: 'Upcoming Event',
      message: 'Mock Interview session scheduled for tomorrow at 10:00 AM',
      date: '2025-03-16T09:00:00',
      read: false,
      link: '/events/mock-interview-session'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'New Achievement Unlocked',
      message: 'Congratulations! You\'ve earned the "Interview Pro" badge',
      date: '2025-03-15T14:20:00',
      read: true,
      link: '/achievements'
    }
  ]);

  const notificationTypes = {
    job_match: {
      icon: Briefcase,
      color: 'text-blue-600 bg-blue-100'
    },
    application_update: {
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100'
    },
    event: {
      icon: Calendar,
      color: 'text-purple-600 bg-purple-100'
    },
    achievement: {
      icon: Award,
      color: 'text-yellow-600 bg-yellow-100'
    },
    message: {
      icon: MessageSquare,
      color: 'text-indigo-600 bg-indigo-100'
    }
  };

  const tabs = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'job_match', label: 'Job Matches', count: notifications.filter(n => n.type === 'job_match').length },
    { id: 'application_update', label: 'Applications', count: notifications.filter(n => n.type === 'application_update').length },
    { id: 'event', label: 'Events', count: notifications.filter(n => n.type === 'event').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <>
      <Header />
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Page Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-1">Notification Center</h1>
                <p className="text-gray-600">Stay updated with your career journey</p>
              </div>
              <button className="btn btn-outline flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Notification Tabs */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="border-b">
              <div className="flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 text-sm font-medium whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-gray-200">
              {filteredNotifications.map(notification => {
                const NotificationIcon = notificationTypes[notification.type].icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${notificationTypes[notification.type].color} mr-4`}>
                        <NotificationIcon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              {formatDate(notification.date)}
                            </span>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="ml-4 text-gray-400 hover:text-gray-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex items-center gap-4">
                          <a
                            href={notification.link}
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                          >
                            View Details
                          </a>
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-sm text-gray-500 hover:text-gray-700"
                            >
                              Mark as Read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredNotifications.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="mt-1">We'll notify you when something new arrives</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotificationCenter;