import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { fetchAppliedJobs, fetchDashboardStats } from '../jobseekerApi/api';

interface AppliedJob {
  _id: string;
  title: string;
  location: string;
  type: string;
  applicationStatus: string;
  appliedAt: string;
}


const UserDashboard = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [stats, setStats] = useState([
    { id: 1, title: 'Total Applications', value: '0', icon: '📄' },
    { id: 2, title: 'Pending', value: '0', icon: '⏳' },
    { id: 3, title: 'Reviewed', value: '0', icon: '👀' },
    { id: 4, title: 'Accepted', value: '0', icon: '✅' },
    { id: 5, title: 'Rejected', value: '0', icon: '❌' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch applied jobs
        const jobs = await fetchAppliedJobs();
        const transformedJobs: AppliedJob[] = jobs.map((job: any) => ({
          _id: job._id,
          title: job.title,
          location: job.location,
          type: job.jobtype || 'Full Time',         // use job.jobtype not job.type
          applicationStatus: job.applicationStatus || 'Pending',
          appliedAt: job.appliedAt || '',
        }));
        
        setAppliedJobs(transformedJobs);

        // Fetch dashboard stats
        const dashboardStats = await fetchDashboardStats();

        setStats([
          { id: 1, title: 'Total Applications', value: dashboardStats.totalApplications.toString(), icon: '📄' },
          { id: 2, title: 'Pending', value: dashboardStats.pending.toString(), icon: '⏳' },
          { id: 3, title: 'Reviewed', value: dashboardStats.reviewed.toString(), icon: '👀' },
          { id: 4, title: 'Accepted', value: dashboardStats.accepted.toString(), icon: '✅' },
          { id: 5, title: 'Rejected', value: dashboardStats.rejected.toString(), icon: '❌' }
        ]);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto p-6" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <div className="max-w-7xl mx-auto">

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6">

          {/* Applied Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {appliedJobs.map((job) => (
                <div key={job._id} className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin size={14} className="mr-1" />
                      <span>{job.location}</span>
                      <span className="mx-2">•</span>
                      <Clock size={14} className="mr-1" />
                      <span>{job.type}</span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded
    ${job.applicationStatus === "Accepted"
                          ? "bg-green-100 text-green-800"
                          : job.applicationStatus === "Reviewed"
                            ? "bg-yellow-100 text-yellow-800"
                            : job.applicationStatus === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {job.applicationStatus}
                    </span>

                  </div>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    onClick={() => navigate(`/job/${job._id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
              {appliedJobs.length === 0 && <p className="text-gray-500">No applied jobs yet.</p>}
            </div>
          </div>

          {/* Recent Activities Placeholder */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <p className="text-gray-400">No recent activities.</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
