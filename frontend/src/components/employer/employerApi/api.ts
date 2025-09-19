import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


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

export const patchJob = async (jobId: string, updatedFields: Partial<any>) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.patch(
    `${API_BASE_URL}/api/employer/jobs/${jobId}`,
    updatedFields,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};


export const getSingleJob = async (jobId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.get(`${API_BASE_URL}/api/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const editJob = async (jobId: string, updatedData: any) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.put(
    `${API_BASE_URL}/api/employer/jobs/${jobId}`,
    updatedData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};


export const deleteJob = async (jobId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.delete(
    `${API_BASE_URL}/api/employer/jobs/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const updateEmployerProfile = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.put(`${API_BASE_URL}/api/employer/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
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

   export const getEmployerDashboardStats = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
  
    const res = await axios.get(`${API_BASE_URL}/api/employer/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res.data;
  };

  export const getJobApplicants = async (jobId: string) => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
  
    const res = await axios.get(
      `${API_BASE_URL}/api/employer/jobs/${jobId}/jobseekers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    return res.data;
  };
  

  
export const getAllApplicantsForEmployerJobs = async ( page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.get(`${API_BASE_URL}/api/employer/my-jobs/applications?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};



export const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.patch(
    `${API_BASE_URL}/api/employer/applications/${applicationId}/status`,
    { status: newStatus },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAllApplicantsForEmployer = async (page = 1, limit = 5) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.get(
    `${API_BASE_URL}/api/employer/my-jobs/applicants?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data; 
};

export const getAllApplicants = async (page = 1, limit = 5) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const res = await axios.get(
    `${API_BASE_URL}/api/employer/my-jobs/applicants?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};




export type EmployerNotification = {
  _id: string;
  message: string;
  createdAt: string;
  relatedJob?: string;
  relatedApplication?: string;
  relatedRevenue?: string;
};

export const getEmployerNotifications = async (): Promise<EmployerNotification[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(
    `${API_BASE_URL}/api/notification/employer`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
