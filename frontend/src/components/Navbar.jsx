import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const toggleMenu = () => setIsOpen((o) => !o);

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

                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
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
                </ul>

                <div className="hamburger" onClick={toggleMenu} role="button" aria-label="Toggle menu">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </nav>
        </motion.header>
    );
};

export default Navbar;
