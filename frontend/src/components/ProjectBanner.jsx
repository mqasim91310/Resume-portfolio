import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Icon + gradient "banner" used in place of a screenshot for every project —
// keeps things consistent and on-theme without relying on stock photography.
// When a real image is available (admin-uploaded via the CMS), it's shown
// instead; if it fails to load, we gracefully fall back to the icon banner
// rather than leaving a broken image.
const ProjectBanner = ({ icon: Icon, gradient, featured = false, image, title }) => {
    const [imgFailed, setImgFailed] = useState(false);
    const showImage = image && !imgFailed;

    return (
        <div className={`project-banner ${showImage ? '' : `bg-gradient-to-br ${gradient}`}`}>
            {showImage ? (
                <img
                    src={image}
                    alt={title ? `Screenshot of ${title}` : ''}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    onError={() => setImgFailed(true)}
                />
            ) : (
                <Icon size={46} strokeWidth={1.6} className="text-white/90" aria-hidden="true" />
            )}
            <div className="project-banner-overlay" />
            {featured && (
                <span className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-300 backdrop-blur-sm">
                    <Star size={11} className="fill-amber-300" /> Featured
                </span>
            )}
        </div>
    );
};

export default ProjectBanner;
