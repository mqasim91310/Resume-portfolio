import { useHybridData } from './useHybridData';
import { mergeListByKey } from '../utils/mergeListByKey';
import { resolveServiceIcon } from '../utils/iconResolvers';

const normalizeLive = (s, index) => ({
    _id: s._id,
    title: s.title,
    description: s.description,
    bullets: s.bullets
        ? s.bullets.split('\n').map((b) => b.trim()).filter(Boolean)
        : [],
    iconKey: resolveServiceIcon(s.icon || '', index),
});

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see useProjects.js for the rationale.
const fetchServices = () => import('../services').then(({ servicesService }) => servicesService.getAll());

/**
 * @param {Array} staticServices  Array of { title, description, iconKey }.
 */
export function useServices(staticServices) {
    const merge = (live) => {
        if (!Array.isArray(live?.data)) return null;
        return mergeListByKey(staticServices, live.data, (item) => item.title, normalizeLive);
    };

    const [services] = useHybridData(fetchServices, staticServices, merge);
    return services;
}

export default useServices;
