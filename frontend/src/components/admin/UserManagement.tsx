import { useEffect, useState } from "react";
import { Search, UserPlus, FileText, Eye, Trash2, Pencil } from "lucide-react";
import { getAllUsers, deleteUser } from "./adminApi/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "employer" | "jobseeker" | "admin";
  status?: string;
  createdAt: string;
  avatar?: string;
}

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"employer" | "jobseeker">("employer");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      const error = err as AxiosError;
      console.error("Failed to fetch users:", error.message);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (err) {
      const error = err as AxiosError;
      alert(error.response?.data || "Failed to delete user.");
    }
  };

  const getAvatar = (user: User): string | undefined => {
    // @ts-ignore
    return user.avatar || (user.role === "employer" ? (user as any).companyLogo : (user as any).profilePic);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.role === activeTab &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()))
  );

  const adminUsers = users.filter((user) => user.role === "admin");

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="overflow-auto p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* Toolbar */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center">
              <UserPlus size={20} className="mr-2" />
              Add Users
            </button>
            <button className="px-4 py-2 border rounded-lg flex items-center">
              <FileText size={20} className="mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Admin Table */}
        {adminUsers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Admin List</h2>
            <div className="overflow-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-3 text-left">USER</th>
                    <th className="px-6 py-3 text-left">EMAIL</th>
                    <th className="px-6 py-3 text-left">ROLE</th>
                    <th className="px-6 py-3 text-left">JOINED</th>
                    <th className="px-6 py-3 text-left">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 capitalize">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          className="text-gray-400 hover:text-blue-600"
                          onClick={() => navigate(`/admin/useredit/${user._id}`)}
                        >
                          <Pencil size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search Users..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {/* Tabs */}
        <div className="mb-6 sticky top-16 bg-white pt-6">
          <button
            className={`mr-4 pb-2 ${activeTab === "employer"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("employer")}
          >
            Employer List
          </button>
          <button
            className={`pb-2 ${activeTab === "jobseeker"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
              }`}
            onClick={() => setActiveTab("jobseeker")}
          >
            Job Seeker List
          </button>
        </div>

        {/* User Table */}
        <div className="overflow-auto" style={{ maxHeight: "300px" }}>
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-white sticky top-0">
                <th className="px-6 py-3 text-left">USER</th>
                <th className="px-6 py-3 text-left">ROLE</th>
                <th className="px-6 py-3 text-left">JOINED</th>
                <th className="px-6 py-3 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center mr-3">
                        {getAvatar(user) ? (
                          <img
                            src={`${MEDIA_URL.replace(/\/$/, "")}/${getAvatar(user)!.replace(/^\//, "")}`}
                            alt={user.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-sm font-bold text-gray-600">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => navigate(`/admin/userprofile/${user._id}`)}
                    >
                      <Eye size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          Showing {filteredUsers.length} user(s)
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
