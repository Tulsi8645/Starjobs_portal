import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createJob, getSingleJob, editJob } from "../employerApi/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(jobId);

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    jobtype: "",
    salary: "",
    experience: "",
    jobcategory: "",
    level: "",
    deadline: "",
    openings: 1,
    description: "",
  });

  // Fetch existing job if in edit mode
  const { data: jobData, isLoading: isFetching } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getSingleJob(jobId!),
    enabled: !!jobId,
  });

  useEffect(() => {
    if (jobData) {
      setFormData({
        ...jobData,
        deadline: new Date(jobData.deadline).toISOString().split("T")[0],
        openings: jobData.openings || 1,
      });
    }
  }, [jobData]);

  // Create or update job
  const mutation = useMutation({
    mutationFn: (data: any) =>
      isEdit ? editJob(jobId!, data) : createJob(data),
    onSuccess: (data) => {
      alert(isEdit ? "Job updated successfully!" : "Job posted successfully!");
      navigate("/employer/dashboard");
    },
    onError: (error: any) => {
      console.error("Job save failed:", error);
      alert("Failed to save job.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      openings: Number(formData.openings),
      deadline: new Date(formData.deadline),
    });
  };

  if (isEdit && isFetching) return <div>Loading job data...</div>;

  return (
    <div className="min-h-screen overflow-auto bg-gray-50" style={{ maxHeight: 'calc(100vh - 50px)' }}>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-3xl mx-auto bg-white p-8 rounded-lg shadow mt-10"
      >
        <h2 className="text-2xl font-bold mb-6">{isEdit ? "Edit Job" : "Post a Job"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Job Title</label>
            <input
              name="title"
              placeholder="e.g. Software Engineer"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              name="location"
              placeholder="e.g. Kathmandu"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Type</label>
            <select
              name="jobtype"
              value={formData.jobtype}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Hourly">Hourly</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Salary</label>
            <input
              name="salary"
              placeholder="e.g. $1000, negotiable"
              value={formData.salary}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Experience</label>
            <input
              name="experience"
              placeholder="e.g. 2+ years"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Category</label>
            <input
              name="jobcategory"
              placeholder="e.g. IT, Finance"
              value={formData.jobcategory}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Job Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Level</option>
              <option value="Internship">Internship</option>
              <option value="Fresher">Fresher</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Deadline</label>
            <input
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Openings</label>
            <input
              name="openings"
              type="number"
              value={formData.openings}
              onChange={handleChange}
              min={1}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="mt-6 mb-4">
          <label className="block mb-2 font-medium text-gray-700">Job Description</label>
          <div className="h-[250px]">
            <ReactQuill
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              theme="snow"
              className="h-[90%]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
        >
          {mutation.isPending
            ? isEdit
              ? "Updating Job..."
              : "Posting Job..."
            : isEdit
              ? "Update Job"
              : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
