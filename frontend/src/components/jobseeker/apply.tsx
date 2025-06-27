import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchJobById, applyToJob } from "./jobseekerApi/api";

interface Job {
  _id: string;
  title: string;
  description: string;
}

const ApplyPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [howDidYouHear, setHowDidYouHear] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  useEffect(() => {
    const loadJob = async () => {
      if (!jobId) return;

      try {
        const data = await fetchJobById(jobId);
        setJob(data); 
      } catch (err) {
        console.error("Failed to fetch job", err);
      }
    };
    loadJob();
  }, [jobId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!jobId || !resumeFile) return;

    try {
      await applyToJob({
        jobId,
        howDidYouHear,
        coverLetter,
        resumeFile,
      });
      alert("Application submitted successfully!");
      navigate("/jobs");
    } catch (error: any) {
      console.error("Application error:", error);
      alert(error.message || "Failed to submit application.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeFile(e.target.files[0]);
    }
  };

  if (!job) return <div>Loading job details...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Apply to {job.title}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label className="block mb-2">
          How did you hear about this job?
          <input
            type="text"
            value={howDidYouHear}
            onChange={(e) => setHowDidYouHear(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
          />
        </label>

        <label className="block mb-2 mt-4">
          Cover Letter
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
            className="w-full border rounded p-2 mt-1"
            rows={8}
          />
        </label>

        <label className="block mb-4 mt-4">
          Resume (PDF or DOC)
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            required
            className="block mt-1"
          />
        </label>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyPage;
