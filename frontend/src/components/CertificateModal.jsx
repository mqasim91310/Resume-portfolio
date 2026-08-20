import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';

/**
 * Full-screen certificate viewer.
 * Renders the certificate PDF inline (via <iframe>) and offers a Download button.
 * Falls back to an "Open in new tab" link if `file` isn't available (e.g. an
 * external-only certificate that has no locally hosted PDF).
 */
const CertificateModal = ({ certificate, onClose }) => {
    const [loaded, setLoaded] = useState(false);

    // Reset the loading state whenever a new certificate is opened.
    useEffect(() => {
        setLoaded(false);
    }, [certificate]);

    // Lock background scroll while the modal is open, and allow closing with Esc.
    useEffect(() => {
        if (!certificate) return;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [certificate, onClose]);

    return (
        <AnimatePresence>
            {certificate && (
                <motion.div
                    className="cert-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="cert-modal-content glass-card"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="cert-modal-header">
                            <div>
                                <h3>{certificate.title}</h3>
                                <p>Issued by {certificate.issuer}</p>
                            </div>
                            <button
                                className="cert-modal-close"
                                onClick={onClose}
                                aria-label="Close certificate view"
                            >
                                <X size={22} />
                            </button>
                        </div>

                        <div className="cert-modal-body">
                            {certificate.file ? (
                                <>
                                    {!loaded && (
                                        <div className="cert-modal-loading">
                                            <Loader2 size={28} className="animate-spin" />
                                            <span>Loading certificate…</span>
                                        </div>
                                    )}
                                    <iframe
                                        src={certificate.file}
                                        title={certificate.title}
                                        className="cert-modal-iframe"
                                        onLoad={() => setLoaded(true)}
                                        style={{ opacity: loaded ? 1 : 0 }}
                                    />
                                </>
                            ) : (
                                <div className="cert-modal-fallback">
                                    <p>A downloadable copy of this certificate isn't hosted here yet.</p>
                                    {certificate.link && certificate.link !== '#' && (
                                        <a
                                            href={certificate.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn small-btn primary-btn"
                                        >
                                            <ExternalLink size={16} /> View on verification page
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="cert-modal-footer">
                            {certificate.file && (
                                <a
                                    href={certificate.file}
                                    download
                                    className="btn small-btn primary-btn"
                                >
                                    <Download size={16} /> Download Certificate
                                </a>
                            )}
                            {certificate.link && certificate.link !== '#' && (
                                <a
                                    href={certificate.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn small-btn secondary-btn"
                                >
                                    <ExternalLink size={16} /> Verify Online
                                </a>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CertificateModal;
