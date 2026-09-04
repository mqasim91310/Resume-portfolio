import { useHybridData } from './useHybridData';
import { dedupedFetch } from '../utils/requestCache';

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see hooks/useProjects.js for the
// rationale. dedupedFetch collapses simultaneous calls (e.g. Home renders
// both its own hero stats and <AboutPreview>, which both call this) into
// one network request.
const fetchStatistics = () =>
    dedupedFetch('statistics', () => import('../services').then(({ statisticsService }) => statisticsService.get()));

/**
 * Statistics is a singleton doc that self-creates with every field at 0
 * (see backend/controllers/statisticsController.js) the first time it's
 * requested. A field of `0` there means "the admin hasn't set this yet",
 * not "the true value is zero" — so we only let a live field override the
 * static default when it's a positive number.
 *
 * @param {{years?, projects?, certificates?, clients?, awards?}} staticDefaults
 */
export function useStatistics(staticDefaults) {
    const merge = (live) => {
        const s = live?.data;
        if (!s) return null;
        const merged = { ...staticDefaults };
        if (s.experience > 0) merged.years = s.experience;
        if (s.projects > 0) merged.projects = s.projects;
        if (s.certificates > 0) merged.certificates = s.certificates;
        if (s.clients > 0) merged.clients = s.clients;
        if (s.awards > 0) merged.awards = s.awards;
        return merged;
    };

    const [stats] = useHybridData(fetchStatistics, staticDefaults, merge);
    return stats;
}

export default useStatistics;
