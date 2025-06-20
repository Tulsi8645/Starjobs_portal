import { useEffect, useState } from "react";
import { Linkedin, Facebook, Twitter, Download } from "lucide-react";
import { getJobseekerProfile } from "../jobseekerApi/api";

type Qualification = {
  degree: string;
  institution: string;
  year: number;
};

type Experience = {
  jobPosition: string;
  institution: string;
  duration: string;
};

type JobseekerProfile = {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  resume?: string;
  skills: string[];
  qualifications: Qualification[];
  experiences: Experience[];
  role: string;
};

const UserProfile = () => {
  const [profile, setProfile] = useState<JobseekerProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getJobseekerProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="bg-gray-50 p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
             {profile.profilePic ? (
               <img
                 src={profile.profilePic}
                 alt={profile.name}
                 className="w-full h-full object-cover"
               />
             ) : (
               <span className="text-gray-500 text-3xl font-semibold">
                 {profile.name?.charAt(0).toUpperCase()}
               </span>
             )}
           </div>
           
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.role}</p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-gray-600 hover:text-primary"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><Facebook size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><Twitter size={20} /></a>
              </div>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-500">Email</h3>
                  <p className="text-primary">{profile.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Resume</h3>
                  {profile.resume ? (
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                      <button className="flex items-center text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90">
                        <Download size={16} className="mr-2" />
                        Download CV
                      </button>
                    </a>
                  ) : (
                    <p className="text-gray-500">No resume uploaded</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Qualifications</h3>
                <div className="space-y-2">
                  {profile.qualifications?.map((q: Qualification, i: number) => (
                    <div key={i} className="text-sm">
                      🎓 {q.degree} at {q.institution} ({q.year})
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Experiences</h3>
                <div className="space-y-2">
                  {profile.experiences?.map((exp: Experience, i: number) => (
                    <div key={i} className="text-sm">
                      💼 {exp.jobPosition} at {exp.institution} ({exp.duration})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
