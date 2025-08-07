
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Job {
  _id: string;
  title: string;
  location: string;
  jobtype: string;
  status: string;
  salary: string;
  experience: string;
  level: string;
  deadline: string;
  istrending: boolean;
  openings: number;
  description: string;
  likeCount: number;
  dislikeCount: number;
  jobseekers: any[];
  jobcategory: string;
  createdAt: string;
  updatedAt?: string;
  employer?: {
    _id: string;
    name: string;
    email?: string;
    companyLogo?: string;
  };
}


interface FetchJobsParams {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  jobType?: string;
  level?: string;
}



export const getStats = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/admin/admin-stats`);
  return res.data;
};



// Fetch all jobs with pagination
export const fetchJobs = async ({
  page = 1,
  limit = 6,
  search = '',
  location = '',
  jobType = '',
  level = '',
}: FetchJobsParams) => {
  const response = await axios.get(`${API_BASE_URL}/api/jobs`, {
    params: {
      page,
      limit,
      search,
      location,
      jobtype: jobType,
      level,
    },
  });
  return response.data;
};

// Fetch trending jobs
export const fetchTrendingJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/jobs/trending`);
  return response.data.jobs;
};

// Fetch trending jobs
export const fetchRecentJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/jobs/recent`);
  return response.data.jobs;
};


// Fetch a specific job by ID
export const fetchJobById = async (id: string): Promise<Job> => {
  const response = await axios.get(`${API_BASE_URL}/api/jobs/${id}`);
  return response.data;
};

// Apply to a job
export const applyToJob = async ({
  jobId,
  howDidYouHear,
  coverLetter,
  resumeFile,
}: {
  jobId: string;
  howDidYouHear: string;
  coverLetter: string;
  resumeFile: File;
}) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Not authenticated");
  }

  const formData = new FormData();
  formData.append("jobId", jobId);
  formData.append("howDidYouHear", howDidYouHear);
  formData.append("coverLetter", coverLetter);
  formData.append("resume", resumeFile);

  const response = await fetch(`${API_BASE_URL}/api/jobs/apply`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

// Like a job
export const likeJob = async (jobId: string): Promise<{ message: string; likes: number; dislikes: number }> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.post(
    `${API_BASE_URL}/api/jobs/${jobId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

// Dislike a job
export const dislikeJob = async (jobId: string): Promise<{ message: string; dislikes: number; likes: number }> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.post(
    `${API_BASE_URL}/api/jobs/${jobId}/dislike`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};


export const getJobseekerProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(`${API_BASE_URL}/api/jobseeker/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateJobseekerProfile = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.put(`${API_BASE_URL}/api/jobseeker/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


// Toggle save/unsave job
export const toggleSaveJob = async (jobId: string): Promise<{ message: string; saved: boolean }> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.patch(
    `${API_BASE_URL}/api/jobs/${jobId}/save`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

// Fetch saved jobs
export const fetchSavedJobs = async (): Promise<Job[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(`${API_BASE_URL}/api/jobs/saved-jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// Fetch applied jobs
export const fetchAppliedJobs = async (): Promise<Job[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(`${API_BASE_URL}/api/jobseeker/applied-jobs`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// Fetch dashboard stats
export const fetchDashboardStats = async (): Promise<{
  totalApplications: number;
  pending: number;
  reviewed: number;
  accepted: number;
  rejected: number;
}> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(`${API_BASE_URL}/api/jobseeker/dashboard-stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};


export type JobseekerNotification = {
  _id: string;
  message: string;
  createdAt: string;
  relatedJob?: string;
  relatedApplication?: string;
  relatedRevenue?: string;
};

export const getJobseekerNotifications = async (): Promise<JobseekerNotification[]> => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.get(
    `${API_BASE_URL}/api/notification/jobseeker`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
