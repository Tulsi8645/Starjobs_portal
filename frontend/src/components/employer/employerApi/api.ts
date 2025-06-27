import axios from "axios";

const API_BASE_URL = 'http://localhost:8000';



export const createJob = async (jobData: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await axios.post(
    `${API_BASE_URL}/api/employer/jobs`,
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};


export const getEmployerProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
  
    const res = await axios.get(`${API_BASE_URL}/api/employer/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
  };



  export const getEmployerJobs = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
  
    const res = await axios.get(`${API_BASE_URL}/api/employer/my-jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
  };  