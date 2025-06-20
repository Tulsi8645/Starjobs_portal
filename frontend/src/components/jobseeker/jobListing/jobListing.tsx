// import { useQuery } from '@tanstack/react-query';
// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import {
//   Search as SearchIcon,
//   MapPin,
//   Clock,
//   DollarSign,
//   Bookmark
// } from 'lucide-react';
// import { fetchJobs, fetchSavedJobs, toggleSaveJob } from '../jobseekerApi/api';

// type Employer = {
//   _id: string;
//   name: string;
//   companyLogo?: string;
// };

// type Job = {
//   _id: string;
//   title: string;
//   location: string;
//   jobtype: string;
//   salary: string;
//   experience: string;
//   jobcategory: string;
//   level: string;
//   deadline: string;
//   openings: number;
//   istrending: boolean;
//   status: string;
//   description: string;
//   employer: Employer;
//   createdAt: string;
// };

// type JobResponse = {
//   jobs: Job[];
//   total: number;
// };

// const getTimeAgo = (dateString: string): string => {
//   const diff = Date.now() - new Date(dateString).getTime();
//   const minutes = Math.floor(diff / 60000);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
//   if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
//   if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//   return 'Just now';
// };

// const AllJobListing = () => {
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({
//     location: '',
//     jobType: '',
//     datePosted: '',
//     level: ''
//   });
//   const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;
//   const [sortBy, setSortBy] = useState('newest');
//   const [page, setPage] = useState(1);
//   const limit = 9;

//   const { data, isLoading, isError } = useQuery<JobResponse, Error>({
//     queryKey: ['jobs', page],
//     queryFn: () => fetchJobs({ page, limit }),
//     staleTime: 60 * 1000,
//     gcTime: 5 * 60 * 1000,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false
//   });

//   const jobs = data?.jobs ?? [];
//   const total = data?.total ?? 0;
//   const totalPages = Math.ceil(total / limit);

//   const filteredJobs = jobs
//     .filter((job) => {
//       const matchesSearch =
//         job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         job.employer?.name?.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchesLocation =
//         filters.location === '' ||
//         job.location.toLowerCase().includes(filters.location.toLowerCase());

//       const matchesJobType =
//         filters.jobType === '' ||
//         job.jobtype.toLowerCase() === filters.jobType.toLowerCase();

//       const matchesLevel =
//         filters.level === '' || job.level === filters.level;

//       const createdAt = new Date(job.createdAt);
//       const now = new Date();
//       let matchesDate = true;

//       if (filters.datePosted === '24h') {
//         matchesDate = now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000;
//       } else if (filters.datePosted === '7d') {
//         matchesDate = now.getTime() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
//       } else if (filters.datePosted === '30d') {
//         matchesDate = now.getTime() - createdAt.getTime() <= 30 * 24 * 60 * 60 * 1000;
//       }

//       return matchesSearch && matchesLocation && matchesJobType && matchesDate && matchesLevel;
//     })
//     .sort((a, b) => {
//       if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
//       if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
//       if (sortBy === 'salaryHigh') return parseInt(b.salary) - parseInt(a.salary);
//       if (sortBy === 'salaryLow') return parseInt(a.salary) - parseInt(b.salary);
//       return 0;
//     });

//   if (isLoading) return <div className="p-8 text-center">Loading jobs...</div>;
//   if (isError) return <div className="p-8 text-center text-red-600">Failed to load jobs</div>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto ml-30 px-4 py-8">
//         {/* Search */}
//         <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
//           <div className="flex gap-4">
//             <div className="relative flex-1">
//               <input
//                 type="text"
//                 placeholder="Search jobs or internships"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
//               />
//               <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             </div>
//             <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
//               Search
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-8">
//           {/* Filters */}
          // <div className="w-64 rounded-xl bg-gray-100 p-6 space-y-6">
          //   <div className="flex items-center justify-between">
          //     <h2 className="text-lg font-bold">Filter</h2>
          //     <button
          //       onClick={() =>
          //         setFilters({
          //           location: '',
          //           jobType: '',
          //           datePosted: '',
          //           level: ''
          //         })
          //       }
          //       className="text-md text-primary"
          //     >
          //       Clear All
          //     </button>
          //   </div>

          //   <div>
          //     <label className="block text-sm font-medium mb-1">Location</label>
          //     <input
          //       type="text"
          //       placeholder="City or postcode"
          //       className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          //       value={filters.location}
          //       onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
          //     />
          //   </div>

          //   <div>
          //     <label className="block text-sm font-medium mb-1">Job Type</label>
          //     <select
          //       className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          //       value={filters.jobType}
          //       onChange={(e) => setFilters((prev) => ({ ...prev, jobType: e.target.value }))}
          //     >
          //       <option value="">Choose a Job Type...</option>
          //       <option value="Full-time">Full-time</option>
          //       <option value="Part-time">Part-time</option>
          //       <option value="Internship">Internship</option>
          //     </select>
          //   </div>

          //   <div>
          //     <label className="block text-sm font-medium mb-2">Date Posted</label>
          //     <div className="space-y-2">
          //       {[
          //         { label: 'Last 24 hours', value: '24h' },
          //         { label: 'Last 7 days', value: '7d' },
          //         { label: 'Last 30 days', value: '30d' }
          //       ].map(({ label, value }) => (
          //         <label key={value} className="flex items-center gap-2 text-sm">
          //           <input
          //             type="radio"
          //             name="datePosted"
          //             value={value}
          //             checked={filters.datePosted === value}
          //             onChange={(e) =>
          //               setFilters((prev) => ({ ...prev, datePosted: e.target.value }))
          //             }
          //           />
          //           {label}
          //         </label>
          //       ))}
          //     </div>
          //   </div>

          //   <div>
          //     <label className="block text-sm font-medium mb-2">Level</label>
          //     <div className="space-y-2">
          //       {['Internship', 'Fresher', 'Mid Level', 'Senior'].map((level) => (
          //         <label key={level} className="flex items-center gap-2 text-sm">
          //           <input
          //             type="radio"
          //             name="level"
          //             value={level}
          //             checked={filters.level === level}
          //             onChange={(e) =>
          //               setFilters((prev) => ({ ...prev, level: e.target.value }))
          //             }
          //           />
          //           {level}
          //         </label>
          //       ))}
          //     </div>
          //   </div>
          // </div>

//           {/* Job Cards */}
//           <div className="flex-1">
//             <div className="flex justify-between items-center mb-6">
//               <p className="text-gray-600">Showing {filteredJobs.length} jobs</p>
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest First</option>
//                 <option value="salaryHigh">Salary: High to Low</option>
//                 <option value="salaryLow">Salary: Low to High</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredJobs.map((job) => (
//                 <div key={job._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex gap-3 items-start">
//                       {job.employer?.companyLogo && (
//                         <img
//                           src={`${MEDIA_URL.replace(/\/$/, '')}/${job.employer.companyLogo.replace(/^\//, '')}`}
//                           alt="Company Logo"
//                           className="w-10 h-10 rounded object-cover"
//                         />
//                       )}
//                       <div>
//                         <h3 className="font-semibold text-lg">{job.title}</h3>
//                         <p className="text-gray-600 text-sm">{job.employer?.name}</p>
//                       </div>
//                     </div>
//                     <Bookmark className="text-gray-400" size={20} />
//                   </div>

//                   <div className="text-sm text-gray-500 space-y-1">
//                     <div className="flex items-center"><MapPin className="mr-2" size={16} /> {job.location}</div>
//                     <div className="flex items-center"><Clock className="mr-2" size={16} /> {job.jobtype}</div>
//                     <div className="flex items-center"><DollarSign className="mr-2" size={16} /> {job.salary}</div>
//                   </div>

//                   <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
//                     <span>{getTimeAgo(job.createdAt)}</span>
//                     <button
//                       onClick={() => navigate(`/job/${job._id}`)}
//                       className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="mt-8 flex justify-center gap-4">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 Previous
//               </button>
//               <span className="px-4 py-2">{page} / {totalPages}</span>
//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="px-4 py-2 border rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
//               >
//                 Next
//               </button>
//             </div>

//             {filteredJobs.length === 0 && (
//               <div className="text-center text-gray-500 mt-12">No jobs match your filters.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllJobListing;

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  MapPin,
  Clock,
  DollarSign,
  Bookmark,
} from 'lucide-react';
import { fetchJobs, fetchSavedJobs, toggleSaveJob } from '../jobseekerApi/api';

type Employer = {
  _id: string;
  name: string;
  companyLogo?: string;
};

type Job = {
  _id: string;
  title: string;
  location: string;
  jobtype: string;
  salary: string;
  experience: string;
  jobcategory: string;
  level: string;
  deadline: string;
  openings: number;
  istrending: boolean;
  status: string;
  description: string;
  employer: Employer;
  createdAt: string;
};

type JobResponse = {
  jobs: Job[];
  total: number;
};

const getTimeAgo = (dateString: string): string => {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

const AllJobListing = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    datePosted: '',
    level: '',
  });
  const MEDIA_URL = import.meta.env.VITE_MEDIA_URL;
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const limit = 9;

  const {
    data: savedJobIds = [],
    refetch: refetchSavedJobs,
  } = useQuery<string[], Error>({
    queryKey: ['savedJobs'],
    queryFn: fetchSavedJobs,
    staleTime: 0,
  });

  const { data, isLoading, isError } = useQuery<JobResponse, Error>({
    queryKey: ['jobs', page],
    queryFn: () => fetchJobs({ page, limit }),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const handleToggleSave = async (jobId: string) => {
    try {
      await toggleSaveJob(jobId);
      await refetchSavedJobs();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const jobs = data?.jobs ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / limit);

  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.employer?.name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation =
        filters.location === '' ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());

      const matchesJobType =
        filters.jobType === '' ||
        job.jobtype.toLowerCase() === filters.jobType.toLowerCase();

      const matchesLevel =
        filters.level === '' || job.level === filters.level;

      const createdAt = new Date(job.createdAt);
      const now = new Date();
      let matchesDate = true;

      if (filters.datePosted === '24h') {
        matchesDate = now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000;
      } else if (filters.datePosted === '7d') {
        matchesDate = now.getTime() - createdAt.getTime() <= 7 * 24 * 60 * 60 * 1000;
      } else if (filters.datePosted === '30d') {
        matchesDate = now.getTime() - createdAt.getTime() <= 30 * 24 * 60 * 60 * 1000;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesJobType &&
        matchesDate &&
        matchesLevel
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest')
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest')
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'salaryHigh') return parseInt(b.salary) - parseInt(a.salary);
      if (sortBy === 'salaryLow') return parseInt(a.salary) - parseInt(b.salary);
      return 0;
    });

  if (isLoading) return <div className="p-8 text-center">Loading jobs...</div>;
  if (isError) return <div className="p-8 text-center text-red-600">Failed to load jobs</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto ml-30 px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm p-2 mb-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search jobs or internships"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary">
              Search
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 rounded-xl bg-gray-100 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Filter</h2>
              <button
                onClick={() =>
                  setFilters({
                    location: '',
                    jobType: '',
                    datePosted: '',
                    level: ''
                  })
                }
                className="text-md text-primary"
              >
                Clear All
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                placeholder="City or postcode"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={filters.location}
                onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Job Type</label>
              <select
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                value={filters.jobType}
                onChange={(e) => setFilters((prev) => ({ ...prev, jobType: e.target.value }))}
              >
                <option value="">Choose a Job Type...</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date Posted</label>
              <div className="space-y-2">
                {[
                  { label: 'Last 24 hours', value: '24h' },
                  { label: 'Last 7 days', value: '7d' },
                  { label: 'Last 30 days', value: '30d' }
                ].map(({ label, value }) => (
                  <label key={value} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="datePosted"
                      value={value}
                      checked={filters.datePosted === value}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, datePosted: e.target.value }))
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Level</label>
              <div className="space-y-2">
                {['Internship', 'Fresher', 'Mid Level', 'Senior'].map((level) => (
                  <label key={level} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="level"
                      value={level}
                      checked={filters.level === level}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, level: e.target.value }))
                      }
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {filteredJobs.length} jobs</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary text-gray-700"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="salaryHigh">Salary: High to Low</option>
                <option value="salaryLow">Salary: Low to High</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-start">
                      {job.employer?.companyLogo && (
                        <img
                          src={`${MEDIA_URL.replace(/\/$/, '')}/${job.employer.companyLogo.replace(/^\//, '')}`}
                          alt="Company Logo"
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <p className="text-gray-600 text-sm">{job.employer?.name}</p>
                      </div>
                    </div>
                    <button onClick={() => handleToggleSave(job._id)} className="p-1">
                      {savedJobIds.includes(job._id) ? (
                        <Bookmark fill="currentColor" className="text-primary" size={20} />
                      ) : (
                        <Bookmark className="text-gray-400" size={20} />
                      )}
                    </button>
                  </div>

                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center"><MapPin className="mr-2" size={16} /> {job.location}</div>
                    <div className="flex items-center"><Clock className="mr-2" size={16} /> {job.jobtype}</div>
                    <div className="flex items-center"><DollarSign className="mr-2" size={16} /> {job.salary}</div>
                  </div>

                  <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                    <span>{getTimeAgo(job.createdAt)}</span>
                    <button
                      onClick={() => navigate(`/job/${job._id}`)}
                      className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Previous
              </button>
              <span className="px-4 py-2">{page} / {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Next
              </button>
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center text-gray-500 mt-12">No jobs match your filters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobListing;
