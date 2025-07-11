import { useEffect, useState } from "react";
import { getAllUsers, verifyEmployer } from "./adminApi/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  XCircle,
  ChevronDown,
  Loader2,
} from "lucide-react";

interface Employer {
  _id: string;
  name: string;
  email: string;
  role: "employer";
  isVerified: boolean;
  companyLogo?: string;
}

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const EmployerManagement = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchEmployers = async () => {
    try {
      const data = await getAllUsers();
      const employerData = data.filter((user: any) => user.role === "employer");
      setEmployers(employerData);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch employers:", error.message);
    }
  };

  useEffect(() => {
    fetchEmployers();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      setLoading(id);
      await verifyEmployer(id); 
      setEmployers((prev) =>
        prev.map((e) =>
          e._id === id ? { ...e, isVerified: !e.isVerified } : e
        )
      );
      setOpenDropdown(null);
    } catch (error) {
      console.error("Status update failed:", error);
      alert("Failed to update status.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Employer Management</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {employers.map((employer) => (
          <div
            key={employer._id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center relative"
          >
            <div
              className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 flex items-center justify-center cursor-pointer"
              onClick={() => navigate(`/admin/employer/${employer._id}/applicants`)}
            >
              {employer.companyLogo ? (
                <img
                  src={`${MEDIA_URL.replace(/\/$/, "")}/${employer.companyLogo.replace(/^\//, "")}`}
                  alt={employer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold text-gray-400">
                  {employer.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-lg font-medium">{employer.name}</div>
            <div className="text-sm text-gray-500 mb-3">{employer.email}</div>

            <div className="relative inline-block">
              <button
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${employer.isVerified
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                  }`}
                onClick={() =>
                  setOpenDropdown(openDropdown === employer._id ? null : employer._id)
                }
              >
                {employer.isVerified ? (
                  <>
                    <BadgeCheck className="w-4 h-4" />
                    Verified
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Unverified
                  </>
                )}
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>

              {openDropdown === employer._id && (
                <div className="absolute z-10 right-0 mt-2 w-32 bg-gray-100 border border-gray-200 rounded shadow-md">
                  {loading === employer._id ? (
                    <div className="p-2 flex justify-center">
                      <Loader2 className="animate-spin h-4 w-4 text-gray-500" />
                    </div>
                  ) : (
                    <button
                      onClick={() => handleToggleStatus(employer._id)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-300 text-sm"
                    >
                      {employer.isVerified ? "Unverify" : "Verify"}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {employers.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          No employers found.
        </div>
      )}
    </div>
  );
};

export default EmployerManagement;
