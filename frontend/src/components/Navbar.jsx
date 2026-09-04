import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAbout } from '../hooks/useAbout';

// Six-item one-page nav. Each entry scrolls to a section id on the
// homepage; when the user isn't on "/", links first route home, then the
// browser's native hash-jump (plus our scroll-restoration effect) takes
// them to the section once the page has mounted.
const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Services', id: 'services' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === '/';
    const about = useAbout({ resumeUrl: '/Muhammad-Qasim-CV.pdf' });

    const toggleMenu = () => setIsOpen((o) => !o);

    // Let Escape close the mobile menu, and don't leave it stuck open if the
    // viewport is resized past the mobile breakpoint while it's open.
    useEffect(() => {
        if (!isOpen) return undefined;
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    // Slim the header down once the user has scrolled past the hero.
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll-spy: highlight whichever section is currently in view.
    useEffect(() => {
        if (!onHome) return undefined;
        const sections = navLinks
            .map((l) => document.getElementById(l.id))
            .filter(Boolean);
        if (!sections.length) return undefined;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [onHome]);

    const goToSection = (id) => (e) => {
        e.preventDefault();
        setIsOpen(false);
        if (onHome) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            navigate(`/#${id}`);
        }
    };

    return (
        <motion.header
            className={`header ${scrolled ? 'header-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.2 }}
        >
            <nav className="navbar container">
                <Link to="/" className="nav-logo" onClick={goToSection('home')}>
                    Muhammad Qasim
                </Link>

                <ul id="nav-menu" className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <motion.li
                            key={link.id}
                            className="nav-item"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a
                                href={`#${link.id}`}
                                onClick={goToSection(link.id)}
                                className={`nav-link ${onHome && activeId === link.id ? 'active' : ''}`}
                                aria-current={onHome && activeId === link.id ? 'page' : undefined}
                            >
                                {link.name}
                            </a>
                        </motion.li>
                    ))}
                    <motion.li
                        className="nav-item nav-item-cta"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <a
                            href={about.resumeUrl}
                            download="Muhammad-Qasim-CV.pdf"
                            target={about.resumeUrl.startsWith('/') ? undefined : '_blank'}
                            rel={about.resumeUrl.startsWith('/') ? undefined : 'noopener noreferrer'}
                            className="nav-link nav-cta-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            Download CV
                        </a>
                    </motion.li>
                </ul>

                <button
                    type="button"
                    className="hamburger"
                    onClick={toggleMenu}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    aria-controls="nav-menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
        </motion.header>
    );
};

export default Navbar;
