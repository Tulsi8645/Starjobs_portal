import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { fetchJobs } from "./adminApi/api";

interface Job {
    _id: string;
    title: string;
    description: string;
    location: string;
    jobtype: string;
    salary: string;
    experience: string;
    jobcategory: string;
    level: string;
    deadline: string;
    openings: number;
    istrending: boolean;
    status: string;
    employer: {
        name: string;
    };
    createdAt: string;
    views: { ip: string; date: string; _id: string }[];
    jobseekers: string[];
    likes: string[];
    dislikes: string[];
}

const JobManagement = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const getJobs = async () => {
        try {
            const data = await fetchJobs(page, 6);
            setJobs(data.jobs);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    useEffect(() => {
        getJobs();
    }, [page]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const filteredJobs = jobs.filter((job) =>
        job.employer?.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        
        <div className="p-3 h-[calc(100vh-64px)] overflow-y-auto w-full">
            <h2 className="text-2xl font-semibold mb-6">Job Management</h2>

            {/* Search Input */}
            <div className="mb-4">
                <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by employer..."
                        className="pl-10 pr-4 py-2 border rounded-lg w-full"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>

            {/* Scrollable Table */}
            <div className="mb-4">
                <div className="bg-white overflow-x-auto rounded-lg shadow-sm" style={{ maxWidth: "1050px" }}>
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-primary text-white">
                            <tr>
                                <th className="px-4 py-3 text-md">Title</th>
                                <th className="px-4 py-3">Employer</th>
                                <th className="px-4 py-3">Location</th>
                                <th className="px-4 py-3">Type</th>
                                <th className="px-4 py-3">Salary</th>
                                <th className="px-4 py-3">Experience</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Level</th>
                                <th className="px-4 py-3">Deadline</th>
                                <th className="px-4 py-3">Openings</th>
                                <th className="px-4 py-3">Trending</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Views</th>
                                <th className="px-4 py-3">Likes</th>
                                <th className="px-4 py-3">Dislikes</th>
                                <th className="px-4 py-3">Posted</th>
                                <th className="px-4 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredJobs.length === 0 ? (
                                <tr>
                                    <td colSpan={17} className="text-center py-4 text-gray-400">
                                        No jobs found.
                                    </td>
                                </tr>
                            ) : (
                                filteredJobs.map((job) => (
                                    <tr key={job._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 text-md font-semibold">{job.title}</td>
                                        <td className="px-4 py-3">{job.employer?.name}</td>
                                        <td className="px-4 py-3">{job.location}</td>
                                        <td className="px-4 py-3">{job.jobtype}</td>
                                        <td className="px-4 py-3">${job.salary}</td>
                                        <td className="px-4 py-3">{job.experience}</td>
                                        <td className="px-4 py-3">{job.jobcategory}</td>
                                        <td className="px-4 py-3">{job.level}</td>
                                        <td className="px-4 py-3">{new Date(job.deadline).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">{job.openings}</td>
                                        <td className="px-4 py-3">{job.istrending ? "Yes" : "No"}</td>
                                        <td className="px-4 py-3">{job.status}</td>
                                        <td className="px-4 py-3">{job.views?.length}</td>
                                        <td className="px-4 py-3">{job.likes?.length}</td>
                                        <td className="px-4 py-3">{job.dislikes?.length}</td>
                                        <td className="px-4 py-3">{new Date(job.createdAt).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => setSelectedJob(job)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                See more
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-[90%] max-w-4xl p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-semibold mb-4">{selectedJob.title} - Job Description</h3>
                        <div
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedJob.description }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobManagement;