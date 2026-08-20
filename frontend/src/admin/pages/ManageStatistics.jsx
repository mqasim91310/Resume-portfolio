import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Save } from 'lucide-react';
import { statisticsService } from '../../services';
import { useToast } from '../components/useToast';
import { SkeletonRows } from '../components/Skeleton';

const fieldsMeta = [
    { name: 'projects', label: 'Projects' },
    { name: 'certificates', label: 'Certificates' },
    { name: 'clients', label: 'Clients' },
    { name: 'experience', label: 'Years of Experience' },
    { name: 'awards', label: 'Awards' },
];

const ManageStatistics = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const showToast = useToast();

    useEffect(() => {
        statisticsService.get()
            .then((res) => setForm(res.data))
            .catch(() => showToast('Failed to load statistics.', 'error'))
            .finally(() => setLoading(false));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await statisticsService.update(form);
            showToast('Statistics saved.');
        } catch {
            showToast('Save failed.', 'error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-white mb-6">Statistics</h1>
            {loading || !form ? (
                <SkeletonRows count={5} height="h-14" />
            ) : (
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSave}
                    className="max-w-md space-y-4"
                >
                    {fieldsMeta.map((f) => (
                        <div key={f.name}>
                            <label className="text-xs text-sky-100/60 block mb-1">{f.label}</label>
                            <input
                                type="number"
                                className="w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                                value={form[f.name] ?? 0}
                                onChange={(e) => setForm({ ...form, [f.name]: Number(e.target.value) })}
                            />
                        </div>
                    ))}

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

export default ManageStatistics;
