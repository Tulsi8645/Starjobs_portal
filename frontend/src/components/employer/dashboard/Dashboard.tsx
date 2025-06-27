import React from 'react';
import { Eye, FileText, CheckCircle, Clock } from 'lucide-react';

interface Stat {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface Activity {
  id: number;
  action: string;
  user: string;
  email: string;
  time: string;
  avatar: string;
}

interface Application {
  id: number;
  name: string;
  location: string;
  position: string;
  avatar: string;
}

const Dashboard = () => {
  const stats: Stat[] = [
    { id: 1, title: 'Total Jobs', value: '4', icon: <FileText className="text-green-500" size={24} /> },
    { id: 2, title: 'Total Applicant', value: '5', icon: <FileText className="text-yellow-500" size={24} /> },
    { id: 3, title: 'Shortlisted', value: '5', icon: <CheckCircle className="text-blue-500" size={24} /> },
    { id: 4, title: 'Views', value: '5', icon: <Eye className="text-primary" size={24} /> }
  ];

  const initialActivities: Activity[] = [
    {
      id: 1,
      action: 'Password Reset Successfully',
      user: 'John Doe',
      email: 'johndoe@gmail.com',
      time: '10 mins Ago',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    // Duplicate entries for demonstration
  ];

  const activities: Activity[] = initialActivities.concat(Array(2).fill(initialActivities?.[0]));

  const applications: Application[] = [
    {
      id: 1,
      name: 'Mary Jane',
      location: 'Kathmandu',
      position: 'UI/UX Designer',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    {
      id: 2,
      name: 'Peter Parker',
      location: 'Kathmandu',
      position: 'UI/UX Designer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    {
      id: 3,
      name: 'Flash',
      location: 'Kathmandu',
      position: 'UI/UX Designer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    }
  ];

  return (
    <div className="min-h-screen overflow-auto bg-gray-50 p-6"  style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-gray-600 mt-1">{stat.title}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[35%_65%] gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {activities.map((activity: Activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-primary">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.user} | {activity.email}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Applications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">New Application</h2>
            <div className="space-y-4">
              {applications.map((application: Application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={application.avatar}
                      alt={application.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{application.name}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{application.location}</span>
                        <span className="mx-2">•</span>
                        <span>{application.position}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                      Download Resume
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      View Profile
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Clock size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;