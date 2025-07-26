import { useState, useRef } from 'react';
import EditableField from './components/EditableField';
import ImageUpload from './components/ImageUpload';
import EditorHeader from './components/EditorHeader';
import { generatePDF } from './utils/pdfGenerator';



export interface ResumeData {
    personalInfo: {
        name: string;
        title: string;
        email: string;
        phone: string;
        location: string;
        summary: string;
        profileImage: string | null;
    };
    experience: Array<{
        id: string;
        company: string;
        position: string;
        duration: string;
        description: string;
    }>;
    education: Array<{
        id: string;
        institution: string;
        degree: string;
        year: string;
    }>;
    skills: string[];
}

export const defaultResumeData: ResumeData = {
    personalInfo: {
        name: 'Your Name',
        title: 'Your Professional Title',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        location: 'City, State',
        summary: 'Write a brief summary about your professional background and career objectives. This should be 2-3 sentences highlighting your key strengths and experience.',
        profileImage: null
    },
    experience: [
        {
            id: '1',
            company: 'Company Name',
            position: 'Job Title',
            duration: '2020 - Present',
            description: 'Describe your key responsibilities and achievements in this role. Use bullet points to highlight specific accomplishments and quantify results where possible.'
        },
        {
            id: '2',
            company: 'Previous Company',
            position: 'Previous Job Title',
            duration: '2018 - 2020',
            description: 'Describe your key responsibilities and achievements in this role. Focus on transferable skills and notable projects.'
        }
    ],
    education: [
        {
            id: '1',
            institution: 'University Name',
            degree: 'Bachelor of Science in Your Field',
            year: '2018'
        }
    ],
    skills: ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5', 'Skill 6']
};
const BlueTemplateEditor = () => {
    const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);

    const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string | null) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    const updateExperience = (id: string, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const updateEducation = (id: string, field: string, value: string) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const updateSkills = (index: number, value: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) => i === index ? value : skill)
        }));
    };

    const handleDownloadPDF = async () => {
        await generatePDF(resumeRef, `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <EditorHeader
                templateName="Professional CV"
                isPreviewMode={isPreviewMode}
                onTogglePreview={() => setIsPreviewMode(!isPreviewMode)}
                onDownloadPDF={handleDownloadPDF}
            />

            <div className="container mx-auto px-6 py-8">
                {!isPreviewMode && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-blue-800 text-sm">
                            <strong>Editing Mode:</strong> Click on any text to edit it directly.
                            Use the Preview button to see how your resume will look when printed.
                        </p>
                    </div>
                )}

                <div className="flex justify-center">
                    <div className="bg-white max-w-4xl mx-auto shadow-2xl" ref={resumeRef}>
                        {/* Header */}
                        <div className=" p-8 flex items-center">
                            {/* Profile Image */}
                            <div className="mr-8">
                                <ImageUpload
                                    imageUrl={resumeData.personalInfo.profileImage}
                                    onImageChange={(url) => updatePersonalInfo('profileImage', url)}
                                    className="w-28 h-28 rounded-full border-4 border-blue-400"
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>

                            {/* Header Info */}
                            <div className="flex-1">
                                <EditableField
                                    value={resumeData.personalInfo.name}
                                    onChange={(value) => updatePersonalInfo('name', value)}
                                    className="text-4xl font-bold mb-2 block"
                                    isPreviewMode={isPreviewMode}
                                />
                                <EditableField
                                    value={resumeData.personalInfo.title}
                                    onChange={(value) => updatePersonalInfo('title', value)}
                                    className="text-xl text-blue-200 block"
                                    isPreviewMode={isPreviewMode}
                                />
                            </div>
                        </div>

                        <div className="flex">
                            {/* Left Column */}
                            <div className="w-1/3 p-6" style={{ backgroundColor: '#323b4c' }}>
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">CONTACT</h3>
                                    <div className="space-y-2 text-sm">
                                        <EditableField
                                            value={resumeData.personalInfo.email}
                                            onChange={(value) => updatePersonalInfo('email', value)}
                                            className="block w-full text-gray-700"
                                            isPreviewMode={isPreviewMode}
                                        />
                                        <EditableField
                                            value={resumeData.personalInfo.phone}
                                            onChange={(value) => updatePersonalInfo('phone', value)}
                                            className="block w-full text-gray-700"
                                            isPreviewMode={isPreviewMode}
                                        />
                                        <EditableField
                                            value={resumeData.personalInfo.location}
                                            onChange={(value) => updatePersonalInfo('location', value)}
                                            className="block w-full text-gray-700"
                                            isPreviewMode={isPreviewMode}
                                        />
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">SKILLS</h3>
                                    <div className="space-y-2">
                                        {resumeData.skills.map((skill, index) => (
                                            <EditableField
                                                key={index}
                                                value={skill}
                                                onChange={(value) => updateSkills(index, value)}
                                                className="block w-full text-sm text-gray-700"
                                                isPreviewMode={isPreviewMode}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">EDUCATION</h3>
                                    {resumeData.education.map((edu) => (
                                        <div key={edu.id} className="mb-4">
                                            <EditableField
                                                value={edu.degree}
                                                onChange={(value) => updateEducation(edu.id, 'degree', value)}
                                                className="font-semibold text-gray-800 text-sm block mb-1"
                                                isPreviewMode={isPreviewMode}
                                            />
                                            <EditableField
                                                value={edu.institution}
                                                onChange={(value) => updateEducation(edu.id, 'institution', value)}
                                                className="text-blue-600 text-sm block mb-1"
                                                isPreviewMode={isPreviewMode}
                                            />
                                            <EditableField
                                                value={edu.year}
                                                onChange={(value) => updateEducation(edu.id, 'year', value)}
                                                className="text-gray-600 text-xs"
                                                isPreviewMode={isPreviewMode}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-2/3 p-6">
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">PROFESSIONAL SUMMARY</h3>
                                    <EditableField
                                        value={resumeData.personalInfo.summary}
                                        onChange={(value) => updatePersonalInfo('summary', value)}
                                        className="text-gray-700 leading-relaxed w-full"
                                        multiline
                                        isPreviewMode={isPreviewMode}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 border-b-2 border-blue-600 pb-1">EXPERIENCE</h3>
                                    {resumeData.experience.map((exp) => (
                                        <div key={exp.id} className="mb-6">
                                            <div className="flex justify-between items-start mb-2">
                                                <EditableField
                                                    value={exp.position}
                                                    onChange={(value) => updateExperience(exp.id, 'position', value)}
                                                    className="text-lg font-semibold text-gray-800"
                                                    isPreviewMode={isPreviewMode}
                                                />
                                                <EditableField
                                                    value={exp.duration}
                                                    onChange={(value) => updateExperience(exp.id, 'duration', value)}
                                                    className="text-sm text-gray-600 font-medium"
                                                    isPreviewMode={isPreviewMode}
                                                />
                                            </div>
                                            <EditableField
                                                value={exp.company}
                                                onChange={(value) => updateExperience(exp.id, 'company', value)}
                                                className="text-blue-600 font-medium mb-2 block"
                                                isPreviewMode={isPreviewMode}
                                            />
                                            <EditableField
                                                value={exp.description}
                                                onChange={(value) => updateExperience(exp.id, 'description', value)}
                                                className="text-gray-700 text-sm leading-relaxed w-full"
                                                multiline
                                                isPreviewMode={isPreviewMode}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlueTemplateEditor;