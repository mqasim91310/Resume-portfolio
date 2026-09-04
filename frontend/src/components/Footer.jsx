import React from 'react';
import { Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Github, Linkedin } from './BrandIcons';
import { motion } from 'framer-motion';
import { useAbout } from '../hooks/useAbout';

const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
];

// Content that lives on its own page rather than in the one-page flow —
// still worth a footer link for anyone who wants the deeper view.
const moreLinks = [
    { name: 'Full Journey', path: '/journey' },
    { name: 'Services', path: '/services' },
    { name: 'Tech Stack', path: '/tech-stack' },
];

const Footer = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onHome = location.pathname === '/';
    const about = useAbout({
        github: 'https://github.com/mqasim91310',
        linkedin: 'https://www.linkedin.com/in/muhammad-qasim-6725242a7',
        email: 'mailto:mqasim91310@gmail.com',
    });

    const goToSection = (id) => (e) => {
        e.preventDefault();
        if (onHome) {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            navigate(`/#${id}`);
        }
    };

    const scrollToTop = (e) => {
        e.preventDefault();
        if (onHome) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
    };

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <div className="footer-card">
                    <div className="footer-intro">
                        <p className="footer-eyebrow">Portfolio</p>
                        <h3>Muhammad Qasim</h3>
                        <p className="footer-role">Full-Stack Developer · Flutter Developer · AI Enthusiast</p>
                        <p>Building thoughtful digital experiences with a calm, modern approach and a strong technical foundation.</p>
                        <div className="footer-socials">
                            <a href={about.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
                            <a href={about.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href={about.email} aria-label="Email"><Mail size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                {quickLinks.map((link) => (
                                    <li key={link.id}>
                                        <a href={`#${link.id}`} onClick={goToSection(link.id)}>{link.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Explore</h4>
                            <ul>
                                {moreLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link to={link.path}>{link.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} Muhammad Qasim. All rights reserved.
                    </p>
                    <a href="#home" className="back-to-top" onClick={scrollToTop}>Back to Top</a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
