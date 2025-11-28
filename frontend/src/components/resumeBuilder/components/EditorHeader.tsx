import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye } from 'lucide-react';

interface EditorHeaderProps {
    templateName: string;
    isPreviewMode: boolean;
    onTogglePreview: () => void;
    onDownloadPDF: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
    templateName,
    isPreviewMode,
    onTogglePreview,
    onDownloadPDF
}) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/resume')}
                            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Back to Templates
                        </button>
                        <div className="h-6 w-px bg-gray-300" />
                        <h1 className="text-xl font-semibold text-gray-800">{templateName} Editor</h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={onTogglePreview}
                            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${isPreviewMode
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            {isPreviewMode ? 'Edit Mode' : 'Preview'}
                        </button>
                        <button
                            onClick={onDownloadPDF}
                            className="flex items-center bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditorHeader;