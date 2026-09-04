import { useHybridData } from './useHybridData';
import { mergeListByKey } from '../utils/mergeListByKey';
import { resolveCertificateIcon, resolveGradient } from '../utils/iconResolvers';
import { resolveBackendAsset } from '../utils/backendAsset';

const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const normalizeLive = (c, index) => ({
    _id: c._id,
    title: c.title,
    issuer: c.organization,
    instructor: c.instructor || undefined,
    description: c.description || undefined,
    date: formatDate(c.issueDate),
    certificateCode: c.certificateCode || undefined,
    length: c.length || undefined,
    icon: resolveCertificateIcon(c.title || '', index),
    gradient: resolveGradient(index),
    link: c.link || '#',
    // The static data links to bundled PDFs via `file`; admin-uploaded
    // certificates are images (see backend upload middleware), so they use
    // a separate field the modal/card renders as an <img> instead of an
    // <iframe>.
    image: c.certificateImage ? resolveBackendAsset(c.certificateImage) : undefined,
});

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see useProjects.js for the rationale.
const fetchCertificates = () => import('../services').then(({ certificatesService }) => certificatesService.getAll());

/**
 * @param {Array} staticCertificates  The bundled certificateData array.
 */
export function useCertificates(staticCertificates) {
    const merge = (live) => {
        if (!Array.isArray(live?.data)) return null;
        return mergeListByKey(staticCertificates, live.data, (item) => item.title, normalizeLive);
    };

    const [certificates] = useHybridData(fetchCertificates, staticCertificates, merge);
    return certificates;
}

export default useCertificates;
