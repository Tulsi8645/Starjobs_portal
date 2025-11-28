import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem("token");

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export interface JobCategory {
  _id: string;
  name: string;
  icon: string;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  deadline: Date | string;
  location: string;
  jobtype: string;
  salary: string;
  experience: string;
  level: string;
  jobcategory: string;
  openings: number;
  istrending: boolean;
  status: string;
  createdAt?: string;
  views?: { ip: string; date: string; _id: string }[];
  jobseekers?: string[];
  likes?: string[];
  dislikes?: string[];
  employer: {
    name: string;
    email?: string;
    companyLogo?: string;
  };
}

export const getAdminProfile = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/profile`, authHeader);
  return res.data;
};

export const getAdminStats = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/admin-stats`, authHeader);
  return res.data;
};

 
export const getAllJobStatsByDate = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/insights/all-job-stats`, authHeader);
  return res.data;
};

export const getAllUsers = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/admin/users`, authHeader);
    return res.data;
  };

export const updateUser = async (userId: string, data: FormData) => {
  const res = await axios.put(
    `${API_BASE_URL}/api/admin/user/${userId}`,
    data,
    {
      ...authHeader,
      headers: {
        ...authHeader.headers,
        "Content-Type": "multipart/form-data",
      },
    }
  );
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


export const updateJob = async (jobId: string, updatedData: Partial<Job>) => {
  const res = await axios.put(
    `${API_BASE_URL}/api/admin/job/${jobId}`,
    updatedData,
    authHeader
  );
  return res.data;
};


export const makeAnnouncement = async (data: {
  message: string;
  targetRole: "all" | "jobseeker" | "employer";
}) => {
  const res = await axios.post(
    `${API_BASE_URL}/api/notification/announcement`,
    data,
    authHeader
  );
  return res.data;
};

export const toggleTrendingStatus = async (jobId: string, istrending: boolean) => {
  const res = await axios.patch(
    `${API_BASE_URL}/api/admin/jobs/${jobId}/trending`,
    { istrending },
    authHeader
  );
  return res.data;
};



export const deleteJob = async (jobId:any) => {
    const res = await axios.delete(`${API_BASE_URL}/api/admin/job/${jobId}`, authHeader);
    return res.data;
  };


export const fetchRevenues = () =>
  axios.get(`${API_BASE_URL}/api/revenue`, authHeader).then(res => res.data);

export const fetchEmployers = () =>
  axios.get(`${API_BASE_URL}/api/revenue/allemployers`, authHeader).then(res => res.data);

export const fetchJobsByEmployer = (employerId: string) =>
  axios.get(`${API_BASE_URL}/api/revenue/employer/${employerId}/jobs`, authHeader).then(res => res.data);

export const addRevenue = (payload: any) =>
  axios.post(`${API_BASE_URL}/api/revenue`, payload, authHeader).then(res => res.data);

export const updateRevenue = (id: string, payload: any) =>
  axios.put(`${API_BASE_URL}/api/revenue/${id}`, payload, authHeader).then(res => res.data);

export const deleteRevenue = (id: string) =>
  axios.delete(`${API_BASE_URL}/api/revenue/${id}`, authHeader).then(res => res.data);




// Job Category APIs
export const getJobCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/jobcategories`);
  return res.data;
};

export const createJobCategory = async (formData: FormData) => {
  const res = await axios.post(`${API_BASE_URL}/api/jobcategories`, formData, {
    headers: {
      ...authHeader.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updateJobCategory = async (id: string, formData: FormData) => {
  const res = await axios.put(`${API_BASE_URL}/api/jobcategories/${id}`, formData, {
    headers: {
      ...authHeader.headers,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteJobCategory = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/jobcategories/${id}`, authHeader);
  return res.data;
};

export const toggleJobCategoryTrending = async (id: string, isTrending: boolean) => {
  const res = await axios.patch(
    `${API_BASE_URL}/api/jobcategories/${id}/trending`,
    { isTrending },
    authHeader
  );
  return res.data;
};

export const getTrendingCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/jobcategories/trending/all`);
  return res.data;
};
