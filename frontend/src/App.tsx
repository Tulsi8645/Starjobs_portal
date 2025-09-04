import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import VerifyOtp from './components/auth/verifyOtp';
import ForgotResetPassword from './components/auth/forget-password';
import JobseekerSignup from './components/auth/jobseekerSignup';
import EmployerSignup from './components/auth/employerSignup';
import Profile from './components/employer/dashboard/Profile';
import Dashboard from './components/employer/dashboard/Dashboard';
import Insight from './components/employer/dashboard/Insight';
import JobList from './components/employer/dashboard/JobList';
import Applicants from './components/employer/dashboard/Applicants';
import JobApplicants from './components/employer/dashboard/JobApplicants';
import PostJob from './components/employer/jobs/postjobs';
import { HomePageJobSeeker } from './components/jobseeker/home/Home';
import AllJobListing from './components/jobseeker/jobListing/jobListing';
import JobDetailPage from './components/jobseeker/jobListing/jobdetail';
import UserDashboardLayout from './components/jobseeker/user/DashboardLayout';
import UserProfile from './components/jobseeker/user/profile';
import UserDashboard from './components/jobseeker/user/dashboard';
import UserSavedJobs from './components/jobseeker/user/savedJobs';
import UserSettings from './components/jobseeker/user/settings';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import EmployerManagement from './components/admin/EmployerManagement';
import EmployerApplicants from './components/admin/EmployerApplicants';
import AdminSettings from './components/admin/Settings';
import DashboardLayout from './components/employer/dashboard/DashboardLayout';
import ApplyPage from './components/jobseeker/apply';
import UsersProfile from './components/admin/UsersProfile';
import JobManagement from './components/admin/JobManagement';
import EmployerSettings from './components/employer/dashboard/Settings';
import RevenueManagement from './components/admin/RevenueManagement';
import JobCategoryManagement from './components/admin/JobCategoryManagement';
import Resume from './components/resumeBuilder/Resume';
import WhiteTemplateEditor from './components/resumeBuilder/WhiteTemplateEditor';
import GreenTemplateEditor from './components/resumeBuilder/GreenTemplateEditor';
import BlueTemplateEditor from './components/resumeBuilder/BlueTemplateEditor';
import About from './components/jobseeker/user/about';
import { BlogList, BlogDetail, BlogCreate, BlogEdit } from './components/blog';
import OAuthCallback from './components/auth/OAuthCallback';

function AppWrapper() {
  const location = useLocation();

  // Routes where Header and Footer should not be shown
  const hideHeaderFooter = [
    '/user',
    '/user/profile',
    '/user/dashboard',
    '/user/savedjobs',
    '/user/settings',
    '/employer',
    '/employer/profile',
    '/employer/dashboard',
    '/employer/insight',
    '/employer/joblist',
    '/employer/applicants',
    '/admin',
    '/admin/dashboard',
    '/admin/users',
    '/admin/employer/applicants',
    '/admin/settings',
  ];

  const shouldHideHeaderFooter = hideHeaderFooter.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {!shouldHideHeaderFooter && <Header />}

      <div className="flex-1">
        <Routes>
          {/* auth routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotResetPassword />} />
          <Route path="/signup/jobseeker" element={<JobseekerSignup />} />
          <Route path="/signup/employer" element={<EmployerSignup />} />

          {/* home routes */}
          <Route path="/" element={<HomePageJobSeeker />} />
          <Route path="/about" element={<About />} />

          {/* resume builder */}
          <Route path="/resume" element={<Resume />} />
          <Route path="/resume/white-sales" element={<WhiteTemplateEditor />} />
          <Route path="/resume/green-simple" element={<GreenTemplateEditor />} />
          <Route path="/resume/blue-professional" element={<BlueTemplateEditor />} />

          {/* blog routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/create" element={<BlogCreate />} />
          <Route path="/blog/edit/:id" element={<BlogEdit />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          
          {/* OAuth Callback */}
          <Route path="/auth/callback" element={<OAuthCallback />} />

          {/* jobseeker routes */}
          <Route path="/jobs" element={<AllJobListing />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />

          {/* jobseeker dashboard */}
          <Route path="/user" element={<UserDashboardLayout />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="savedjobs" element={<UserSavedJobs />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* employer dashboard */}
          <Route path="/employer" element={<DashboardLayout />}>
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="insight" element={<Insight />} />
            <Route path="joblist" element={<JobList />} />
            <Route path="applicants" element={<Applicants />} />
            <Route path="settings" element={<EmployerSettings />} />
            <Route path="jobs/:jobId/applicants" element={<JobApplicants />} />
            <Route path="postjob/:jobId?" element={<PostJob />} />
          </Route>

          {/* admin dashboard */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="userprofile/:id" element={<UsersProfile />} />
            <Route path="employers" element={<EmployerManagement />} />
            <Route path="jobs" element={<JobManagement />} />
            <Route path="revenue" element={<RevenueManagement />} />
            <Route path="jobcategories" element={<JobCategoryManagement />} />
            <Route path="employer/:employerId/applicants" element={<EmployerApplicants />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </div>

      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
