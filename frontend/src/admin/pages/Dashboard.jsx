import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderKanban, Award, Sparkles, MessageSquare, ArrowUpRight, Inbox } from 'lucide-react';
import { projectsService, certificatesService, skillsService, contactService } from '../../services';
import { SkeletonCards, SkeletonRows } from '../components/Skeleton';

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const Dashboard = () => {
    const [counts, setCounts] = useState({ projects: 0, certificates: 0, skills: 0, messages: 0, unread: 0 });
    const [recentMessages, setRecentMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [projects, certificates, skills, messages] = await Promise.all([
                    projectsService.getAll(),
                    certificatesService.getAll(),
                    skillsService.getAll(),
                    contactService.getAll(),
                ]);
                setCounts({
                    projects: projects.count,
                    certificates: certificates.count,
                    skills: skills.count,
                    messages: messages.count,
                    unread: messages.data.filter((m) => !m.read).length,
                });
                setRecentMessages(
                    [...messages.data]
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 4)
                );
            } catch {
                // Cards fall back to 0 / empty — dashboard still renders, just quiet.
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const cards = [
        { label: 'Projects', value: counts.projects, icon: FolderKanban, to: '/admin/projects' },
        { label: 'Certificates', value: counts.certificates, icon: Award, to: '/admin/certificates' },
        { label: 'Skills', value: counts.skills, icon: Sparkles, to: '/admin/skills' },
        { label: 'Messages', value: counts.messages, sub: `${counts.unread} unread`, icon: MessageSquare, to: '/admin/messages' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

            {loading ? (
                <SkeletonCards count={4} />
            ) : (
                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
                >
                    {cards.map(({ label, value, sub, icon: Icon, to }) => (
                        <motion.div key={label} variants={cardVariants}>
                            <Link
                                to={to}
                                className="group block rounded-xl border border-blue-500/15 bg-white/[0.02] p-5 transition-all duration-300 hover:border-blue-500/40 hover:bg-white/[0.04] hover:-translate-y-0.5"
                            >
                                <div className="flex items-start justify-between">
                                    <Icon size={20} className="text-sky-400 mb-3" />
                                    <ArrowUpRight size={14} className="text-sky-100/0 transition-colors group-hover:text-sky-100/40" />
                                </div>
                                <p className="text-2xl font-bold text-white">{value}</p>
                                <p className="text-sky-100/50 text-xs mt-1">{label}</p>
                                {sub && <p className="text-sky-300 text-[11px] mt-1">{sub}</p>}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            <div className="mt-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-white">Recent Messages</h2>
                    <Link to="/admin/messages" className="text-xs text-sky-300 hover:text-white transition-colors">
                        View all
                    </Link>
                </div>

                {loading ? (
                    <SkeletonRows count={3} height="h-16" />
                ) : recentMessages.length === 0 ? (
                    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-blue-500/15 py-10 text-center">
                        <Inbox size={22} className="text-sky-100/25" />
                        <p className="text-sky-100/50 text-sm">No messages yet.</p>
                    </div>
                ) : (
                    <motion.div
                        className="space-y-2"
                        initial="hidden"
                        animate="visible"
                        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                    >
                        {recentMessages.map((m) => (
                            <motion.div
                                key={m._id}
                                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                                className={`flex items-center justify-between gap-4 rounded-lg border px-4 py-3 ${m.read ? 'border-blue-500/10 bg-white/[0.01]' : 'border-blue-500/25 bg-blue-500/[0.04]'}`}
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{m.name}</p>
                                    <p className="text-xs text-sky-100/50 truncate">{m.subject || m.message}</p>
                                </div>
                                <span className="shrink-0 text-[11px] text-sky-100/30">
                                    {new Date(m.date).toLocaleDateString()}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            <p className="text-sky-100/40 text-sm mt-8">
                Use the sidebar to manage each section of the portfolio. Changes here reflect on the live site
                once the frontend is connected to this backend (set VITE_API_URL and switch pages to use the API services).
            </p>
        </div>
    );
};

export default Dashboard;
