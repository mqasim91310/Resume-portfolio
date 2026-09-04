import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Github, Linkedin } from '../components/BrandIcons';
import { contactService } from '../services';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | loading | success | error

    const validateForm = () => {
        const nextErrors = {};
        if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
        if (!formData.email.trim()) nextErrors.email = 'Please enter your email address.';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) nextErrors.email = 'Please enter a valid email address.';
        if (!formData.message.trim()) nextErrors.message = 'Please share a short message.';
        else if (formData.message.trim().length < 8) nextErrors.message = 'Please add a few more details.';

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setStatus({ state: 'error', message: 'Please fix the highlighted fields and try again.' });
            return;
        }

        setStatus({ state: 'loading', message: '' });
        try {
            const res = await contactService.submit(formData);
            setStatus({ state: 'success', message: res.message || 'Message sent successfully!' });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
        } catch (err) {
            const message =
                err.response?.data?.message ||
                'Something went wrong sending your message. Please try again or email me directly.';
            setStatus({ state: 'error', message });
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <section id="contact" className="contact-section section-padding">
            <div className="container">
                <motion.h1 
                    className="section-title"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Have an Idea or Project?
                </motion.h1>
                <motion.p
                    className="text-center text-sky-100/60 text-sm -mt-6 mb-8 max-w-xl mx-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    Whether it's a web app, a Flutter mobile app, or something that needs both — I'm happy to talk through what you're trying to build and whether I'm a good fit for it.
                </motion.p>
                <motion.div 
                    className="contact-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.div variants={itemVariants} className="contact-form glass-card">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text" id="name" name="name" placeholder="Your Name"
                                    value={formData.name} onChange={handleChange}
                                    className={errors.name ? 'input-error' : ''}
                                />
                                {errors.name && <p className="form-error">{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email" id="email" name="email" placeholder="Your Email"
                                    value={formData.email} onChange={handleChange}
                                    className={errors.email ? 'input-error' : ''}
                                />
                                {errors.email && <p className="form-error">{errors.email}</p>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text" id="subject" name="subject" placeholder="What's this about?"
                                    value={formData.subject} onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message" name="message" rows="6" placeholder="Your Message"
                                    value={formData.message} onChange={handleChange}
                                    className={errors.message ? 'input-error' : ''}
                                ></textarea>
                                {errors.message && <p className="form-error">{errors.message}</p>}
                            </div>

                            {status.state === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                                    className="status-box success"
                                >
                                    <CheckCircle2 size={16} /> {status.message}
                                </motion.p>
                            )}
                            {status.state === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                                    className="status-box error"
                                >
                                    <XCircle size={16} /> {status.message}
                                </motion.p>
                            )}

                            <motion.button
                                type="submit"
                                className="btn primary-btn inline-flex items-center gap-2"
                                disabled={status.state === 'loading'}
                                whileHover={{ scale: status.state === 'loading' ? 1 : 1.05 }}
                                whileTap={{ scale: status.state === 'loading' ? 1 : 0.95 }}
                            >
                                {status.state === 'loading' && <Loader2 size={16} className="animate-spin" />}
                                {status.state === 'loading' ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div variants={itemVariants} className="contact-info glass-card">
                        <div className="info-item">
                            <motion.span
                                animate={{ rotate: [0, -8, 8, -8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
                                style={{ display: 'inline-flex' }}
                            >
                                <Mail size={24} className="icon" />
                            </motion.span>
                            <span>mqasim91310@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <motion.span
                                animate={{ rotate: [0, -8, 8, -8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut', delay: 0.3 }}
                                style={{ display: 'inline-flex' }}
                            >
                                <Phone size={24} className="icon" />
                            </motion.span>
                            <span>+92 320 658 9259</span>
                        </div>
                        <div className="info-item">
                            <motion.span
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                                style={{ display: 'inline-flex' }}
                            >
                                <MapPin size={24} className="icon" />
                            </motion.span>
                            <span>Lahore, Pakistan</span>
                        </div>
                        <motion.div 
                            className="social-links"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <motion.a 
                                href="https://github.com/mqasim91310" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Github size={28} />
                            </motion.a>
                            <motion.a 
                                href="https://www.linkedin.com/in/muhammad-qasim-6725242a7" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Linkedin size={28} />
                            </motion.a>
                            <motion.a 
                                href="mailto:mqasim91310@gmail.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Mail size={28} />
                            </motion.a>
                            <motion.a 
                                href="tel:+923206589259" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                variants={itemVariants}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Phone size={28} />
                            </motion.a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
