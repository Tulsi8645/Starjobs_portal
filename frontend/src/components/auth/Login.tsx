import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import googleIcon from '../../assets/authImages/google.png';
import Logo from '../../assets/quickjobs.png';
import { loginUser } from './authApi/authApi';
import loginimg from '../../assets/authImages/loginimg.webp'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginUser(formData);

      localStorage.setItem('token', response.token);
      window.dispatchEvent(new Event('authChange'));

      const role = response.role;
      if (role === 'jobseeker') {
        navigate('/');
      } else if (role === 'employer') {
        navigate('/employer/profile');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        setError('Unknown role');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint with the current origin as the redirect_uri
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
    window.location.href = `${API_BASE_URL}/api/auth/google?redirect_uri=${redirectUri}`;
  };

  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const role = urlParams.get('role');

    if (token && role) {
      // Store the token
      localStorage.setItem('token', token);

      // Redirect based on role
      if (role === 'jobseeker') {
        navigate('/');
      } else if (role === 'employer') {
        navigate('/employer/profile');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center ">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-card flex">
        <div className="w-1/2 hidden md:block">
          <img
            src={loginimg}
            alt="Team working together"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full md:w-1/2 p-2 md:px-8">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="text-primary font-bold text-2xl flex items-center">
                <img src={Logo} alt="Logo" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-600">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border rounded-lg rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="pointer-events-auto text-gray-500"
                      aria-label="Toggle password visibility"
                    >
                      <Eye size={20} />
                    </button>
                  </div>
                </div>


              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button onClick={() => navigate('/forgot-password')} className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                Sign In
              </button>

              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}

              <p className='text-center text-gray-500 text-sm my-4'>
                <span className="relative inline-block">
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-300"></span>
                  <span className="relative bg-white px-4">or</span>
                </span>
              </p>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
              >
                <img src={googleIcon} alt="Google Logo" className="h-6 w-6 mr-2" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
