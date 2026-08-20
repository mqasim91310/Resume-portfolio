import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Calendar, Clock, Hash } from 'lucide-react';
import ProjectBanner from '../components/ProjectBanner';
import CertificateModal from '../components/CertificateModal';
import { certificateData } from '../data/certificates';

const Certificates = () => {
    const [activeCertificate, setActiveCertificate] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, rotateY: -90 },
        visible: { opacity: 1, rotateY: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section id="certificates" className="certificates-section section-padding">
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Certificates
                </motion.h2>
                <p className="text-center text-sky-100/60 text-sm -mt-6 mb-8 max-w-xl mx-auto">
                    {certificateData.length} certifications across AI tools, data analysis, security and web development.
                </p>

                <motion.div
                    className="certificates-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {certificateData.map((cert, index) => (
                        <motion.div
                            key={index}
                            className="certificate-card glass-card"
                            variants={itemVariants}
                            style={{ perspective: 800 }}
                            whileHover={{ scale: 1.03, y: -6, boxShadow: "0 12px 40px rgba(56, 189, 248, 0.45)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveCertificate(cert)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setActiveCertificate(cert);
                                }
                            }}
                        >
                            <ProjectBanner icon={cert.icon} gradient={cert.gradient} />
                            <h3>{cert.title}</h3>
                            <p>Issued by {cert.issuer}</p>
                            {cert.instructor && <p className="text-xs text-sky-100/50">Instructor: {cert.instructor}</p>}
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-sky-100/50 mt-2 mb-3">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {cert.date}</span>
                                {cert.length && <span className="flex items-center gap-1"><Clock size={12} /> {cert.length}</span>}
                                {cert.certificateCode && <span className="flex items-center gap-1"><Hash size={12} /> {cert.certificateCode}</span>}
                            </div>
                            <motion.button
                                type="button"
                                className="btn small-btn"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCertificate(cert);
                                }}
                            >
                                <Eye size={18} /> View Certificate
                            </motion.button>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <CertificateModal
                certificate={activeCertificate}
                onClose={() => setActiveCertificate(null)}
            />
        </section>
    );
};

export default Certificates;
