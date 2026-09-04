import { useHybridData } from './useHybridData';
import { mergeListByKey } from '../utils/mergeListByKey';

const normalizeLive = (e) => ({
    _id: e._id,
    company: e.company,
    position: e.position,
    department: e.department || '',
    duration: e.duration,
    mode: e.mode || '',
    description: e.description || '',
});

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see useProjects.js for the rationale.
const fetchExperience = () => import('../services').then(({ experienceService }) => experienceService.getAll());

/**
 * @param {Array} staticExperience  The bundled experienceData array.
 */
export function useExperience(staticExperience) {
    const merge = (live) => {
        if (!Array.isArray(live?.data)) return null;
        return mergeListByKey(
            staticExperience,
            live.data,
            (item) => `${item.company}|${item.position}`,
            normalizeLive
        );
    };

    const [experience] = useHybridData(fetchExperience, staticExperience, merge);
    return experience;
}

export default useExperience;
