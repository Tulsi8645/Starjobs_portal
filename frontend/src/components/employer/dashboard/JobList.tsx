import { MapPin, Clock, DollarSign, Users, PenSquare, X, MoreVertical} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployerJobs } from "../employerApi/api";


interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: string;
  type: string;
  createdAt: string;
  salary: string;
  jobseekers?: number;
  newApplicants?: number;
  shortlisted?: number;
  interview?: number;
  status: string;
  logo?: string;
}

const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getEmployerJobs();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching employer jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen overflow-auto bg-gray-50 p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search job titles or locations..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Users size={20} />
            </div>
          </div>
          <div className="flex space-x-4 ml-4">
            <select className="border rounded-lg px-4 py-2">
              <option>All Jobs</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option>All Types</option>
            </select>
            <select className="border rounded-lg px-4 py-2">
              <option>Newest First</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={() => navigate("/employer/postjob")}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Post Job
          </button>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-600">
                        {job.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign size={16} className="mr-1" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button>
                  <MoreVertical size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex space-x-6">
                  <div>
                    <div className="text-gray-600">Total Applicants</div>
                    <div className="flex items-center mt-1">
                      <span className="font-semibold">{job.jobseekers?.length || 0}</span>
                      <span className="ml-2 text-green-600 text-sm">+{job.newApplicants || 0} new</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Shortlisted</div>
                    <div className="mt-1 font-semibold">{job.shortlisted || 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Interview</div>
                    <div className="mt-1 font-semibold">{job.interview || 0}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <Users size={20} className="mr-2" />
                    View Applicants
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <PenSquare size={20} className="mr-2" />
                    Edit Job
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-primary">
                    <X size={20} className="mr-2" />
                    Close Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
