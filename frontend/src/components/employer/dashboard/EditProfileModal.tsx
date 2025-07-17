import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
    show: boolean;
    onClose: () => void;
    onSave: (updatedFields: Record<string, any>) => void;
    profile: any;
}

const industryOptions = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "others",
];

const companySizeOptions = [
   "Small (1-10 employees)",
   "Medium (11-100 employees)",
   "Large (100+ employees)",
];

const EditProfileModal: React.FC<Props> = ({ show, onClose, onSave, profile }) => {
    const [formState, setFormState] = useState({
        name: "",
        industryType: "",
        address: "",
        telephone: "",
        panNumber: "",
        companySize: "",
        establishedDate: "",
        description: "",
        companyLogo: null as File | null,
    });

    useEffect(() => {
        if (profile) {
            setFormState({
                name: profile.name || "",
                industryType: profile.industryType || "",
                address: profile.address || "",
                telephone: profile.telephone || "",
                panNumber: profile.panNumber || "",
                companySize: profile.companySize || "",
                establishedDate: profile.establishedDate?.split("T")[0] || "",
                description: profile.description || "",
                companyLogo: null,
            });
        }
    }, [profile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormState(prev => ({ ...prev, companyLogo: file }));
    };

    const handleSave = () => {
        const updatedFields: Record<string, any> = {};
        for (const key in formState) {
            if (formState[key as keyof typeof formState] !== "") {
                updatedFields[key] = formState[key as keyof typeof formState];
            }
        }
        onSave(updatedFields);
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-600">
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4">Edit Employer Profile</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Company Name</label>
                        <input
                            name="name"
                            value={formState.name}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Industry Type</label>
                        <select
                            name="industryType"
                            value={formState.industryType}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        >
                            <option value="">Select Industry</option>
                            {industryOptions.map((industry, idx) => (
                                <option key={idx} value={industry}>
                                    {industry}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold">Address</label>
                        <input
                            name="address"
                            value={formState.address}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Telephone</label>
                        <input
                            name="telephone"
                            value={formState.telephone}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                            type="tel"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">PAN Number</label>
                        <input
                            name="panNumber"
                            value={formState.panNumber}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">Company Size</label>
                        <select
                            name="companySize"
                            value={formState.companySize}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        >
                            <option value="">Select Size</option>
                            {companySizeOptions.map((size, idx) => (
                                <option key={idx} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold">Company Logo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full mt-1"
                        />
                        {formState.companyLogo && (
                            <img
                                src={URL.createObjectURL(formState.companyLogo)}
                                alt="Preview"
                                className="mt-2 h-32 w-32 rounded object-cover"
                            />
                        )}
                    </div>
                    <div>
                        <label className="font-semibold">Established Date</label>
                        <input
                            name="establishedDate"
                            type="date"
                            value={formState.establishedDate}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="font-semibold">About Company</label>
                        <textarea
                            name="description"
                            value={formState.description}
                            onChange={handleInputChange}
                            className="w-full border px-3 py-2 rounded mt-1"
                            rows={4}
                        />
                    </div>

                    
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;
