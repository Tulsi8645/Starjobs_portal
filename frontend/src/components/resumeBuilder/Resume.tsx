
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Edit3, Sparkles } from 'lucide-react';
import greenSimple  from '../../assets/Science and Engineering Resume in Green Black Simple Style.png';
import whiteSales from '../../assets/White simple Sales Representative Cv Resume.png';
import blueProfessional from '../../assets/Blue Simple Professional CV Resume.png';
const Resume = () => {
    const navigate = useNavigate();

    const templates = [
        {
            id: 'green-simple',
            name: 'Science & Engineering',
            image: greenSimple,
            description: 'Perfect for technical professionals',
            color: 'from-green-500 to-emerald-600'
        },
        {
            id: 'white-sales',
            name: 'Sales Representative',
            image: whiteSales,
            description: 'Ideal for sales and business roles',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            id: 'blue-professional',
            name: 'Professional CV',
            image: blueProfessional,
            description: 'Clean design for any profession',
            color: 'from-purple-500 to-pink-600'
        }
    ];


    const features = [
        {
            icon: <Edit3 className="w-6 h-6" />,
            title: 'Easy Editing',
            description: 'Click and edit any section directly'
        },
        {
            icon: <Download className="w-6 h-6" />,
            title: 'PDF Download',
            description: 'Export your resume as a professional PDF'
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: 'Beautiful Templates',
            description: 'Choose from professionally designed layouts'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-indigo-900 via-amber-900 to-gray-800 text-white">
                <div className="container mx-auto px-6 py-20">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                                <FileText className="w-12 h-12 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                            Build Your Resume Now
                        </h1>
                        <p className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed">
                            Create a professional resume in minutes with our beautiful templates.
                            Edit directly, customize everything, and download as PDF.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                                    <div className="text-purple-200 mr-3">{feature.icon}</div>
                                    <span className="text-sm font-medium">{feature.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Choose Your Template
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Select from our collection of professionally designed resume templates.
                        Each template is fully customizable and optimized for modern hiring practices.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                            onClick={() => navigate(`/resume/${template.id}`)}
                        >
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="relative overflow-hidden">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                        <button className="w-full bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center">
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Start Editing
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className={`inline-block bg-gradient-to-r ${template.color} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                                        TEMPLATE
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {template.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Choose any template above and start building your professional resume today.
                            It's completely free and takes just a few minutes.
                        </p>
                        <div className="flex items-center justify-center text-sm text-gray-500">
                            <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                            No registration required • Instant PDF download • Professional quality
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;