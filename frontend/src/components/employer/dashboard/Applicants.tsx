import { useEffect, useState } from "react";
import { getAllApplicantsForEmployerJobs, updateApplicationStatus } from "../employerApi/api";
import { Eye } from "lucide-react";

const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || "";

const Applicants = () => {
    const [data, setData] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedCoverLetter, setSelectedCoverLetter] = useState<string | null>(null);

    const fetchApplicants = async (page: number) => {
        setLoading(true);
        try {
            const res = await getAllApplicantsForEmployerJobs(page);
            setData(res.data.flatMap((job: any) =>
                job.applicants.map((applicant: any) => ({
                    ...applicant,
                    jobTitle: job.jobTitle,
                    jobId: job.jobId,
                }))
            ));
            setTotalPages(res.totalPages);
        } catch (err) {
            console.error("Error fetching applicants:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants(page);
    }, [page]);

    const handleStatusChange = async (applicationId: string, newStatus: string) => {
        try {
            await updateApplicationStatus(applicationId, newStatus);
            setData((prev) =>
                prev.map((app) =>
                    app.applicationId === applicationId ? { ...app, status: newStatus } : app
                )
            );
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    return (
        <div className="min-h-screen overflow-auto p-6" style={{ maxHeight: "calc(100vh - 50px)" }}>
            <h1 className="text-2xl font-semibold mb-4">All Applicants</h1>

            {data.length === 0 && !loading ? (
                <p>No applicants found for your jobs.</p>
            ) : (
                <div className="overflow-x-auto bg-white p-4 rounded shadow-sm">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm">
                                <th className="p-2 border">Job Title</th>
                                <th className="p-2 border">Name</th>
                                <th className="p-2 border">Email</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Applied</th>
                                <th className="p-2 border">Cover Letter</th>
                                <th className="p-2 border">Resume</th>
                                <th className="p-2 border">Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((applicant) => (
                                <tr key={applicant.applicationId} className="text-sm hover:bg-gray-50">
                                    <td className="p-2 border">{applicant.jobTitle}</td>
                                    <td className="p-2 border">{applicant.applicant?.name || <span className="italic text-gray-400">No name</span>}</td>
                                    <td className="p-2 border">{applicant.applicant?.email || <span className="italic text-gray-400">No email</span>}</td>
                                    <td className="p-2 border">
                                        <span className={`px-2 py-1 text-sm rounded-md ${applicant.status === "Pending" ? "bg-yellow-200" :
                                            applicant.status === "Reviewed" ? "bg-blue-200" :
                                                applicant.status === "Accepted" ? "bg-green-200" :
                                                    applicant.status === "Rejected" ? "bg-red-200" : "bg-gray-300"
                                            }`}>
                                            {applicant.status}
                                        </span>
                                    </td>
                                    <td className="p-2 border">{new Date(applicant.appliedAt).toLocaleDateString()}</td>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => setSelectedCoverLetter(applicant.coverLetter)}
                                            className="text-blue-600 text-sm hover:text-blue-800"
                                        >
                                            Click here ...
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        {applicant.resume ? (
                                            <a
                                                href={`${MEDIA_URL.replace(/\/$/, "")}/${applicant.resume.replace(/\\/g, "/").replace(/^.*\/uploads/, "uploads")}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button className="flex items-center text-white bg-primary px-3 py-1 rounded hover:bg-primary/90">
                                                    <Eye size={14} className="mr-1" />
                                                    Resume
                                                </button>
                                            </a>
                                        ) : (
                                            <span className="text-gray-500 text-xs">No resume</span>
                                        )}
                                    </td>
                                    <td className="p-2 border">
                                        <select
                                            value={applicant.status}
                                            onChange={(e) => handleStatusChange(applicant.applicationId, e.target.value)}
                                            className="border rounded px-2 py-1 text-sm w-full"
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Reviewed">Reviewed</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-1 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-1 bg-primary text-white rounded hover:bg-primary disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {selectedCoverLetter && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" >
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg   overflow-y-auto" style={{ maxHeight: "calc(100vh - 50px)" }}>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap">{selectedCoverLetter}</p>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setSelectedCoverLetter(null)}
                                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Applicants;
