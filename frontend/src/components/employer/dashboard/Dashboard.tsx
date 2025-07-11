import React, { useEffect, useState } from "react";
import {
  Eye,
  Mail,
  BarChart,
  Briefcase,
  UserCheck,
} from "lucide-react";
import { getAllApplicants } from "../employerApi/api";
import { fetchDashboardStats } from "../insightsApi/api";

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await fetchDashboardStats();
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
        const data = await getAllApplicants();
        const flatApps: Application[] = [];

        data.forEach((job: any) => {
          job.applicants.forEach((app: any) => {
            flatApps.push({
              id: app.applicationId,
              name: app.applicant?.name ,
              email: app.applicant?.email ,
              avatar: app.applicant?.profilePic,
              position: job.jobTitle || "",
              resume: app.resume || "",
              appliedAt: app.appliedAt,
            });  
          });
        });

        const latestFive = flatApps
          .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime())
          .slice(0, 5);

        setApplications(latestFive);
      } catch (err) {
        console.error("Failed to fetch applications:", err);
      }
    };

    fetchStats();
    fetchApplications();
  }, []);

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
                <p className="text-gray-500">No recent applications</p>
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
                    <div className="flex-1">
                      <p className="font-medium">{applicant.name || (<span className="italic text-gray-400">No name</span>)}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail size={14} className="mr-1" />
                        <span>{applicant.email || (<span className="italic text-gray-400">No email</span>)}</span>
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
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-full">
            <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
            <p className="text-gray-500 text-sm">No recent activities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
