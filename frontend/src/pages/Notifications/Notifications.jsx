import { useState, useEffect } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Mock data
    setNotifications([
      { id: 1, type: "order", title: "New Order Received", message: "You have received a new order #ORD-1234", time: "5 minutes ago", read: false, important: true },
      { id: 2, type: "inventory", title: "Low Stock Alert", message: "Wireless Earbuds stock is running low (5 units left)", time: "1 hour ago", read: false, important: true },
      { id: 3, type: "payment", title: "Payment Processed", message: "Payment of ₹2,499 for order #ORD-1234 has been processed", time: "2 hours ago", read: true, important: false },
      { id: 4, type: "system", title: "System Update", message: "New features are available in your seller dashboard", time: "1 day ago", read: true, important: false },
      { id: 5, type: "promotion", title: "Promotion Opportunity", message: "Boost your sales with our new promotion features", time: "2 days ago", read: true, important: false },
    ]);
  }, []);

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(notif => notif.type === filter);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'order': return '📦';
      case 'inventory': return '📋';
      case 'payment': return '💰';
      case 'system': return '⚙️';
      case 'promotion': return '🎯';
      default: return '🔔';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'inventory': return 'bg-orange-100 text-orange-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-purple-100 text-purple-800';
      case 'promotion': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">Stay updated with your store activities</p>
          </div>
          <button
            onClick={markAllAsRead}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mark All as Read
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex space-x-2">
            {['all', 'order', 'inventory', 'payment', 'system', 'promotion'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type === 'all' ? 'All Notifications' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border ${
                notification.read ? 'border-gray-200' : 'border-blue-200 bg-blue-50'
              } p-6 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${getTypeColor(notification.type)}`}>
                    <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                      {!notification.read && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {notification.important && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔔</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500">You're all caught up! New notifications will appear here.</p>
          </div>
        )}

        {/* Notification Settings */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Manage email alert preferences</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Push Notifications</p>
              <p className="text-sm text-gray-600">Configure browser push notifications</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">SMS Alerts</p>
              <p className="text-sm text-gray-600">Set up SMS notifications</p>
            </button>
            <button className="text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-900">Quiet Hours</p>
              <p className="text-sm text-gray-600">Schedule do-not-disturb periods</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;