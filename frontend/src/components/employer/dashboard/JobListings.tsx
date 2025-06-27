import { MapPin, Clock, DollarSign, Users, PenSquare, RotateCw, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    postedDate: 'Mar 14 2025',
    salary: '$10000-$20000',
    totalApplicants: 12,
    newApplicants: 12,
    shortlisted: 12,
    interview: 0,
    status: 'Expired',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
  },
   {
    id: 2,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    postedDate: 'Mar 14 2025',
    salary: '$10000-$20000',
    totalApplicants: 12,
    newApplicants: 12,
    shortlisted: 12,
    interview: 0,
    status: 'Expired',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
  },
   {
    id: 3,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    postedDate: 'Mar 14 2025',
    salary: '$10000-$20000',
    totalApplicants: 12,
    newApplicants: 12,
    shortlisted: 12,
    interview: 0,
    status: 'Expired',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
  },
   {
    id: 4,
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    postedDate: 'Mar 14 2025',
    salary: '$10000-$20000',
    totalApplicants: 12,
    newApplicants: 12,
    shortlisted: 12,
    interview: 0,
    status: 'Expired',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
  },
];

const JobListings = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">4</h3>
                <div className="text-green-500">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-gray-600 mt-2">Total Jobs</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">5</h3>
                <div className="text-yellow-500">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-gray-600 mt-2">Total Applicant</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold">5</h3>
                <div className="text-blue-500">
                  <Users size={24} />
                </div>
              </div>
              <p className="text-gray-600 mt-2">Shortlisted</p>
            </div>
          </div>
          <button onClick={() => navigate('/employer/postjobs')} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90">
            Post Job
          </button>
        </div>

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

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg border p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-600">
                        {job.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{job.company}</p>
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
                      <span className="font-semibold">{job.totalApplicants}</span>
                      <span className="ml-2 text-green-600 text-sm">+{job.newApplicants} new</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Shortlisted</div>
                    <div className="mt-1 font-semibold">{job.shortlisted}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Interview</div>
                    <div className="mt-1 font-semibold">{job.interview}</div>
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
                    <RotateCw size={20} className="mr-2" />
                    Renew Job
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

export default JobListings;