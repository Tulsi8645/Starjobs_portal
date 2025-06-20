import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import googleIcon from '../../assets/authImages/google.png';
import Logo from '../../assets/star 1.svg';
import { loginUser } from './authApi/authApi'; 

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

      // Save token to localStorage
      localStorage.setItem('token', response.token);
      window.dispatchEvent(new Event('authChange'));

      // Redirect based on role
      const role = response.role;
      if (role === 'jobseeker') {
        navigate('/');
      } else if (role === 'employer') {
        navigate('/employer');
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
    console.log('Sign in with Google clicked');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center ">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-card flex">
        <div className="w-1/2  hidden md:block">
          <img
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
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
                <a href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                  Forgot password?
                </a>
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
