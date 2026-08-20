import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';
import CursorGlow from './CursorGlow';
import ScrollProgressBar from './ScrollProgressBar';
import PageTransition from './PageTransition';

// Wraps every public-facing page with the site's shared chrome. Nested
// routes render into <Outlet/> (via PageTransition) instead of using a
// second <Routes> tree, which keeps route matching simple.
const PublicLayout = () => {
    const { pathname, hash } = useLocation();

    // The site is a one-pager with a handful of deep-linkable sub-pages
    // (journey, semester detail, etc). Whenever the URL carries a hash —
    // e.g. clicking a nav link from one of those sub-pages navigates to
    // "/#projects" — scroll the matching section into view once it mounts.
    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            // Wait a tick for the (possibly lazy-loaded) target page to render.
            const timeout = setTimeout(() => {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 120);
            return () => clearTimeout(timeout);
        }
        window.scrollTo(0, 0);
        return undefined;
    }, [pathname, hash]);

    return (
        <>
            <ScrollProgressBar />
            <CursorGlow />
            <StarField />
            <Navbar />
            <main>
                <PageTransition />
            </main>
            <Footer />
        </>
    );
};

export default PublicLayout;
