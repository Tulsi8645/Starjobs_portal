import React from 'react';
import { MapPin, Clock, Eye } from 'lucide-react';

const UserDashboard = () => {
  const stats = [
    {
      id: 1,
      title: 'Applied Jobs',
      value: '3',
      icon: '📝'
    },
    {
      id: 2,
      title: 'Rejected',
      value: '0',
      icon: '❌'
    },
    {
      id: 3,
      title: 'Saved Jobs',
      value: '5',
      icon: '🔖'
    }
  ];

  const activities = [
    {
      id: 1,
      action: 'Password Reset Successfully',
      user: 'John Doe',
      email: 'johndoe@gmail.com',
      time: '10 mins Ago',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    }
  ];

  const appliedJobs = [
    {
      id: 1,
      title: 'Graphics Designer',
      location: 'Kathmandu',
      type: 'Full Time'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      location: 'Kathmandu',
      type: 'Full Time'
    },
    {
      id: 3,
      title: 'Backend Developer',
      location: 'Kathmandu',
      type: 'Full Time'
    },
    {
      id: 4,
      title: 'SEO Expert',
      location: 'Kathmandu',
      type: 'Full Time'
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      location: 'Kathmandu',
      type: 'Full Time'
    },
    {
      id: 6,
      title: 'Accountant',
      location: 'Kathmandu',
      type: 'Full Time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-gray-600 mt-1">{stat.title}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <img
                    src={activities[0].avatar}
                    alt={activities[0].user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-primary">{activities[0].action}</p>
                    <p className="text-sm text-gray-500">
                      {activities[0].user} | {activities[0].email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activities[0].time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
            <div className="space-y-4">
              {appliedJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;