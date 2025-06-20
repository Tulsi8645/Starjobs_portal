import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Upload } from 'lucide-react';
import googleIcon from '../../assets/authImages/google.png';
import Logo from '../../assets/star 1.svg';
import SignUpImage from '../../assets/authImages/Signup.png';

const jobseekerSignup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    education: '',
    skills: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Job Seeker Signup Submitted:', formData, profileFile?.name);
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign-In Clicked');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-card flex overflow-hidden">
        {/* Left Panel - Image */}
        <div className="w-1/2 hidden md:flex items-center justify-center bg-primary p-10 rounded-l-lg">
          <img src={SignUpImage} alt="Sign Up" className="max-h-[500px] object-contain" />
        </div>

        {/* Right Panel - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-2 flex flex-col overflow-auto" style={{ maxHeight: 'calc(100vh - 50px)' }}>
          <div className="mb-6 text-center">
            <div className="flex justify-center mb-3">
              <div className="text-primary font-bold text-2xl flex items-center">
                <img src={Logo} alt="Logo" className="h-30 w-20 mr-2" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Find Your Next Opportunity</h2>
            <p className="text-gray-600">Create an account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pl-2 flex-grow overflow-y-auto">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Upload Your Profile/CV</label>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <label className="cursor-pointer text-primary hover:text-primary/80 font-medium">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      name="profileCv"
                      accept=".pdf,.doc,.docx,.txt"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 5MB</p>
                  {profileFile && <p className="mt-2 text-sm text-gray-700">Selected: {profileFile.name}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Education (Briefly)</label>
              <textarea
                name="education"
                rows={3}
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g., BSc Computer Science - XYZ University"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Skills (Comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, Project Management"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="Enter password"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
            >
              Create Profile
            </button>

            <div className="text-center text-sm text-gray-500 my-4">
              <span className="relative inline-block px-4 before:content-[''] before:absolute before:top-1/2 before:left-full before:w-20 before:h-px before:bg-gray-300 before:-translate-y-1/2 after:content-[''] after:absolute after:top-1/2 after:right-full after:w-20 after:h-px after:bg-gray-300 after:-translate-y-1/2">
                <span className="relative bg-white px-1">or</span>
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center"
            >
              <img src={googleIcon} alt="Google Logo" className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 flex-shrink-0">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default jobseekerSignup;
