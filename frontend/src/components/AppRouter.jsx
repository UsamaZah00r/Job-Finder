import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import CreateJob from "../pages/CreateJob";
import ShowJobs from "../pages/ShowJobs";
import JobDetails from "../pages/JobDetail";
import EmployerJobs from "../pages/EmployerJobs";
import EditJob from "../pages/JobEdit";
import ApplyJob from "../pages/ApplyJob";
import Applicants from "../pages/Applicants";

function AppRouter() {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth pages (public) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes for Seeker */}
        <Route element={<ProtectedRoute allowedRoles={["seeker"]} />}>
          <Route path="/jobs" element={<ShowJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/profile/seeker" element={<Profile/>} />
          <Route path="/jobs/apply/:id" element={<ApplyJob />} />
        </Route>

        {/* Protected Routes for Employer */}
        <Route element={<ProtectedRoute allowedRoles={["employer"]} />}>
          <Route path="/profile/employer" element={<Profile/>} />
          <Route path="/createjob" element={<CreateJob/>} />
           <Route path="/my-jobs" element={<EmployerJobs/>} />
           <Route path="/jobs/edit/:id" element={<EditJob/>}/>
           <Route path="/jobs/applicants/:id" element={<Applicants/>} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
