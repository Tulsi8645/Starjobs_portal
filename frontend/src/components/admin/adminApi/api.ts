
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getAdminProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/profile`, authHeader);
  return res.data;
};

export const getAdminStats = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/admin-stats`, authHeader);
  return res.data;
};


export const getAllUsers = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/admin/users`, authHeader);
    return res.data;
  };
  
export const deleteUser = async (userId:any) => {
    const res = await axios.delete(`${API_BASE_URL}/api/admin/user/${userId}`, authHeader);
    return res.data;
  };

  export const verifyEmployer = async (userId: string) => {
    const res = await axios.patch(`${API_BASE_URL}/api/admin/verify-employer/${userId}`, {}, authHeader);
    return res.data;
  };

  export const getAllApplicantsForEmployerJobs = async (employerId: string) => {
    const res = await axios.get(
      `${API_BASE_URL}/api/admin/employer/${employerId}/applicants`,
      authHeader
    );
    return res.data;
  };


  export const updateApplicationStatus = async (applicationId: string, status: string) => {
    const res = await axios.patch(
      `${API_BASE_URL}/api/admin/applications/${applicationId}/status`,
      { status },
      authHeader
    );
    return res.data;
  };
  

export const fetchJobs = async (page = 1, limit = 6, search = "") => {
  const res = await axios.get(
    `${API_BASE_URL}/api/admin/jobs?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`,
    authHeader
  );
  return res.data;
};
