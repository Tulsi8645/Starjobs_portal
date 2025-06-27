// src/pages/UserDashboard.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import { fetchAppliedJobs } from '../jobseekerApi/api';

interface AppliedJob {
  _id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  appliedAt: string;
}

const UserDashboard = () => {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [stats, setStats] = useState([
    { id: 1, title: 'Applied Jobs', value: '0', icon: '📝' },
    { id: 2, title: 'Reviewed Jobs', value: '0', icon: '👀' },
    { id: 3, title: 'Accepted Jobs', value: '0', icon: '✅' }
  ]);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const jobs = await fetchAppliedJobs();

        // Transform the returned jobs to match AppliedJob type
        const transformedJobs: AppliedJob[] = jobs.map((job: any) => ({
          _id: job._id,
          title: job.title,
          location: job.location,
          type: job.type || 'Full Time',
          status: job.status || 'Pending',
          appliedAt: job.createdAt || '', // if available
        }));

        setAppliedJobs(transformedJobs);

        const reviewed = transformedJobs.filter(job => job.status === 'Reviewed').length;
        const accepted = transformedJobs.filter(job => job.status === 'Accepted').length;

        setStats(prevStats => prevStats.map(stat => {
          if (stat.title === 'Applied Jobs') return { ...stat, value: transformedJobs.length.toString() };
          if (stat.title === 'Reviewed Jobs') return { ...stat, value: reviewed.toString() };
          if (stat.title === 'Accepted Jobs') return { ...stat, value: accepted.toString() };
          return stat;
        }));
      } catch (error) {
        console.error("Failed to fetch applied jobs", error);
      }
    };

    getJobs();
  }, []);

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
                    <p className="text-xs mt-1 text-gray-400">Status: {job.status}</p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                    onClick={() => navigate(`/job/${job._id}`)}>
                    View Details
                  </button>
                </div>
              ))}
              {appliedJobs.length === 0 && <p className="text-gray-500">No applied jobs yet.</p>}
            </div>
          </div>

          {/* Recent Activities */}
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
