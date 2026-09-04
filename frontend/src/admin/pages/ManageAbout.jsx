import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Save, Upload, FileText, User } from 'lucide-react';
import { aboutService } from '../../services';
import { useToast } from '../components/useToast';
import { SkeletonRows } from '../components/Skeleton';
import { resolveBackendAsset } from '../../utils/backendAsset';

const MAX_PHOTO_MB = 5;
const MAX_RESUME_MB = 10;
const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ManageAbout = () => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const showToast = useToast();
    const photoInputRef = useRef(null);
    const resumeInputRef = useRef(null);

    const load = () =>
        aboutService.get()
            .then((res) => setForm(res.data))
            .catch(() => showToast('Failed to load About data.', 'error'))
            .finally(() => setLoading(false));

    useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Revoke the local object URL when it's replaced/unmounted so it doesn't leak.
    useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

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

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!PHOTO_TYPES.includes(file.type)) {
            showToast('Photo must be JPG, PNG, or WebP.', 'error');
            e.target.value = '';
            return;
        }
        if (file.size > MAX_PHOTO_MB * 1024 * 1024) {
            showToast(`Photo must be under ${MAX_PHOTO_MB}MB.`, 'error');
            e.target.value = '';
            return;
        }
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            showToast('Resume must be a PDF.', 'error');
            e.target.value = '';
            return;
        }
        if (file.size > MAX_RESUME_MB * 1024 * 1024) {
            showToast(`Resume must be under ${MAX_RESUME_MB}MB.`, 'error');
            e.target.value = '';
            return;
        }
        setResumeFile(file);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            // Text fields — the backend only picks name/designation/biography/
            // socialLinks off this body and leaves everything else (including
            // profileImage/resumeFile) untouched, so this is safe on its own.
            await aboutService.update(form);

            // Photo, if a new one was chosen — sent as its own multipart
            // request so we don't have to encode nested socialLinks fields
            // as FormData; the backend preserves existing text fields when
            // they're absent from the body.
            if (photoFile) {
                const photoData = new FormData();
                photoData.append('profileImage', photoFile);
                await aboutService.update(photoData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }

            // Resume, if a new one was chosen — dedicated endpoint.
            if (resumeFile) {
                const resumeData = new FormData();
                resumeData.append('resume', resumeFile);
                await aboutService.updateResume(resumeData);
            }

            setPhotoFile(null);
            setResumeFile(null);
            if (photoInputRef.current) photoInputRef.current.value = '';
            if (resumeInputRef.current) resumeInputRef.current.value = '';
            await load();
            showToast('About section saved.');
        } catch (err) {
            const msg = err.response?.data?.message || 'Save failed.';
            showToast(msg, 'error');
        } finally {
            setSaving(false);
        }
    };

    const inputClass = 'w-full rounded-lg bg-white/5 border border-blue-500/15 px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500/50';
    const currentPhotoUrl = form?.profileImage ? resolveBackendAsset(form.profileImage) : null;
    const currentResumeUrl = form?.resumeFile ? resolveBackendAsset(form.resumeFile) : null;

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
                    <label className="text-xs text-sky-100/60 block mb-2">Profile Photo</label>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-blue-500/20 bg-white/5 flex items-center justify-center">
                            {photoPreview || currentPhotoUrl ? (
                                <img src={photoPreview || currentPhotoUrl} alt="" className="h-full w-full object-cover" />
                            ) : (
                                <User size={24} className="text-sky-100/30" />
                            )}
                        </div>
                        <div>
                            <input
                                ref={photoInputRef}
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handlePhotoChange}
                                className="hidden"
                                id="photo-upload"
                            />
                            <label
                                htmlFor="photo-upload"
                                className="inline-flex items-center gap-1.5 cursor-pointer rounded-lg border border-blue-500/20 px-3 py-1.5 text-xs text-sky-200 hover:bg-blue-500/10 transition-colors"
                            >
                                <Upload size={12} /> {currentPhotoUrl ? 'Replace photo' : 'Upload photo'}
                            </label>
                            <p className="text-[11px] text-sky-100/40 mt-1">JPG, PNG, or WebP — up to {MAX_PHOTO_MB}MB.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="text-xs text-sky-100/60 block mb-2">Resume (PDF)</label>
                    <div className="flex items-center gap-3">
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept="application/pdf"
                            onChange={handleResumeChange}
                            className="hidden"
                            id="resume-upload"
                        />
                        <label
                            htmlFor="resume-upload"
                            className="inline-flex items-center gap-1.5 cursor-pointer rounded-lg border border-blue-500/20 px-3 py-1.5 text-xs text-sky-200 hover:bg-blue-500/10 transition-colors"
                        >
                            <Upload size={12} /> {currentResumeUrl ? 'Replace resume' : 'Upload resume'}
                        </label>
                        {resumeFile ? (
                            <span className="text-xs text-sky-100/60 flex items-center gap-1"><FileText size={12} /> {resumeFile.name}</span>
                        ) : currentResumeUrl ? (
                            <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-300 hover:underline flex items-center gap-1">
                                <FileText size={12} /> View current resume
                            </a>
                        ) : (
                            <span className="text-xs text-sky-100/40">No resume uploaded yet.</span>
                        )}
                    </div>
                    <p className="text-[11px] text-sky-100/40 mt-1">PDF only — up to {MAX_RESUME_MB}MB.</p>
                </div>

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
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Career Objective (About page tab)</label>
                    <textarea rows={3} className={inputClass} value={form.careerObjective || ''} onChange={(e) => update('careerObjective', e.target.value)} placeholder="Leave blank to use the default copy already on the site." />
                </div>
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Current Focus (About page tab)</label>
                    <textarea rows={3} className={inputClass} value={form.currentFocus || ''} onChange={(e) => update('currentFocus', e.target.value)} placeholder="Leave blank to use the default copy already on the site." />
                </div>
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Future Goals (About page tab)</label>
                    <textarea rows={3} className={inputClass} value={form.futureGoals || ''} onChange={(e) => update('futureGoals', e.target.value)} placeholder="Leave blank to use the default copy already on the site." />
                </div>
                <div>
                    <label className="text-xs text-sky-100/60 block mb-1">Interests (About page tab)</label>
                    <textarea rows={3} className={inputClass} value={form.interests || ''} onChange={(e) => update('interests', e.target.value)} placeholder="Leave blank to use the default copy already on the site." />
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
