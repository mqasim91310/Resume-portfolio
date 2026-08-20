import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
    LayoutDashboard, User, Sparkles, GraduationCap, Briefcase, FolderKanban,
    Award, Wrench, BarChart3, MessageSquare, LogOut, ExternalLink, Menu, X,
} from 'lucide-react';
import { useAdminAuth } from './useAdminAuth';
import { ToastProvider } from './components/Toast';

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/about', label: 'About', icon: User },
    { to: '/admin/skills', label: 'Skills', icon: Sparkles },
    { to: '/admin/education', label: 'Education', icon: GraduationCap },
    { to: '/admin/experience', label: 'Experience', icon: Briefcase },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
    { to: '/admin/certificates', label: 'Certificates', icon: Award },
    { to: '/admin/services', label: 'Services', icon: Wrench },
    { to: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
    { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
];

const SidebarNav = ({ onNavigate }) => {
    const location = useLocation();
    return (
        <nav className="flex-1 space-y-1">
            {navItems.map(({ to, label, icon: Icon, end }) => {
                const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
                return (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={onNavigate}
                        className="relative flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
                    >
                        {isActive && (
                            <motion.div
                                layoutId="admin-nav-active"
                                className="absolute inset-0 rounded-lg bg-blue-500/15 border border-blue-500/30"
                                transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                            />
                        )}
                        <span className={`relative z-10 flex items-center gap-2.5 ${isActive ? 'text-white' : 'text-sky-100/60'}`}>
                            <Icon size={16} /> {label}
                        </span>
                    </NavLink>
                );
            })}
        </nav>
    );
};

const AdminLayout = () => {
    const { admin, logout } = useAdminAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const currentLabel = navItems.find((n) =>
        n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)
    )?.label || 'Admin';

    const SidebarContent = ({ onNavigate }) => (
        <>
            <div className="mb-6 px-2">
                <p className="text-white font-bold text-lg">Portfolio Admin</p>
                <p className="text-sky-100/40 text-xs truncate">{admin?.email}</p>
            </div>
            <SidebarNav onNavigate={onNavigate} />
            <div className="space-y-1 pt-4 border-t border-blue-500/10">
                <a
                    href="/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-sky-100/60 hover:text-white hover:bg-white/5"
                >
                    <ExternalLink size={16} /> View Site
                </a>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-sky-300 hover:text-sky-200 hover:bg-blue-500/10"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </>
    );

    return (
        <ToastProvider>
            <div className="min-h-screen bg-[#0A0F1F] flex">
                {/* Desktop sidebar */}
                <aside className="hidden lg:flex w-60 shrink-0 border-r border-blue-500/10 bg-white/[0.02] p-4 flex-col">
                    <SidebarContent />
                </aside>

                {/* Mobile off-canvas sidebar */}
                <AnimatePresence>
                    {mobileOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileOpen(false)}
                            />
                            <motion.aside
                                className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col border-r border-blue-500/10 bg-[#0A0F1F] p-4 lg:hidden"
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '-100%' }}
                                transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                            >
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="absolute top-4 right-4 text-sky-100/60 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                                <SidebarContent onNavigate={() => setMobileOpen(false)} />
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex-1 flex flex-col min-w-0">
                    {/* Top header */}
                    <header className="flex items-center gap-3 border-b border-blue-500/10 bg-white/[0.02] px-4 py-3 sm:px-6">
                        <button
                            onClick={() => setMobileOpen(true)}
                            className="text-sky-100/70 hover:text-white lg:hidden"
                            aria-label="Open menu"
                        >
                            <Menu size={20} />
                        </button>
                        <h2 className="text-sm font-semibold text-white sm:text-base">{currentLabel}</h2>
                    </header>

                    <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
};

export default AdminLayout;
