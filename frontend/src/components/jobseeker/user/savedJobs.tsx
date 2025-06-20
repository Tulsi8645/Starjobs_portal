import React from 'react';
import { Search, MapPin, Clock, Trash2 } from 'lucide-react';

const UserSavedJobs = () => {
  const savedJobs = Array(8).fill({
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'Technology Tech',
    postedDate: 'Mar 15, 2025',
    deadline: 'Mar 31, 2025',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
  });

  return (
    <div className="min-h-screen overflow-auto bg-gray-50 p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Bookmark</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <select className="px-4 py-2 border rounded-lg">
                <option>Newest First</option>
                <option>Oldest First</option>
              </select>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-6 py-3 text-left">Job Title</th>
                <th className="px-6 py-3 text-left">Company Detail</th>
                <th className="px-6 py-3 text-left">Deadline Date</th>
                <th className="px-6 py-3 text-left">Job posted</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {savedJobs.map((job, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-10 h-10 rounded-lg mr-3"
                      />
                      <div>
                        <div className="font-medium">{job.title}</div>
                        <div className="text-sm text-gray-500">{job.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      <span>Remote</span>
                      <span className="mx-2">•</span>
                      <Clock size={16} className="mr-2" />
                      <span>Full Time</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{job.deadline}</td>
                  <td className="px-6 py-4">{job.postedDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <button className="text-primary hover:text-primary/80">
                        View Details
                      </button>
                      <button className="text-red-500 hover:text-red-600">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserSavedJobs;