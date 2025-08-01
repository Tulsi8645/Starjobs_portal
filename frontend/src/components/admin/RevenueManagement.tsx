import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  fetchRevenues,
  fetchEmployers,
  fetchJobsByEmployer,
  addRevenue,
  updateRevenue,
  deleteRevenue,
  toggleTrendingStatus,
} from "./adminApi/api";

interface Revenue {
  _id: string;
  amount: number;
  currency: string;
  paidBy: {
    _id: string;
    name: string;
  };
  paidFor: {
    _id: string;
    title: string;
    istrending: boolean;
  };
  remarks?: string;
  createdAt?: string;
}

interface RevenueFormData {
  _id?: string;
  amount?: number;
  currency?: string;
  paidBy?: string;
  paidFor?: string;
  remarks?: string;
}

interface Employer {
  _id: string;
  name: string;
  email: string;
}

interface Job {
  _id: string;
  title: string;
}

const currencies = ["USD", "EUR", "GBP", "INR", "AED", "NPR"];

const RevenueManagement: React.FC = () => {
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [formData, setFormData] = useState<RevenueFormData>({});
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const fetchAllData = async () => {
    const [revenueData, employerData] = await Promise.all([
      fetchRevenues(),
      fetchEmployers(),
    ]);
    setRevenues(revenueData);
    setEmployers(employerData.employers);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleEmployerChange = async (employerId: string) => {
    const data = await fetchJobsByEmployer(employerId);
    setJobs(data.jobs);
    setFormData((prev) => ({ ...prev, paidBy: employerId, paidFor: "" }));
  };

  const handleSubmit = async () => {
    const payload = {
      amount: formData.amount,
      currency: formData.currency || "USD",
      paidBy: formData.paidBy,
      paidFor: formData.paidFor,
      remarks: formData.remarks,
    };

    try {
      if (editMode && formData._id) {
        await updateRevenue(formData._id, payload);
      } else {
        await addRevenue(payload);
      }
      setShowModal(false);
      setFormData({});
      fetchAllData();
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleToggleTrending = async (jobId: string, currentStatus: boolean) => {
    try {
      await toggleTrendingStatus(jobId, !currentStatus);
      fetchAllData();
    } catch (error) {
      console.error("Failed to toggle trending status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this revenue?")) {
      await deleteRevenue(id);
      fetchAllData();
    }
  };

  const openModal = async (revenue?: Revenue) => {
    if (revenue) {
      setEditMode(true);
      const jobResponse = await fetchJobsByEmployer(revenue.paidBy._id);
      setJobs(jobResponse.jobs);
      setFormData({
        _id: revenue._id,
        amount: revenue.amount,
        currency: revenue.currency || "USD",
        paidBy: revenue.paidBy._id,
        paidFor: revenue.paidFor._id,
        remarks: revenue.remarks,
      });
    } else {
      setEditMode(false);
      setFormData({});
      setJobs([]);
    }
    setShowModal(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Revenue Management</h2>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => openModal()}
        >
          + Revenue
        </button>
      </div>

      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Amount</th>
            <th className="p-2">Paid By</th>
            <th className="p-2">Paid For</th>
            <th className="p-2">Trending</th>
            <th className="p-2">Remarks</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {revenues.map((rev) => (
            <tr key={rev._id} className="border-t">
              <td className="p-2">
                {rev.currency || "USD"} {rev.amount}
              </td>
              <td className="p-2">{rev.paidBy?.name}</td>
              <td className="p-2">{rev.paidFor?.title}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${rev.paidFor?.istrending
                    ? "bg-green-200 text-green-800"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {rev.paidFor?.istrending ? "Trending" : "Basic Job"}
                </span>
              </td>
              <td className="p-2">{rev.remarks || "-"}</td>
              <td className="p-2">{formatDate(rev.createdAt)}</td>
              <td className="p-2 flex gap-2 items-center">
                <button
                  className="bg-primary text-white px-3 py-1 rounded text-xs"
                  onClick={() =>
                    handleToggleTrending(rev.paidFor._id, rev.paidFor.istrending)
                  }
                >
                  Toggle
                </button>
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => openModal(rev)}
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(rev._id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h3 className="text-xl mb-4">
              {editMode ? "Edit Revenue" : "Add Revenue"}
            </h3>

            <label className="block mb-2">Employer</label>
            <select
              value={formData.paidBy || ""}
              onChange={(e) => handleEmployerChange(e.target.value)}
              className="w-full border px-2 py-1 mb-4"
            >
              <option value="">Select Employer</option>
              {employers.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            <label className="block mb-2">Job</label>
            <select
              value={formData.paidFor || ""}
              onChange={(e) =>
                setFormData({ ...formData, paidFor: e.target.value })
              }
              className="w-full border px-2 py-1 mb-4"
            >
              <option value="">Select Job</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full border px-2 py-1"
                  value={formData.amount || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: Number(e.target.value) })
                  }
                />
              </div>

              <div className="w-1/2">
                <label className="block mb-1">Currency</label>
                <select
                  value={formData.currency || "USD"}
                  onChange={(e) =>
                    setFormData({ ...formData, currency: e.target.value })
                  }
                  className="w-full border px-2 py-1"
                >
                  {currencies.map((cur) => (
                    <option key={cur} value={cur}>
                      {cur}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            <label className="block mb-2">Remarks</label>
            <input
              type="text"
              className="w-full border px-2 py-1 mb-4"
              value={formData.remarks || ""}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={handleSubmit}
              >
                {editMode ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueManagement;
