import { Users, Briefcase, Building, Eye, ArrowRight, Bell, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { useState } from 'react';
import { format } from 'date-fns';

interface Stat {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface RecentUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
}

interface RevenueDataPoint {
  date: Date;
  revenue: number;
}

interface EarningsData {
  value: string;
}

interface JobSuccessData {
  percentage: number;
}

type TimeFrame = 'Week' | 'Month' | 'Year';

const AdminDashboard = () => {
  const stats: Stat[] = [
    {
      id: 1,
      title: 'Total Users',
      value: '10,000',
      icon: <Users className="text-green-500" size={24} />,
    },
    {
      id: 2,
      title: 'Active Jobs',
      value: '200',
      icon: <Briefcase className="text-blue-500" size={24} />,
    },
    {
      id: 3,
      title: 'Total Employer',
      value: '30',
      icon: <Building className="text-yellow-500" size={24} />,
    },
  ];

  const recentUsers: RecentUser[] = [
    {
      id: 1,
      name: 'Riya Neupane',
      email: 'neupaneriyo457@gmail.com',
      role: 'Employer',
      status: 'Active',
      lastActive: '2 minute ago',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    },
    {
      id: 2,
      name: 'Riya Neupane',
      email: 'neupaneriyo457@gmail.com',
      role: 'Employer',
      status: 'Active',
      lastActive: '2 minute ago',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1'
    }
  ];

  const allRevenueData: RevenueDataPoint[] = [
    { date: new Date(2025, 3, 27), revenue: 550 }, // Mon
    { date: new Date(2025, 3, 28), revenue: 850 }, // Tue
    { date: new Date(2025, 3, 29), revenue: 1250 }, // Wed
    { date: new Date(2025, 3, 30), revenue: 900 }, // Thu
    { date: new Date(2025, 4, 1), revenue: 1150 },  // Fri
    { date: new Date(2025, 4, 2), revenue: 700 },  // Sat
    { date: new Date(2025, 4, 3), revenue: 600 },  // Sun
    { date: new Date(2025, 4, 4), revenue: 150 },  // Mon
    { date: new Date(2025, 4, 5), revenue: 200 },  // Tue
    { date: new Date(2025, 4, 6), revenue: 310 },  // Wed
    { date: new Date(2025, 4, 7), revenue: 250 },  // Thu
    { date: new Date(2025, 4, 8), revenue: 270 },  // Fri
    // ... more data for different weeks/months/years
  ];

  const earningsData: EarningsData = { value: 'Rs. 100000' };
  const jobSuccessData: JobSuccessData = { percentage: 99 };

  const [timeFrame, setTimeFrame] = useState<TimeFrame>('Month'); // Default time frame
  const [filteredRevenueData, setFilteredRevenueData] = useState<RevenueDataPoint[]>(
    getRevenueDataForTimeFrame(allRevenueData, 'Month')
  );

  function getRevenueDataForTimeFrame(data: RevenueDataPoint[], timeFrame: TimeFrame): RevenueDataPoint[] {
    const now = new Date();
    let startDate: Date;

    switch (timeFrame) {
      case 'Week':
        const day = now.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday of the current week
        startDate = new Date(now.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        const endDateWeek = new Date(startDate);
        endDateWeek.setDate(startDate.getDate() + 6);
        endDateWeek.setHours(23, 59, 59, 999);
        return data.filter(item => item.date >= startDate && item.date <= endDateWeek);
      case 'Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        startDate.setHours(0, 0, 0, 0);
        const endDateMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        endDateMonth.setHours(23, 59, 59, 999);
        return data.filter(item => item.date >= startDate && item.date <= endDateMonth);
      case 'Year':
        startDate = new Date(now.getFullYear(), 0, 1);
        startDate.setHours(0, 0, 0, 0);
        const endDateYear = new Date(now.getFullYear(), 11, 31);
        endDateYear.setHours(23, 59, 59, 999);
        return data.filter(item => item.date >= startDate && item.date <= endDateYear);
      default:
        return data;
    }
  }

  const handleTimeFrameChange = (newTimeFrame: TimeFrame) => {
    setTimeFrame(newTimeFrame);
    setFilteredRevenueData(getRevenueDataForTimeFrame(allRevenueData, newTimeFrame));
  };

  const formatAxis = (tick: Date) => format(tick, 'EEE');

  return (
    <div className="overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
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
              {stat.icon}
              <ArrowRight className="text-gray-400" size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Revenue & Expenses</h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 text-sm rounded ${timeFrame === 'Week' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              onClick={() => handleTimeFrameChange('Week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1 text-sm rounded ${timeFrame === 'Month' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              onClick={() => handleTimeFrameChange('Month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1 text-sm rounded ${timeFrame === 'Year' ? 'bg-primary text-white' : 'bg-gray-100'}`}
              onClick={() => handleTimeFrameChange('Year')}
            >
              Year
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pr-4">
            <h3 className="text-md font-semibold mb-2">Total Revenue</h3>
            <div className="h-64">
              <LineChart data={filteredRevenueData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatAxis} />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value}`} />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </div>
          </div>
          <div className="w-1/2 pl-4">
            <h3 className="text-md font-semibold mb-2">Daily Revenue</h3>
            <div className="h-64">
              <BarChart data={filteredRevenueData} width={400} height={250}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={formatAxis} />
                <YAxis />
                <Tooltip formatter={(value) => `Rs. ${value}`} />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Earnings</h2>
            <span className="text-sm text-gray-500">12 months</span>
          </div>
          <div className="text-3xl font-bold mb-2">{earningsData.value}</div>
          <button className="text-primary">Transaction History</button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Job Success</h2>
            <button className="text-primary">Learn More</button>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-8 border-primary rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{jobSuccessData.percentage}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Users</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 border rounded-lg"
            />
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              Add User
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">USER</th>
                <th className="px-6 py-3 text-left">ROLE</th>
                <th className="px-6 py-3 text-left">STATUS</th>
                <th className="px-6 py-3 text-left">LAST ACTIVE</th>
                <th className="px-6 py-3 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b">
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
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{user.lastActive}</td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;