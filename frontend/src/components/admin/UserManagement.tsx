import React, { useState } from 'react';
import { Search, UserPlus, FileText, Eye, Trash2, Bell } from 'lucide-react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('employer');

  const users = [
    {
      id: 1,
      name: 'Sitasma Karki',
      email: 'karkisiwani298@gmail.com',
      type: 'Employer',
      status: 'Active',
      joinedDate: '2024 Jan 2',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    {
      id: 2,
      name: 'Riya Neupane',
      email: 'riya234@gmail.com',
      type: 'Employer',
      status: 'Pending',
      joinedDate: '2024 Jan 2',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    // Add more users to demonstrate scrolling
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'Job Seeker',
      status: 'Active',
      joinedDate: '2024 Feb 15',
      avatar: 'https://via.placeholder.com/32'
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      type: 'Employer',
      status: 'Active',
      joinedDate: '2024 Mar 1',
      avatar: 'https://via.placeholder.com/32'
    },
    {
      id: 5,
      name: 'Peter Jones',
      email: 'peter.jones@example.com',
      type: 'Job Seeker',
      status: 'Pending',
      joinedDate: '2024 Mar 20',
      avatar: 'https://via.placeholder.com/32'
    },
    {
      id: 6,
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      type: 'Employer',
      status: 'Active',
      joinedDate: '2024 Apr 5',
      avatar: 'https://via.placeholder.com/32'
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 "> 
        <h1 className="text-2xl font-semibold">User Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
              <Bell size={20} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1"
              alt="Admin"
              className="w-8 h-8 rounded-full"
            />
            <span>Riya Neupane Admin</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6 bg-white pt-6"> 
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Users..."
                className="pl-10 pr-4 py-2 border rounded-lg w-64"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Users</option>
            </select>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Status</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <UserPlus size={20} className="mr-2" />
              Add Users
            </button>
            <button className="px-4 py-2 border rounded-lg flex items-center">
              <FileText size={20} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="mb-6 sticky top-16 bg-white pt-6">
          <button
            className={`mr-4 pb-2 ${
              activeTab === 'employer'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('employer')}
          >
            Employer List
          </button>
          <button
            className={`pb-2 ${
              activeTab === 'jobseeker'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('jobseeker')}
          >
            Job Seeker List
          </button>
        </div>

        <div className="overflow-auto" style={{ maxHeight: '220px' }}> {/* Scrollable table container */}
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white sticky top-0"> {/* Sticky table header */}
                <th className="px-6 py-3 text-left w-8">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left">USER</th>
                <th className="px-6 py-3 text-left">TYPE</th>
                <th className="px-6 py-3 text-left">STATUS</th>
                <th className="px-6 py-3 text-left">JOINED DATE</th>
                <th className="px-6 py-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {user.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.joinedDate}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye size={20} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 ml-2">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Showing 1 to {users.length} of {users.length} results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border rounded" disabled>Previous</button>
            <button className="px-3 py-1 border rounded" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;