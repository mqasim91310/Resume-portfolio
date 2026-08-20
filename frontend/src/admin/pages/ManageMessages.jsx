import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MailOpen, Trash2, Inbox } from 'lucide-react';
import { contactService } from '../../services';
import { useToast } from '../components/useToast';
import ConfirmDialog from '../components/ConfirmDialog';
import { SkeletonRows } from '../components/Skeleton';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmState, setConfirmState] = useState(null);
    const showToast = useToast();

    const load = async () => {
        setLoading(true);
        try {
            const res = await contactService.getAll();
            setMessages(res.data);
        } catch {
            showToast('Failed to load messages.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleRead = async (id) => {
        try {
            await contactService.markAsRead(id);
            await load();
        } catch {
            showToast('Could not mark as read.', 'error');
        }
    };

    const requestDelete = (m) => {
        setConfirmState({
            message: `Delete the message from "${m.name}"? This can't be undone.`,
            onConfirm: async () => {
                try {
                    await contactService.remove(m._id);
                    await load();
                    showToast('Message deleted.');
                } catch {
                    showToast('Delete failed.', 'error');
                }
            },
        });
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Contact Messages</h1>
            {loading ? (
                <SkeletonRows count={3} height="h-24" />
            ) : messages.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-blue-500/15 py-14 text-center">
                    <Inbox size={28} className="text-sky-100/25" />
                    <p className="text-sky-100/50 text-sm">No messages yet.</p>
                </div>
            ) : (
                <motion.div
                    className="space-y-3"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                >
                    <AnimatePresence>
                        {messages.map((m) => (
                            <motion.div
                                key={m._id}
                                layout
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                                exit={{ opacity: 0, x: -12 }}
                                className={`rounded-xl border p-4 transition-colors ${m.read ? 'border-blue-500/10 bg-white/[0.01]' : 'border-blue-500/30 bg-blue-500/[0.04]'}`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="text-white font-semibold text-sm">{m.name} <span className="text-sky-100/40 font-normal">&lt;{m.email}&gt;</span></p>
                                        {m.subject && <p className="text-sky-200/80 text-xs mt-0.5">{m.subject}</p>}
                                        <p className="text-sky-100/60 text-sm mt-2 whitespace-pre-wrap">{m.message}</p>
                                        <p className="text-sky-100/30 text-[11px] mt-2">{new Date(m.date).toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-1 shrink-0">
                                        {!m.read && (
                                            <button onClick={() => handleRead(m._id)} title="Mark as read" className="p-2 text-sky-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">
                                                <MailOpen size={15} />
                                            </button>
                                        )}
                                        {m.read && <Mail size={15} className="text-sky-100/20 p-2 box-content" />}
                                        <button onClick={() => requestDelete(m)} title="Delete" className="p-2 text-sky-100/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}
            <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
        </div>
    );
};

export default ManageMessages;
