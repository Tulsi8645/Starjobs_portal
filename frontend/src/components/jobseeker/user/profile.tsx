import { useEffect, useState } from "react";
import {
  Linkedin,
  Facebook,
  Twitter,
  Download,
  GraduationCap,
  BadgeCheck,
  Briefcase,
  Pencil,
} from "lucide-react";
import { getJobseekerProfile, updateJobseekerProfile } from "../jobseekerApi/api";

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

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const UserProfile = () => {
  const [profile, setProfile] = useState<JobseekerProfile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    skills: "",
    resume: null as File | null,
    profilePic: null as File | null,
  });

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

  useEffect(() => {
    if (profile) {
      setFormState({
        name: profile.name || "",
        skills: profile.skills?.join(", ") || "",
        resume: null,
        profilePic: null,
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const fd = new FormData();
      fd.append("name", formState.name);
      fd.append("skills", formState.skills);
      if (formState.profilePic) fd.append("profilePic", formState.profilePic);
      if (formState.resume) fd.append("resume", formState.resume);

      const updated = await updateJobseekerProfile(fd);
      setProfile(updated.jobseeker);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="bg-gray-50 p-20 overflow-auto" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden flex items-center justify-center">
                {profile.profilePic ? (
                  <img
                    src={`${MEDIA_URL.replace(/\/$/, "")}/${profile.profilePic.replace(/^\//, "")}`}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-500">
                    {profile.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {editMode ? (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormState({ ...formState, profilePic: e.target.files?.[0] || null })
                    }
                  />
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="text-xl font-semibold border rounded px-2 py-1 mt-2 w-full"
                  />
                </>
              ) : (
                <h2 className="text-2xl font-semibold">{profile.name}</h2>
              )}

              <p className="text-primary">{profile.email}</p>
              <p className="text-gray-600">{profile.role}</p>

              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-blue-600">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-blue-500">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-sky-500">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-2 flex flex-col justify-between relative">
              <button
                onClick={() => setEditMode(!editMode)}
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-primary"
              >
                <Pencil size={20} />
              </button>

              {/* Qualifications */}
              <div>
                <div className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                  <GraduationCap className="mr-2 text-primary" size={20} />
                  Qualifications
                </div>
                {profile.qualifications?.length > 0 ? (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {profile.qualifications.map((q, i) => (
                      <li key={i}>
                        <p className="font-semibold text-lg">{q.degree}</p> {q.institution} <br />{" "}
                        {q.year}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No qualifications added.</p>
                )}
              </div>

              {/* Skills */}
              <div className="mt-6">
                <div className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                  <BadgeCheck className="mr-2 text-primary" size={20} />
                  Skills
                </div>
                {editMode ? (
                  <input
                    type="text"
                    value={formState.skills}
                    onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
                    placeholder="e.g. JavaScript, React, MongoDB"
                    className="w-full border rounded px-2 py-1"
                  />
                ) : profile.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 border text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No skills added.</p>
                )}
              </div>

              {/* Experience */}
              <div className="mt-6">
                <div className="flex items-center mb-2 text-lg font-semibold text-gray-800">
                  <Briefcase className="mr-2 text-primary" size={20} />
                  Experience
                </div>
                {profile.experiences?.length > 0 ? (
                  <ul className="space-y-1 text-sm text-gray-700">
                    {profile.experiences.map((exp, i) => (
                      <li key={i}>
                        {exp.institution}, {exp.jobPosition}, {exp.duration}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No experience added.</p>
                )}
              </div>

              {/* Resume Upload / Download */}
              <div className="mt-6">
                {editMode ? (
                  <div>
                    <label className="block text-sm mb-1 font-semibold">Upload Resume (PDF)</label>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        setFormState({ ...formState, resume: e.target.files?.[0] || null })
                      }
                    />
                  </div>
                ) : profile.resume ? (
                  <a
                    href={`${MEDIA_URL.replace(/\/$/, "")}/${profile.resume.replace(/^\//, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-0 right-0"
                  >
                    <button className="flex items-center text-white bg-primary px-4 py-2 rounded-md hover:bg-primary/90">
                      <Download size={16} className="mr-2" />
                      Download CV
                    </button>
                  </a>
                ) : (
                  <div className="absolute bottom-0 right-0 bg-gray-500 flex items-center px-4 py-1 rounded-md">
                    <p className="text-white py-2">No resume uploaded</p>
                  </div>
                )}
              </div>

              {/* Save Button */}
              {editMode && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSave}
                    className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
