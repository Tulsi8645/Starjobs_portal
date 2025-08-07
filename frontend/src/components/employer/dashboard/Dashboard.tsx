import React, { useEffect, useState } from "react";
import { Eye, Mail, BarChart, Briefcase, UserCheck, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  getAllApplicants,
  getEmployerDashboardStats,
  getEmployerNotifications,
} from "../employerApi/api";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

interface Stat {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface Application {
  id: string;
  name: string;
  email: string;
  position: string;
  avatar: string;
  resume: string;
  appliedAt: string;
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  // ✅ React Query for Notifications
  const {
    data: notifications = [],
    isLoading: loadingNotifications,
    error: notificationsError,
  } = useQuery({
    queryKey: ["employerNotifications"],
    queryFn: getEmployerNotifications,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getEmployerDashboardStats();
        const dynamicStats: Stat[] = [
          {
            id: 1,
            title: "Total Jobs",
            value: data.totalJobs.toString(),
            icon: <Briefcase className="text-green-500" size={24} />,
          },
          {
            id: 2,
            title: "Total Views",
            value: data.totalViews.toString(),
            icon: <BarChart className="text-yellow-500" size={24} />,
          },
          {
            id: 3,
            title: "Total Applications",
            value: data.totalApplications.toString(),
            icon: <UserCheck className="text-blue-500" size={24} />,
          },
          {
            id: 4,
            title: "Pending Applications",
            value: data.pendingApplications.toString(),
            icon: <Eye className="text-primary" size={24} />,
          },
        ];
        setStats(dynamicStats);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };

    const fetchApplications = async () => {
      try {
        const data = await getAllApplicants(page, limit);
        const flatApps: Application[] = [];

        data.data.forEach((job: any) => {
          job.applicants.forEach((app: any) => {
            flatApps.push({
              id: app.applicationId,
              name: app.applicant?.name,
              email: app.applicant?.email,
              avatar: app.applicant?.profilePic,
              position: job.jobTitle || "",
              resume: app.resume || "",
              appliedAt: app.appliedAt,
            });
          });
        });

        setApplications(flatApps);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchStats();
    fetchApplications();
  }, [page]);

  return (
    <div className="min-h-screen overflow-auto bg-gray-50 p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Stats */}
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

        {/* Applications and Activities */}
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6">
          {/* Applications */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">New Applications</h2>
            <div className="space-y-6">
              {applications.length === 0 ? (
                <p className="text-gray-500">No applications found</p>
              ) : (
                applications.map((applicant) => (
                  <div key={applicant.id} className="flex items-start justify-between space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                      {applicant.avatar ? (
                        <img
                          src={`${MEDIA_URL.replace(/\/$/, "")}/${applicant.avatar.replace(/^\//, "")}`}
                          alt={applicant.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-gray-500">
                          {applicant.name?.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 gap-8">
                      <div className="flex items-center gap-4 mb-2">
                        <p className="font-medium">
                          {applicant.name || <span className="italic text-gray-400">No name</span>}
                        </p>
                        <span className="text-sm text-gray-500">
                          {format(new Date(applicant.appliedAt), "yyyy/MM/dd")}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail size={14} className="mr-1" />
                        <span>{applicant.email || <span className="italic text-gray-400">No email address</span>}</span>
                        <span className="mx-2">•</span>
                        <span>{applicant.position}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {applicant.resume ? (
                        <a
                          href={`${MEDIA_URL.replace(/\/$/, "")}/${applicant.resume
                            .replace(/\\/g, "/")
                            .replace(/^.*\/uploads/, "uploads")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="flex items-center text-white bg-primary px-3 py-1 rounded hover:bg-primary/90 text-sm">
                            <Eye size={14} className="mr-1" />
                            Resume
                          </button>
                        </a>
                      ) : (
                        <span className="text-gray-500 text-xs">No resume</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* ✅ Recent Activities (Notifications) */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <div className="flex gap-2">
              <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
              <Bell size={20} className="text-primary mt-1" />   
            </div>

            {loadingNotifications ? (
              <p className="text-gray-500 text-sm">Loading...</p>
            ) : notificationsError ? (
              <p className="text-red-500 text-sm">Failed to load notifications</p>
            ) : notifications.length === 0 ? (
              <p className="text-gray-500 text-sm">No notifications</p>
            ) : (
              <ul className="space-y-4">
                {notifications.slice(0, 5).map((notif) => (
                  <li key={notif._id} className="flex items-start space-x-2">
                    
                    <div className=" border-b mb-2">
                      <p className="font-medium text-blue-600 hover:text-blue-800">{notif.message}</p>
                      <p className="text-xs text-gray-500">{format(new Date(notif.createdAt), "yyyy/MM/dd HH:mm")}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
