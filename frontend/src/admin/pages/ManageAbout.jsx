import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Save } from 'lucide-react';
import { aboutService } from '../../services';
import { useToast } from '../components/useToast';
import { SkeletonRows } from '../components/Skeleton';

const ManageAbout = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const showToast = useToast();

    useEffect(() => {
        aboutService.get()
            .then((res) => setForm(res.data))
            .catch(() => showToast('Failed to load About data.', 'error'))
            .finally(() => setLoading(false));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const update = (path, value) => {
        setForm((prev) => {
            const next = { ...prev };
            if (path.includes('.')) {
                const [parent, child] = path.split('.');
                next[parent] = { ...next[parent], [child]: value };
            } else {
                next[path] = value;
            }
            return next;
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await aboutService.update(form);
            showToast('About section saved.');
        } catch {
            showToast('Save failed.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const inputClass = 'w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50';

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">About Section</h1>
            {loading || !form ? (
                <SkeletonRows count={4} height="h-14" />
            ) : (
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSave} className="max-w-2xl space-y-4">
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Name</label>
                    <input className={inputClass} value={form.name || ''} onChange={(e) => update('name', e.target.value)} />
                </div>
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Designation</label>
                    <input className={inputClass} value={form.designation || ''} onChange={(e) => update('designation', e.target.value)} />
                </div>
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Biography</label>
                    <textarea rows={5} className={inputClass} value={form.biography || ''} onChange={(e) => update('biography', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-sky-100/60 block mb-1">GitHub</label>
                        <input className={inputClass} value={form.socialLinks?.github || ''} onChange={(e) => update('socialLinks.github', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xs text-sky-100/60 block mb-1">LinkedIn</label>
                        <input className={inputClass} value={form.socialLinks?.linkedin || ''} onChange={(e) => update('socialLinks.linkedin', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xs text-sky-100/60 block mb-1">Email</label>
                        <input className={inputClass} value={form.socialLinks?.email || ''} onChange={(e) => update('socialLinks.email', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-xs text-sky-100/60 block mb-1">Twitter / X</label>
                        <input className={inputClass} value={form.socialLinks?.twitter || ''} onChange={(e) => update('socialLinks.twitter', e.target.value)} />
                    </div>
                </div>

                <motion.button
                    type="submit" disabled={saving}
                    whileHover={{ scale: saving ? 1 : 1.03 }}
                    whileTap={{ scale: saving ? 1 : 0.97 }}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 text-white text-sm font-semibold px-4 py-2 hover:bg-blue-500 transition-colors disabled:opacity-60"
                >
                    {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </motion.button>
            </motion.form>
            )}
        </div>
    );
};

export default ManageAbout;
