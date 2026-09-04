import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Loader2, Inbox, Upload, ImageIcon } from 'lucide-react';
import { useToast } from './useToast';
import ConfirmDialog from './ConfirmDialog';
import { SkeletonRows } from './Skeleton';
import { resolveBackendAsset } from '../../utils/backendAsset';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_MB = 5;

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
// `imageUpload` (optional) enables a file input: { fieldName, multiple, existingValue(item) }
const ManageResource = ({ service, title, fields, renderRow, imageUpload }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null = closed, {} = new, {...item} = edit
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [confirmState, setConfirmState] = useState(null);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [removingImageIndex, setRemovingImageIndex] = useState(null);
    const fileInputRef = useRef(null);
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
        fields.forEach((f) => { blank[f.name] = f.type === 'number' ? 0 : f.type === 'checkbox' ? false : ''; });
        setEditing(blank);
        setError('');
        setImageFiles([]);
        setImagePreviews([]);
    };

    const openEdit = (item) => {
        setEditing({ ...item });
        setError('');
        setImageFiles([]);
        setImagePreviews([]);
    };
    const closeForm = () => {
        setEditing(null);
        setImageFiles([]);
        setImagePreviews([]);
        setRemovingImageIndex(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // Revoke local preview object URLs when they're replaced or the form closes.
    useEffect(() => () => imagePreviews.forEach((url) => URL.revokeObjectURL(url)), [imagePreviews]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        if (files.some((f) => !IMAGE_TYPES.includes(f.type))) {
            showToast('Only JPG, PNG, or WebP images are allowed.', 'error');
            e.target.value = '';
            return;
        }
        if (files.some((f) => f.size > MAX_IMAGE_MB * 1024 * 1024)) {
            showToast(`Each image must be under ${MAX_IMAGE_MB}MB.`, 'error');
            e.target.value = '';
            return;
        }
        const selected = imageUpload?.multiple ? files : [files[0]];
        setImageFiles(selected);
        setImagePreviews(selected.map((f) => URL.createObjectURL(f)));
    };

    // Removes one existing (already-uploaded) image from an item that supports
    // multiple images. Only wired up when imageUpload.onRemoveExisting is
    // provided (see ManageProjects.jsx) — resources with a single
    // replace-only image (e.g. certificates) don't need this.
    const handleRemoveExistingImage = async (index) => {
        if (!imageUpload?.onRemoveExisting || !editing?._id || removingImageIndex !== null) return;
        setRemovingImageIndex(index);
        try {
            await imageUpload.onRemoveExisting(editing, index);
            // Refetch the single item so we reflect the server's array,
            // rather than assuming a field name here (ManageResource stays
            // generic across resources).
            const res = await service.getOne(editing._id);
            setEditing((prev) => ({ ...prev, ...res.data }));
            setItems((prev) => prev.map((it) => (it._id === editing._id ? res.data : it)));
            showToast('Image removed.');
        } catch {
            showToast('Failed to remove image.', 'error');
        } finally {
            setRemovingImageIndex(null);
        }
    };

    const handleChange = (name, value) => setEditing((prev) => ({ ...prev, [name]: value }));

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        const isNew = !editing._id;
        try {
            let payload = editing;
            let config;

            if (imageUpload && imageFiles.length > 0) {
                const formData = new FormData();
                fields.forEach((f) => {
                    const val = editing[f.name];
                    if (val !== undefined && val !== null) formData.append(f.name, val);
                });
                imageFiles.forEach((file) => formData.append(imageUpload.fieldName, file));
                payload = formData;
                config = { headers: { 'Content-Type': 'multipart/form-data' } };
            }

            if (editing._id) {
                await service.update(editing._id, payload, config);
            } else {
                await service.create(payload, config);
            }
            closeForm();
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
                            <button type="button" onClick={closeForm} className="text-sky-100/50 hover:text-white" aria-label="Cancel">
                                <X size={16} />
                            </button>
                        </div>

                        {error && (
                            <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                                {error}
                            </p>
                        )}

                        {imageUpload && (
                            <div>
                                <label className="text-xs text-sky-100/60 block mb-2">
                                    {imageUpload.label || 'Image'}
                                </label>
                                <div className="flex flex-wrap items-center gap-3">
                                    {imagePreviews.length > 0 ? (
                                        imagePreviews.map((url) => (
                                            <img key={url} src={url} alt="" className="h-14 w-14 rounded-lg object-cover border border-blue-500/20" />
                                        ))
                                    ) : (
                                        (imageUpload.existingValue?.(editing) || []).length ? (
                                            [].concat(imageUpload.existingValue(editing)).map((path, index) => (
                                                <div key={path} className="relative group">
                                                    <img src={resolveBackendAsset(path)} alt="" className="h-14 w-14 rounded-lg object-cover border border-blue-500/20" />
                                                    {imageUpload.multiple && imageUpload.onRemoveExisting && editing._id && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveExistingImage(index)}
                                                            disabled={removingImageIndex !== null}
                                                            aria-label="Remove this image"
                                                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/90 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                                                        >
                                                            {removingImageIndex === index ? (
                                                                <Loader2 size={10} className="animate-spin" />
                                                            ) : (
                                                                <X size={10} />
                                                            )}
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="h-14 w-14 flex items-center justify-center rounded-lg border border-dashed border-blue-500/20 text-sky-100/25">
                                                <ImageIcon size={18} />
                                            </div>
                                        )
                                    )}
                                    <div>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            multiple={!!imageUpload.multiple}
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id={`image-upload-${title}`}
                                        />
                                        <label
                                            htmlFor={`image-upload-${title}`}
                                            className="inline-flex items-center gap-1.5 cursor-pointer rounded-lg border border-blue-500/20 px-3 py-1.5 text-xs text-sky-200 hover:bg-blue-500/10 transition-colors"
                                        >
                                            <Upload size={12} /> {imageUpload.multiple ? 'Add images' : 'Replace image'}
                                        </label>
                                        <p className="text-[11px] text-sky-100/40 mt-1">
                                            JPG, PNG, or WebP — up to {MAX_IMAGE_MB}MB
                                            {imageUpload.multiple ? ' each. New images are added alongside existing ones.' : '.'}
                                            {imageUpload.multiple && imageUpload.onRemoveExisting && editing._id ? ' Hover an existing image to remove it.' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fields.map((f) => (
                            <div key={f.name}>
                                {f.type === 'checkbox' ? (
                                    <label className="flex items-center gap-2 text-sm text-sky-100/80 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={!!editing[f.name]}
                                            onChange={(e) => handleChange(f.name, e.target.checked)}
                                            className="h-4 w-4 rounded border-blue-500/30 bg-white/5 accent-blue-600"
                                        />
                                        {f.label}
                                    </label>
                                ) : (
                                <>
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
                                </>
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
                                    <button onClick={() => openEdit(item)} aria-label={`Edit ${renderRow ? renderRow(item) : item.name || item.title}`} className="p-2 text-sky-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-colors">
                                        <Pencil size={14} />
                                    </button>
                                    <button onClick={() => requestDelete(item)} aria-label={`Delete ${renderRow ? renderRow(item) : item.name || item.title}`} className="p-2 text-sky-100/50 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
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
