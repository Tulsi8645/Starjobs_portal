import React from "react";
import { PlusCircle } from "lucide-react";

interface Qualification {
    degree: string;
    institution: string;
    year: number;
}

interface Experience {
    jobPosition: string;
    institution: string;
    duration: string;
}

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: () => void;
    formState: {
        name: string;
        skills: string;
        qualifications: Qualification[];
        experiences: Experience[];
        resume: File | null;
        profilePic: File | null;
    };
    setFormState: React.Dispatch<React.SetStateAction<any>>;
    addQualification: () => void;
    removeQualification: (index: number) => void;
    handleQualificationChange: (index: number, updated: Qualification) => void;
    addExperience: () => void;
    removeExperience: (index: number) => void;
    handleExperienceChange: (index: number, updated: Experience) => void;
}

const EditProfileModal: React.FC<Props> = ({
    show,
    onClose,
    onSave,
    formState,
    setFormState,
    addQualification,
    removeQualification,
    handleQualificationChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

                <div className="grid grid-cols-1 gap-4">
                    {/* Name */}
                    <div>
                        <label className="font-semibold">Name</label>
                        <input
                            type="text"
                            value={formState.name}
                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                    </div>

                    {/* Profile Picture */}
                    <div>
                        <label className="font-semibold">Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setFormState({ ...formState, profilePic: e.target.files?.[0] || null })
                            }
                            className="w-full mt-1"
                        />
                        {formState.profilePic && (
                            <img
                                src={URL.createObjectURL(formState.profilePic)}
                                alt="Preview"
                                className="mt-2 h-32 w-32 rounded-full object-cover"
                            />
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="font-semibold">Skills (comma-separated)</label>
                        <input
                            type="text"
                            value={formState.skills}
                            onChange={(e) => setFormState({ ...formState, skills: e.target.value })}
                            placeholder="e.g., React, TypeScript, Node.js"
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {(formState.skills.split(",").map((skill) => skill.trim())).filter(Boolean).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Resume */}
                    <div>
                        <label className="font-semibold">Resume (PDF)</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) =>
                                setFormState({ ...formState, resume: e.target.files?.[0] || null })
                            }
                            className="w-full mt-1"
                        />
                    </div>

                    {/* Qualifications */}
                    <div>
                        <label className="block font-semibold mb-2">Qualifications</label>
                        {formState.qualifications.map((q, index) => (
                            <div key={index} className="space-y-2 border rounded p-3 mb-2">
                                <input
                                    type="text"
                                    placeholder="Degree"
                                    value={q.degree}
                                    onChange={(e) =>
                                        handleQualificationChange(index, { ...q, degree: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="Institution"
                                    value={q.institution}
                                    onChange={(e) =>
                                        handleQualificationChange(index, { ...q, institution: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="year"
                                    value={q.year}
                                    onChange={(e) =>
                                        handleQualificationChange(index, {
                                            ...q,
                                            year: parseInt(e.target.value, 10),
                                        })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <button
                                    onClick={() => removeQualification(index)}
                                    className="text-red-600 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addQualification}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            <PlusCircle size={18} className="mr-1" /> Add Qualification
                        </button>
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block font-semibold mb-2">Experience</label>
                        {formState.experiences.map((exp, index) => (
                            <div key={index} className="space-y-2 border rounded p-3 mb-2">
                                <input
                                    type="text"
                                    placeholder="jobPosition"
                                    value={exp.jobPosition}
                                    onChange={(e) =>
                                        handleExperienceChange(index, { ...exp, jobPosition: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="institution"
                                    value={exp.institution}
                                    onChange={(e) =>
                                        handleExperienceChange(index, { ...exp, institution: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    placeholder="duration"
                                    value={exp.duration}
                                    onChange={(e) =>
                                        handleExperienceChange(index, { ...exp, duration: e.target.value })
                                    }
                                    className="w-full px-3 py-2 border rounded"
                                />
                                <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-600 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addExperience}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                            <PlusCircle size={18} className="mr-1" /> Add Experience
                        </button>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                        Cancel
                    </button>
                    <button onClick={onSave} className="px-4 py-2 bg-primary text-white rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
