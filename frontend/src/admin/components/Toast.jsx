import React, { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import { ToastContext } from './toastContextValue';

let idCounter = 0;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const dismiss = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message, type = 'success') => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => dismiss(id), 3500);
    }, [dismiss]);

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
                            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                            className={`pointer-events-auto flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-md ${
                                t.type === 'error'
                                    ? 'border-red-500/30 bg-red-500/10 text-red-300'
                                    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                            }`}
                        >
                            {t.type === 'error' ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                            {t.message}
                            <button onClick={() => dismiss(t.id)} className="ml-1 opacity-60 hover:opacity-100">
                                <X size={13} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
