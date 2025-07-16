import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  Building,
  ArrowRight,
  Bell,
  Eye,
  Trash2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import { getAdminProfile, getAdminStats } from "./adminApi/api";

// Interfaces
interface Stat {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface AdminStats {
  totalJobseekers: number;
  totalEmployers: number;
  totalJobs: number;
}

interface AdminProfile {
  name: string;
  profilePic?: string;
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

type TimeFrame = "Year" | "Month" | "Week";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const AdminDashboard = () => {
  const [profile, setProfile] = useState<AdminProfile>({ name: "Admin" });
  const [stats, setStats] = useState<Stat[]>([]);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("Month");
  const [filteredRevenueData, setFilteredRevenueData] = useState<RevenueDataPoint[]>([]);

  const allRevenueData: RevenueDataPoint[] = [
    { date: new Date(2025, 3, 27), revenue: 550 },
    { date: new Date(2025, 3, 28), revenue: 850 },
    { date: new Date(2025, 3, 29), revenue: 1250 },
    { date: new Date(2025, 3, 30), revenue: 900 },
    { date: new Date(2025, 4, 1), revenue: 1150 },
    { date: new Date(2025, 4, 2), revenue: 700 },
    { date: new Date(2025, 4, 3), revenue: 600 },
    { date: new Date(2025, 4, 4), revenue: 150 },
    { date: new Date(2025, 4, 5), revenue: 200 },
    { date: new Date(2025, 4, 6), revenue: 310 },
    { date: new Date(2025, 4, 7), revenue: 250 },
    { date: new Date(2025, 4, 8), revenue: 270 },
  ];

  const recentUsers: RecentUser[] = [
    {
      id: 1,
      name: "Riya Neupane",
      email: "neupaneriyo457@gmail.com",
      role: "Employer",
      status: "Active",
      lastActive: "2 minutes ago",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      id: 2,
      name: "Alex Sharma",
      email: "alex.sharma@example.com",
      role: "Jobseeker",
      status: "Active",
      lastActive: "5 minutes ago",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getAdminProfile();
        const statsData: AdminStats = await getAdminStats();

        setProfile({
          name: profileData.name || "Admin",
          profilePic: profileData.profilePic,
        });

        setStats([
          {
            id: 1,
            title: "Total Jobseekers",
            value: statsData.totalJobseekers.toString(),
            icon: <Users className="text-green-500" size={24} />,
          },
          {
            id: 2,
            title: "Total Employer",
            value: statsData.totalEmployers.toString(),
            icon: <Building className="text-yellow-500" size={24} />,
          },
          {
            id: 3,
            title: "Active Jobs",
            value: statsData.totalJobs.toString(),
            icon: <Briefcase className="text-blue-500" size={24} />,
          },
        ]);

        setFilteredRevenueData(getRevenueDataForTimeFrame(allRevenueData, timeFrame));
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, [timeFrame]);

  function getRevenueDataForTimeFrame(
    data: RevenueDataPoint[],
    frame: TimeFrame
  ): RevenueDataPoint[] {
    const now = new Date();
    let startDate: Date;
    switch (frame) {
      case "Year":
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        startDate = new Date(now.setDate(diff));
        startDate.setHours(0, 0, 0, 0);
        const endWeek = new Date(startDate);
        endWeek.setDate(startDate.getDate() + 6);
        return data.filter(d => d.date >= startDate && d.date <= endWeek);
      case "Month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        return data.filter(d => d.date >= startDate && d.date <= endMonth);
      case "Week":
        startDate = new Date(now.getFullYear(), 0, 1);
        const endYear = new Date(now.getFullYear(), 11, 31);
        return data.filter(d => d.date >= startDate && d.date <= endYear);
      default:
        return data;
    }
  }

  const formatAxis = (tick: Date) => format(tick, "EEE");

  return (
    <div className="overflow-auto p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
      {/* Header */}
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
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {profile.profilePic ? (
              <img
                src={`${MEDIA_URL.replace(/\/$/, "")}/${profile.profilePic.replace(/^\//, "")}`}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {profile.name?.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span>{profile.name}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map(stat => (
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

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Revenue & Expenses</h2>
          <div className="flex space-x-2">
            {["Week", "Month", "Year"].map(tf => (
              <button
                key={tf}
                className={`px-3 py-1 text-sm rounded ${timeFrame === tf ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                onClick={() => setTimeFrame(tf as TimeFrame)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-4 mb-4 md:mb-0">
            <h3 className="text-md font-semibold mb-2">Total Revenue</h3>
            <LineChart data={filteredRevenueData} width={400} height={250}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatAxis} />
              <YAxis />
              <Tooltip formatter={(value: any) => `Rs. ${value}`} />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </div>
          <div className="w-full md:w-1/2 pl-4">
            <h3 className="text-md font-semibold mb-2">Daily Revenue</h3>
            <BarChart data={filteredRevenueData} width={400} height={250}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatAxis} />
              <YAxis />
              <Tooltip formatter={(value: any) => `Rs. ${value}`} />
              <Bar dataKey="revenue" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Users</h2>
          <input type="text" placeholder="Search users..." className="px-4 py-2 border rounded-lg" />
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
              {recentUsers.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3" />
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
