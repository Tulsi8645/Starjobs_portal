
import { MapPin, Clock, DollarSign, Users, Share2, MoreHorizontal, Briefcase, BarChart,  ThumbsUp, ThumbsDown } from 'lucide-react'; // Ensure Briefcase is imported
import { useNavigate } from 'react-router-dom';
const JobDetail = () => {
  const navigate = useNavigate();
  const job = {
    title: 'SENIOR CASTING DIRECTOR',
    company: 'Tech corp.',
    companyLogo: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'San Francisco',
    postedDateText: 'Posted Mar 14 2025',
    type: 'Full-time',
    applicationsText: '100 application',
    daysAgo: '3 days ago',
    salary: '$ 40,000 - 60,000',
    experience: '3 Year',
    level: 'Junior',
    openings: 2,
    description: 'Our manufacturing client based in New Zealand specializes in the production of building materials such as bricks and pavers. In 2024, we are committed to establishing an online store and enhancing our existing website to provide customers with an improved digital experience.',
    requirements: [
      'Get the job done and fast.',
      'Find the given task and do the as soon as possible.',
      'Design visually captivating and user-friendly interfaces for our dating/social platform, adhering to the company\'s brand guidelines and design principles.',
      'Collaborate with product managers and UX designers to understand user requirements and translate them into compelling design concepts.'
    ],
    skills: ['React', 'Java', 'Typescript'],
    moreSkills: 5,
    likes: 50,
    dislikes: 2,
    totalApplicants: 80,
  };

  // ... (Keep the existing similarJobs data structure)
  // Ensure each sJob has: id, title, company, logo, location, deadline (string like 'X Days left'), type
  const similarJobs = [
      {
        id: 1,
        title: 'UI/UX Designer',
        company: 'Bonton Tech',
        companyLogo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
        location: 'Kathmandu, Nepal',
        deadline: '7 Days left', // Use this directly
        type: 'Full Time'
      },
      {
        id: 2,
        title: 'Junior QA',
        company: 'CleoCal Tech',
        companyLogo: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
        location: 'Kathmandu, Nepal',
        deadline: '7 Days left', // Use this directly
        type: 'Full Time'
      },
      {
        id: 3,
        title: 'UI/UX Designer',
        company: 'Bonton Tech',
        companyLogo: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
        location: 'Kathmandu, Nepal',
        deadline: '7 Days left', // Use this directly
        type: 'Full Time'
      },
  ];


  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content (No changes here) */}
          <div className="lg:col-span-2  rounded-lg  p-6">
            {/* ... Header Section ... */}
             <div className="flex items-start justify-between mb-4 border-b pb-4">
               <div className="flex items-start space-x-4">
                 <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-full h-full object-cover"
                      />
                    </div>
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                    <p className="text-gray-600 mb-2">{job.company}</p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-3 gap-y-1">
                       <span>{job.location}</span>
                       <span className="text-gray-300">•</span>
                       <span>{job.postedDateText}</span>
                       <span className="text-gray-300">•</span>
                       <span>{job.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{job.daysAgo} | <span className="font-semibold text-gray-700">{job.applicationsText}</span></p>
                 </div>
               </div>
               <div className="flex flex-col items-end space-y-2 ml-4">
                 <button onClick={() => navigate('/job/apply')} className={`px-5 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition duration-150 text-sm font-medium`}>
                   Apply Now
                 </button>
                 <div className="flex space-x-2 text-gray-500">
                   <button className="p-1 hover:text-gray-700">
                     <Share2 size={18} />
                   </button>
                   <button className="p-1 hover:text-gray-700">
                     <MoreHorizontal size={18} />
                   </button>
                 </div>
               </div>
             </div>
            {/* ... Job Details Box ... */}
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
               <div className="text-sm">
                 <p className="text-gray-500 mb-1 flex items-center"><DollarSign size={14} className="mr-1.5" /> Offered Salary</p>
                 <p className="font-semibold text-gray-800">{job.salary}</p>
               </div>
               <div className="text-sm">
                 <p className="text-gray-500 mb-1 flex items-center"><Briefcase size={14} className="mr-1.5" /> Experience</p>
                 <p className="font-semibold text-gray-800">{job.experience}</p>
               </div>
               <div className="text-sm">
                 <p className="text-gray-500 mb-1 flex items-center"><BarChart size={14} className="mr-1.5" /> Level</p>
                 <p className="font-semibold text-gray-800">{job.level}</p>
               </div>
                <div className="text-sm">
                 <p className="text-gray-500 mb-1 flex items-center"><Users size={14} className="mr-1.5" /> Openings</p>
                 <p className="font-semibold text-gray-800">{job.openings}</p>
               </div>
             </div>
            {/* ... Description, Requirements, Skills ... */}
             <div className="space-y-6">
               <div>
                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h2>
                 <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
               </div>

               <div>
                 <h2 className="text-lg font-semibold text-gray-800 mb-2">Requirements</h2>
                 <ul className="list-disc list-inside text-gray-600 space-y-1.5 text-sm">
                   {job.requirements.map((req, index) => (
                     <li key={index}>{req}</li>
                   ))}
                 </ul>
               </div>

               <div>
                 <div className="flex justify-between items-center mb-2">
                     <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
                     <div className="flex items-center text-sm text-gray-500">
                         <Clock size={14} className="mr-1" />
                         Be an early applicant
                     </div>
                 </div>
                 <div className="flex flex-wrap items-center gap-2">
                   {job.skills.map((skill, index) => (
                     <span
                       key={index}
                       className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-gray-700 text-sm font-medium"
                     >
                       {skill}
                     </span>
                   ))}
                   {job.moreSkills > 0 && (
                      <span className="text-sm text-gray-500 font-medium">+{job.moreSkills} more</span>
                   )}
                 </div>
               </div>

                {/* ... Application Info & Bottom Apply Button ... */}
                <div className="pt-4 border-t mt-6 flex items-center justify-between">
                     <div className="flex items-center space-x-4">
                         <div className="flex items-center space-x-2">
                             <button className="p-1.5 border rounded-md hover:bg-gray-100 text-gray-500 hover:text-green-600">
                                 <ThumbsUp size={16}/>
                             </button>
                             <span className="text-sm font-medium text-gray-700">{job.likes}</span>
                         </div>
                         <div className="flex items-center space-x-2">
                             <button className="p-1.5 border rounded-md hover:bg-gray-100 text-gray-500 hover:text-red-600">
                                 <ThumbsDown size={16}/>
                             </button>
                             <span className="text-sm font-medium text-gray-700">{job.dislikes}</span>
                         </div>
                         <span className="text-sm text-gray-500">{job.totalApplicants} applicants</span>
                     </div>
                     <button
                        onClick={() => navigate('/job/apply')}
                        className="px-6 py-2.5 rounded-md bg-primary text-white hover:bg-primary/90 transition duration-150 text-sm font-semibold"
                        >
                        Apply Now
                        </button>
                </div>

             </div>
          </div>

<div className="space-y-6">
  <div className="bg-gray-100 p-4 rounded-lg shadow-sm border-2"> 
    <h2 className="text-xl font-semibold text-gray-800 mb-5 px-1">Similar Jobs</h2>

    <div className="space-y-4 py-4">
      {similarJobs.map((sJob) => (
        <div
          key={sJob.id}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden p-4"
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="flex items-start mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border">
                  <img
                    src={sJob.companyLogo}
                    alt={sJob.company}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{sJob.title}</h3>
                  <p className="text-primary text-sm">{sJob.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-500">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{sJob.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-red-600">{sJob.deadline}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Briefcase size={16} className="mr-2 flex-shrink-0" />
                  <span className="text-sm">{sJob.type}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90 transition-colors duration-200 text-sm font-medium">
                Apply now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default JobDetail;