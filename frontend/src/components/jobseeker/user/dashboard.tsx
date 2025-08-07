import { useNavigate } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAppliedJobs,
  fetchDashboardStats,
  getJobseekerNotifications,
  JobseekerNotification,
} from "../jobseekerApi/api";

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

  const {
    data: appliedJobs = [],
    isLoading: loadingJobs,
  } = useQuery({
    queryKey: ["appliedJobs"],
    queryFn: fetchAppliedJobs,
    select: (jobs: any[]): AppliedJob[] =>
      jobs.map((job: any) => ({
        _id: job._id,
        title: job.title,
        location: job.location,
        type: job.jobtype || "Full Time",
        applicationStatus: job.applicationStatus || "Pending",
        appliedAt: job.appliedAt || "",
      })),
  });

  const {
    data: dashboardStats,
    isLoading: loadingStats,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  const stats = dashboardStats
    ? [
      { id: 1, title: "Total Applications", value: dashboardStats.totalApplications.toString(), icon: "📄" },
      { id: 2, title: "Pending", value: dashboardStats.pending.toString(), icon: "⏳" },
      { id: 3, title: "Reviewed", value: dashboardStats.reviewed.toString(), icon: "👀" },
      { id: 4, title: "Accepted", value: dashboardStats.accepted.toString(), icon: "✅" },
      { id: 5, title: "Rejected", value: dashboardStats.rejected.toString(), icon: "❌" },
    ]
    : [];

  const {
    data: notifications = [],
    isLoading: loadingNotifications,
  } = useQuery<JobseekerNotification[]>({
    queryKey: ["jobseekerNotifications"],
    queryFn: getJobseekerNotifications,
  });

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-6">
          {loadingStats ? (
            <p className="text-gray-500">Loading stats...</p>
          ) : (
            stats.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold">{stat.value}</h3>
                    <p className="text-primary text-l font-semibold mt-1">{stat.title}</p>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6">
          {/* Applied Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Applied Jobs</h2>
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {loadingJobs ? (
                <p className="text-gray-500">Loading jobs...</p>
              ) : appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <div key={job._id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium">{job.title}</h3>
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

                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-1" />
                        <span>{job.location}</span>
                        <span className="mx-2">•</span>
                        <Clock size={14} className="mr-1" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                      onClick={() => navigate(`/jobs/${job._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No applied jobs yet.</p>
              )}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
            {loadingNotifications ? (
              <p className="text-gray-500">Loading notifications...</p>
            ) : notifications.length > 0 ? (
                <ul className="space-y-4 max-h-[400px] overflow-y-auto">
                  {notifications.map((note) => {
                    const getId = (ref: any) =>
                      typeof ref === "string" ? ref : ref?._id;

                    const jobId = getId(note.relatedJob);
                    const appId = getId(note.relatedApplication);
                    const revenueId = getId(note.relatedRevenue);

                    const link = jobId
                      ? `/jobs/${jobId}`
                      : appId
                        ? `/applications/${appId}`
                        : revenueId
                          ? `/revenue/${revenueId}`
                          : null;

                    return (
                      <li key={note._id} className="text-sm text-gray-800 border-b pb-2">
                        {link ? (
                          <button
                            className="text-left w-full"
                            onClick={() => navigate(link)}
                          >
                            <div className="font-medium text-blue-600 hover:text-blue-800">{note.message}</div>
                            <div className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</div>
                          </button>
                        ) : (
                          <>
                            <div className="font-medium">{note.message}</div>
                            <div className="text-xs text-gray-500">{new Date(note.createdAt).toLocaleString()}</div>
                          </>
                        )}
                      </li>
                    );
                  })}
                </ul>
            ) : (
              <p className="text-gray-400">No recent activities.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
