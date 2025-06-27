import { useEffect, useState } from "react";
import { Linkedin, Facebook, Twitter } from "lucide-react";
import { getEmployerProfile } from "../employerApi/api";



const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="bg-gray-50 p-6 overflow-auto" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Profile Info */}
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

              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.industryType}</p>
              <p className="text-sm text-gray-500 mt-4">{profile.description}</p>
              <div className="flex justify-center space-x-4 mt-6">
                <a href="#" className="text-gray-600 hover:text-primary"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><Facebook size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-primary"><Twitter size={20} /></a>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-500">Email</h3>
                  <p className="text-primary">{profile.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">TelePhone</h3>
                  <p className="text-primary">{profile.telephone || "Not available"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">PAN Number</h3>
                  <p className="text-primary">{profile.panNumber || "Not available"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Company Size</h3>
                  <p className="text-primary">{profile.companySize || "Not available"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Established Date</h3>
                  <p className="text-primary">
                    {profile.establishedDate
                      ? new Date(profile.establishedDate).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Company Address</h3>
                  <p className="text-primary">{profile.address || "Not available"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-500">Description</h3>
                  <p className="text-primary">{profile.description || "Not available"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
