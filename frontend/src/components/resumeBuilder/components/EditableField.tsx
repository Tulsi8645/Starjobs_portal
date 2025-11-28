import React from 'react';

interface EditableFieldProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
    isPreviewMode: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
    value,
    onChange,
    className = "",
    multiline = false,
    placeholder = "",
    isPreviewMode
}) => {
    if (isPreviewMode) {
        return multiline ? (
            <div className={className} style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
        ) : (
            <span className={className}>{value}</span>
        );
    }

    return multiline ? (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${className} bg-transparent border-2 border-dashed border-blue-300 hover:border-blue-500 focus:border-blue-600 focus:outline-none rounded p-2 resize-none transition-colors`}
            placeholder={placeholder}
            rows={3}
        />
    ) : (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`${className} bg-transparent border-2 border-dashed border-blue-300 hover:border-blue-500 focus:border-blue-600 focus:outline-none rounded px-2 py-1 transition-colors`}
            placeholder={placeholder}
        />
    );
};

export default EditableField;