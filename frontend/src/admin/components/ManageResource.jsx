import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Loader2, Inbox } from 'lucide-react';
import { useToast } from './useToast';
import ConfirmDialog from './ConfirmDialog';
import { SkeletonRows } from './Skeleton';

const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
};
const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
    exit: { opacity: 0, x: -12, transition: { duration: 0.15 } },
};

// A configurable list+form admin screen for any simple REST resource.
// `fields` describes the shape: [{ name, label, type: 'text'|'number'|'textarea' }]
const ManageResource = ({ service, title, fields, renderRow }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null = closed, {} = new, {...item} = edit
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [confirmState, setConfirmState] = useState(null);
    const showToast = useToast();

    const load = async () => {
        setLoading(true);
        try {
            const res = await service.getAll();
            setItems(res.data);
        } catch {
            setError('Failed to load data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        const blank = {};
        fields.forEach((f) => { blank[f.name] = f.type === 'number' ? 0 : ''; });
        setEditing(blank);
        setError('');
    };

    const openEdit = (item) => { setEditing({ ...item }); setError(''); };
    const closeForm = () => setEditing(null);

    const handleChange = (name, value) => setEditing((prev) => ({ ...prev, [name]: value }));

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const isNew = !editing._id;
        try {
            if (editing._id) {
                await service.update(editing._id, editing);
            } else {
                await service.create(editing);
            }
            setEditing(null);
            await load();
            showToast(isNew ? `${title.replace(/s$/, '')} added.` : `${title.replace(/s$/, '')} updated.`);
        } catch (err) {
            const msg = err.response?.data?.message || 'Save failed.';
            setError(msg);
            showToast(msg, 'error');
        } finally {
            setSaving(false);
        }
    };

    const requestDelete = (item) => {
        setConfirmState({
            message: `This will permanently delete "${renderRow ? renderRow(item) : item.name || item.title}". This can't be undone.`,
            onConfirm: async () => {
                try {
                    await service.remove(item._id);
                    await load();
                    showToast('Item deleted.');
                } catch {
                    showToast('Delete failed.', 'error');
                }
            },
        });
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">{title}</h1>
                <motion.button
                    onClick={openNew}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-500 transition-colors"
                >
                    <Plus size={15} /> Add New
                </motion.button>
            </div>

            <AnimatePresence>
                {editing && (
                    <motion.form
                        onSubmit={handleSave}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mb-6 overflow-hidden rounded-xl border border-blue-500/20 bg-white/[0.03] p-5 space-y-3"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-white font-semibold text-sm">{editing._id ? 'Edit' : 'New'} {title.replace(/s$/, '')}</h3>
                            <button type="button" onClick={closeForm} className="text-sky-100/50 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                                {error}
                            </p>
                        )}

                        {fields.map((f) => (
                            <div key={f.name}>
                                <label className="text-xs text-sky-100/60 block mb-1">{f.label}</label>
                                {f.type === 'textarea' ? (
                                    <textarea
                                        rows={3}
                                        value={editing[f.name] ?? ''}
                                        onChange={(e) => handleChange(f.name, e.target.value)}
                                        className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                ) : f.type === 'date' ? (
                                    <input
                                        type="date"
                                        value={editing[f.name] ? String(editing[f.name]).slice(0, 10) : ''}
                                        onChange={(e) => handleChange(f.name, e.target.value)}
                                        className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                ) : (
                                    <input
                                        type={f.type || 'text'}
                                        value={editing[f.name] ?? ''}
                                        onChange={(e) => handleChange(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                                        className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                )}
                            </div>
                        ))}
                        <div className="flex items-center gap-2 pt-1">
                            <motion.button
                                type="submit" disabled={saving}
                                whileHover={{ scale: saving ? 1 : 1.03 }}
                                whileTap={{ scale: saving ? 1 : 0.97 }}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-500 transition-colors disabled:opacity-60"
                            >
                                {saving && <Loader2 size={14} className="animate-spin" />}
                                {saving ? 'Saving...' : 'Save'}
                            </motion.button>
                            <button
                                type="button" onClick={closeForm}
                                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-sky-100/70 hover:bg-white/5 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {loading ? (
                <SkeletonRows count={4} />
            ) : items.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-blue-500/15 py-14 text-center">
                    <Inbox size={28} className="text-sky-100/25" />
                    <p className="text-sky-100/50 text-sm">No {title.toLowerCase()} yet — add your first one.</p>
                </div>
            ) : (
                <motion.div
                    className="rounded-xl border border-blue-500/10 overflow-hidden"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item._id}
                                layout
                                variants={rowVariants}
                                exit="exit"
                                className="flex items-center justify-between px-4 py-3 border-b border-blue-500/5 last:border-b-0 bg-white/[0.01] hover:bg-white/[0.03] transition-colors"
                            >
                                <div className="text-sm text-sky-100/80 min-w-0 flex-1">
                                    {renderRow ? renderRow(item) : (item.name || item.title || item.degree || item.company)}
                                </div>
                                <div className="flex items-center gap-1 shrink-0 ml-3">
                                    <button onClick={() => openEdit(item)} className="p-2 text-sky-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => requestDelete(item)} className="p-2 text-sky-100/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <Trash2 size={14} />
                                    </button>
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

export default ManageResource;
