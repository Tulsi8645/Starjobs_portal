import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building } from 'lucide-react';

const Signup = () => {
  const [selectedType, setSelectedType] = useState<'jobseeker' | 'employer' | null>(null);
  const navigate = useNavigate();

  const handleSignup = () => {
    if (selectedType === 'jobseeker') {
      navigate('/signup/jobseeker');
    } else if (selectedType === 'employer') {
      navigate('/signup/employer');
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-card p-8">
        <h1 className="text-center text-xl font-semibold mb-8">
          Sign up new account as
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Job Seeker Card */}
          <div 
            className={`relative p-8 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedType === 'jobseeker' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-primary/20'
            }`}
            onClick={() => setSelectedType('jobseeker')}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedType === 'jobseeker' ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <User size={32} className={selectedType === 'jobseeker' ? 'text-white' : 'text-primary'} />
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${
                selectedType === 'jobseeker' ? 'text-white' : 'text-gray-800'
              }`}>
                As Job Seeker
              </h3>
              <p className={`text-sm ${
                selectedType === 'jobseeker' ? 'text-white/90' : 'text-gray-600'
              }`}>
                Advance your career by exploring job opportunities that match your skills and aspirations.
              </p>
            </div>
          </div>

          {/* Job Provider Card */}
          <div 
            className={`relative p-8 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedType === 'employer' 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:border-primary/20'
            }`}
            onClick={() => setSelectedType('employer')}
          >
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  selectedType === 'employer' ? 'bg-white/20' : 'bg-primary/10'
                }`}>
                  <Building size={32} className={selectedType === 'employer' ? 'text-white' : 'text-primary'} />
                </div>
              </div>
              <h3 className={`text-lg font-semibold mb-3 ${
                selectedType === 'employer' ? 'text-white' : 'text-gray-800'
              }`}>
                As Job Provider
              </h3>
              <p className={`text-sm ${
                selectedType === 'employer' ? 'text-white/90' : 'text-gray-600'
              }`}>
                Streamline the hiring process, attract skilled candidates and build your ideal team with ease.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignup}
          disabled={!selectedType}
          className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
            selectedType 
              ? 'bg-gray-400 text-white hover:bg-primary/90' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Signup
        </button>

        <div className="text-center mt-6">
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Back
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already Have an Account?{' '}
          <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;