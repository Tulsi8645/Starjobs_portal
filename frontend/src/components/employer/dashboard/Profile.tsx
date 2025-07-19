import { useEffect, useState } from "react";
import {
  Linkedin,
  Facebook,
  Twitter,
  Building2,
  Phone,
  Mail,
  MapPin,
  CalendarDays,
  Users,
  BadgeInfo,
  BadgeCheck,
  XCircle,
  Pencil
} from "lucide-react";
import { getEmployerProfile, updateEmployerProfile } from "../employerApi/api";
import EditProfileModal from "./EditProfileModal";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getEmployerProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center py-10">Loading profile...</div>;
  if (!profile) return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;

  return (
    <div className="bg-gray-50 p-20 overflow-auto" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-14 relative">
          {/* Edit Icon */}
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={() => setShowEditModal(true)}
              className="text-gray-500 hover:text-primary"
              title="Edit Profile"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Section */}
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 overflow-hidden flex items-center justify-center">
                {profile.companyLogo ? (
                  <img
                    src={`${MEDIA_URL.replace(/\/$/, "")}/${profile.companyLogo.replace(/^\//, "")}`}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-500">
                    {profile.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-semibold">{profile.name}</h2>
              <p className="text-primary">{profile.industryType}</p>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-blue-600"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-blue-500"><Facebook size={20} /></a>
                <a href="#" className="text-gray-500 hover:text-sky-500"><Twitter size={20} /></a>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:col-span-2 flex flex-col justify-between space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <Mail size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">Email</span>
                  </div>
                  <p className="text-primary">{profile.email}</p>
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <MapPin size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">Company Address</span>
                  </div>
                  <p className="text-primary">{profile.address || "Not available"}</p>
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <Phone size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">Telephone</span>
                  </div>
                  <p className="text-primary">{profile.telephone || "Not available"}</p>
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <BadgeInfo size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">PAN Number</span>
                  </div>
                  <p className="text-primary">{profile.panNumber || "Not available"}</p>
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <Users size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">Company Size</span>
                  </div>
                  <p className="text-primary">{profile.companySize || "Not available"}</p>
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-500">
                    <CalendarDays size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">Established Date</span>
                  </div>
                  <p className="text-primary">
                    {profile.establishedDate
                      ? new Date(profile.establishedDate).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center mb-1 text-gray-500">
                    <Building2 size={16} className="mr-2 text-primary" />
                    <span className="font-semibold text-base">About Company</span>
                  </div>
                  <p className="text-primary">{profile.description || "Not available"}</p>
                </div>
              </div>

              {/* Bottom Right Verified Status */}
              <div className="flex justify-end mt-6">
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium
                  ${profile.isVerified ? "bg-green-100 text-green-600" : "bg-gray-500 text-white"}
                  `}
                >
                  {profile.isVerified ? (
                    <>
                      <BadgeCheck className="w-4 h-4" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Not Verified
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <EditProfileModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          profile={profile}
          onSave={async (updatedFields) => {
            try {
              const formData = new FormData();
              for (const key in updatedFields) {
                formData.append(key, updatedFields[key]);
              }

              const updated = await updateEmployerProfile(formData);
              setProfile(updated); 
              setShowEditModal(false);
            } catch (error) {
              console.error("Failed to update profile:", error);
              // Optionally show an error toast or message here
            }
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
