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

// The entire /admin subtree (auth provider + all admin pages) is one lazy
// chunk — see admin/AdminApp.jsx for why this matters for public-page
// bundle size.
const AdminApp = lazy(() => import('./admin/AdminApp'));

function App() {
  return (
    <Router>
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
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
