import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import PageLoader from './components/PageLoader';

// Public pages are lazy-loaded so a first-time visitor to "/" never
// downloads the admin panel's JS (Login, Dashboard, 9 Manage* screens).
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Journey = lazy(() => import('./pages/Journey'));
const SemesterDetail = lazy(() => import('./pages/SemesterDetail'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Services = lazy(() => import('./pages/Services'));
const Certificates = lazy(() => import('./pages/Certificates'));
const TechStack = lazy(() => import('./pages/TechStack'));
const Statistics = lazy(() => import('./pages/Statistics'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AdminLogin = lazy(() => import('./admin/pages/Login'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const ManageAbout = lazy(() => import('./admin/pages/ManageAbout'));
const ManageSkills = lazy(() => import('./admin/pages/ManageSkills'));
const ManageEducation = lazy(() => import('./admin/pages/ManageEducation'));
const ManageExperience = lazy(() => import('./admin/pages/ManageExperience'));
const ManageProjects = lazy(() => import('./admin/pages/ManageProjects'));
const ManageCertificates = lazy(() => import('./admin/pages/ManageCertificates'));
const ManageServices = lazy(() => import('./admin/pages/ManageServices'));
const ManageStatistics = lazy(() => import('./admin/pages/ManageStatistics'));
const ManageMessages = lazy(() => import('./admin/pages/ManageMessages'));

import { AdminAuthProvider } from './admin/AuthContext';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public site — unchanged pages, shared chrome via PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/journey" element={<Journey />} />
              <Route path="/semester/:id" element={<SemesterDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<Services />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/tech-stack" element={<TechStack />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin panel — separate layout, protected by JWT auth */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="about" element={<ManageAbout />} />
              <Route path="skills" element={<ManageSkills />} />
              <Route path="education" element={<ManageEducation />} />
              <Route path="experience" element={<ManageExperience />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="certificates" element={<ManageCertificates />} />
              <Route path="services" element={<ManageServices />} />
              <Route path="statistics" element={<ManageStatistics />} />
              <Route path="messages" element={<ManageMessages />} />
            </Route>
          </Routes>
        </Suspense>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;
