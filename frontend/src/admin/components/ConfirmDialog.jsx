import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

// Controlled confirm modal. Usage:
//   const [confirmState, setConfirmState] = useState(null);
//   setConfirmState({ message: 'Delete this project?', onConfirm: () => doDelete(id) });
//   <ConfirmDialog state={confirmState} onClose={() => setConfirmState(null)} />
const ConfirmDialog = ({ state, onClose }) => {
    const handleConfirm = () => {
        state?.onConfirm?.();
        onClose();
    };

    return (
        <AnimatePresence>
            {state && (
                <motion.div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="w-full max-w-sm rounded-2xl border border-red-500/20 bg-[#111827] p-6 shadow-2xl"
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                                <AlertTriangle size={20} />
                            </div>
                            <h3 className="text-base font-semibold text-white">
                                {state?.title || 'Are you sure?'}
                            </h3>
                        </div>
                        <p className="mb-6 text-sm text-sky-100/60">{state?.message}</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="rounded-lg border border-white/10 px-4 py-2 text-sm text-sky-100/70 transition-colors hover:bg-white/5 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="rounded-lg bg-red-500/90 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmDialog;
