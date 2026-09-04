import { API_BASE_URL } from '../services/api';

// API_BASE_URL is something like "https://api.example.com/api" — files the
// backend serves statically (uploaded profile photos, certificate images,
// resumes) live one level up, at "https://api.example.com/uploads/...".
const BACKEND_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');

/**
 * Turns a path the backend returned (e.g. "/uploads/profile/abc.jpg") into
 * an absolute URL. Absolute URLs (external links) and empty values pass
 * through unchanged.
 */
export const resolveBackendAsset = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path;
    return `${BACKEND_ORIGIN}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default resolveBackendAsset;
