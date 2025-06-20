import { useState } from 'react';
import { Search, Eye, Trash2, Bell } from 'lucide-react';

const ReportsManagement = () => {
  const stats = [
    {
      id: 1,
      title: 'Total Post Reported',
      value: '10,000',
    },
    {
      id: 2,
      title: 'Total Spam Posting',
      value: '200',
    },
    {
      id: 3,
      title: 'Total Profiles Reported',
      value: '30',
    },
  ];

  const reports = [
    {
      id: '#12345',
      content: 'Inappropriate content in post #12345',
      postedBy: 'Riya Neupane',
      time: '2 hours ago',
      reporters: 3,
      status: 'Pending',
    },
    {
      id: '#12345',
      content: 'Inappropriate content in post #12345',
      postedBy: 'Riya Neupane',
      time: '2 hours ago',
      reporters: 3,
      status: 'Resolved',
    },
    {
      id: '#12345',
      content: 'Inappropriate content in post #12345',
      postedBy: 'Riya Neupane',
      time: '2 hours ago',
      reporters: 3,
      status: 'Resolved',
    },
  ];

  const [activeTab, setActiveTab] = useState('post');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  

  return (
    <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 50px)' }} >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Reports Management</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-600">{stat.title}</div>
              </div>
              <button className="text-gray-400">→</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-b mb-6">
          <div className="flex space-x-4">
            <button
              className={`pb-4 px-2 ${
                activeTab === 'post'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('post')}
            >
              Post reports
            </button>
            <button
              className={`pb-4 px-2 ${
                activeTab === 'manage'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('manage')}
            >
              Manage reports
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Reports Management</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Reports..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Posts</option>
            </select>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th className="px-6 py-3 text-left">Post ID</th>
              <th className="px-6 py-3 text-left">Content</th>
              <th className="px-6 py-3 text-left">Reporters</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                    <div>
                      <div className="font-medium">{report.id}</div>
                      <div className="text-sm text-gray-500">
                        Posted by {report.postedBy}
                      </div>
                      <div className="text-xs text-gray-400">{report.time}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span>{report.content}</span>
                    <button className="ml-2 text-primary">
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="mr-2">{report.reporters} Reports</span>
                    <button className="text-primary text-sm">View</button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      report.status === 'Pending'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-red-500 hover:text-red-700">
                    Suspend
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 ml-4">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            0 of 20 row(s) selected.
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Rows Per Page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded px-2 py-1"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-3 py-1 bg-primary text-white rounded">1</span>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">2</button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">3</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded">99</button>
              <button className="p-1 rounded hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsManagement;