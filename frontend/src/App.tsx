import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageEmployer from './components/employer/HomePage';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import VerifyOtp from './components/auth/verifyOtp';
import JobseekerSignup from './components/auth/jobseekerSignup';
import EmployerSignup from './components/auth/employerSignup';
import CandidateList from './components/employer/dashboard/CandidateList';
import JobListings from './components/employer/dashboard/JobListings';
import Notifications from './components/employer/dashboard/Notifications';
import Profile from './components/employer/dashboard/Profile';
import Dashboard from './components/employer/dashboard/Dashboard';
import Insight from './components/employer/dashboard/Insight';
import JobList from './components/employer/dashboard/JobList';
import PostJob from './components/employer/jobs/postjobs';
import ApplicantProfile from './components/employer/candidate/Applicant';




// jobseeker imports

import { HomePageJobSeeker } from './components/jobseeker/home/Home';
import AllJobListing from './components/jobseeker/jobListing/jobListing';
import JobDetailPage from './components/jobseeker/jobListing/jobdetail';

import UserDashboardLayout from './components/jobseeker/user/DashboardLayout';
import UserProfile from './components/jobseeker/user/profile';
import UserDashboard from './components/jobseeker/user/dashboard';
import UserSavedJobs from './components/jobseeker/user/savedJobs';
import UserSettings from './components/jobseeker/user/settings';




// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import ReportsManagement from './components/admin/ReportsManagement';
import Settings from './components/admin/Settings';
import DashboardLayout from './components/employer/dashboard/DashboardLayout';
import ApplyPage from './components/jobseeker/apply';




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-secondary flex flex-col">
        <Routes>
          {/* home routes */}
          <Route path="/" element={<HomePageJobSeeker />} />

          {/* auth routes */}

          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/verify-otp" element={<VerifyOtp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup/jobseeker" element={<JobseekerSignup />} />
          <Route path="/signup/employer" element={<EmployerSignup />} />



          {/* jobseeker routes start */}
          <Route path="/jobs" element={<AllJobListing />} />
          <Route path="/job/:id" element={< JobDetailPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/jobs/:jobId/apply" element={<ApplyPage />} />

          {/* Dashboard routes wrapped with DashboardLayout */}
          <Route path="/user" element={<UserDashboardLayout />} >
            <Route path="profile" element={<UserProfile />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="savedjobs" element={<UserSavedJobs />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>
          {/* jobseeker routes end */}




          {/* employer routes start*/}
          <Route path="/employer" element={<HomePageEmployer />} />
          <Route path="/candidate" element={<CandidateList />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/job/candidate" element={<ApplicantProfile />} />
          <Route path="/notifications" element={<Notifications />} />



          {/* Dashboard routes wrapped with DashboardLayout */}
          <Route path="/employer" element={<DashboardLayout />} >
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="insight" element={<Insight />} />
            <Route path="joblist" element={<JobList />} />
            <Route path="postjob" element={<PostJob />} />
          </Route>
          {/* employer routes end */}






          {/* admin routes start*/}
          {/* Admin routes wrapped with AdminLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* admin routes end*/}




        </Routes>
      </div>
    </Router>
  );
}

export default App;