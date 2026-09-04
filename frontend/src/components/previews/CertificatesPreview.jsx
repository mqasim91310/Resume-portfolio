import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import ProjectBanner from '../ProjectBanner';
import SectionCta from './SectionCta';
import { certificateData as staticCertificateData } from '../../data/certificates';
import { useCertificates } from '../../hooks/useCertificates';

const itemVariants = {
    hidden: { opacity: 0, rotateY: -30 },
    visible: { opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
};

const CertificatesPreview = () => {
    const certificateData = useCertificates(staticCertificateData);
    const preview = certificateData.slice(0, 3);

    return (
    <section id="certificates" className="section-padding relative">
        <div className="container">
            <motion.h2
                className="section-title text-center"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                Certificates
            </motion.h2>
            <p className="mx-auto -mt-6 mb-10 max-w-xl text-center text-sm text-sky-100/60">
                {certificateData.length} certifications across AI tools, security, data analysis and web development.
            </p>

            <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {preview.map((cert) => (
                    <motion.div
                        key={cert._id || cert.title}
                        variants={itemVariants}
                        style={{ perspective: 800 }}
                        whileHover={{ scale: 1.03, y: -6 }}
                        className="certificate-card glass-card"
                    >
                        <ProjectBanner icon={cert.icon} gradient={cert.gradient} image={cert.image} title={cert.title} />
                        <h3>{cert.title}</h3>
                        <p>Issued by {cert.issuer}</p>
                        {cert.date && (
                            <div className="mt-2 flex items-center justify-center gap-1 text-xs text-sky-100/50">
                                <Calendar size={12} /> {cert.date}
                            </div>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            <SectionCta to="/certificates" label="View All Certificates" />
        </div>
    </section>
    );
};

export default CertificatesPreview;
