import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const AdminLogin = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./AdminLayout'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ManageAbout = lazy(() => import('./pages/ManageAbout'));
const ManageSkills = lazy(() => import('./pages/ManageSkills'));
const ManageEducation = lazy(() => import('./pages/ManageEducation'));
const ManageExperience = lazy(() => import('./pages/ManageExperience'));
const ManageProjects = lazy(() => import('./pages/ManageProjects'));
const ManageCertificates = lazy(() => import('./pages/ManageCertificates'));
const ManageServices = lazy(() => import('./pages/ManageServices'));
const ManageStatistics = lazy(() => import('./pages/ManageStatistics'));
const ManageMessages = lazy(() => import('./pages/ManageMessages'));

/**
 * Everything under /admin, as one lazily-loaded subtree.
 *
 * This used to be mounted directly in App.jsx with <AdminAuthProvider>
 * wrapping the *entire* router (public routes included), which meant every
 * public visitor's browser downloaded the JWT auth-check flow and the whole
 * axios-based API service layer on page load — before they'd even looked
 * at a single project. Scoping it here means that code now only loads for
 * someone actually navigating to /admin/*.
 */
const AdminApp = () => (
    <AdminAuthProvider>
        <Routes>
            <Route path="login" element={<AdminLogin />} />
            <Route
                path=""
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
            <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
    </AdminAuthProvider>
);

export default AdminApp;
