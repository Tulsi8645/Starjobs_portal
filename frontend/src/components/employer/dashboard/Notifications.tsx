import React from 'react';
import { MoreVertical } from 'lucide-react';

const notifications = [
  {
    id: 1,
    user: {
      name: 'Mary Jane',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'
    },
    message: 'has posted a new job post',
    description: 'See it and view more job details.',
    time: '2h ago'
  },
   {
    id: 2,
    user: {
      name: 'Mary Jane',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'
    },
    message: 'has posted a new job post',
    description: 'See it and view more job details.',
    time: '2h ago'
  },
   {
    id: 3,
    user: {
      name: 'Mary Jane',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=1'
    },
    message: 'has posted a new job post',
    description: 'See it and view more job details.',
    time: '2h ago'
  },
  
];

const Notifications = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg">
          <div className="border-b pb-4">
            <h1 className="text-2xl font-bold">Notifications</h1>
          </div>

          <div className="flex space-x-2 my-4">
            <button className="px-4 py-1 bg-primary text-white rounded-full text-sm">
              All
            </button>
            <button className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
              Posts
            </button>
            <button className="px-4 py-1 text-gray-600 hover:bg-gray-100 rounded-full text-sm">
              Jobs
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start justify-between p-4 hover:bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <img
                    src={notification.user.avatar}
                    alt={notification.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800">
                      <span className="font-medium">{notification.user.name}</span>{' '}
                      {notification.message}
                    </p>
                    <p className="text-gray-500 text-sm">{notification.description}</p>
                    <p className="text-gray-400 text-sm mt-1">{notification.time}</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;