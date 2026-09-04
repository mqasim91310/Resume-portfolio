import { useHybridData } from './useHybridData';
import { mergeListByKey } from '../utils/mergeListByKey';

const normalizeLive = (e) => ({
    _id: e._id,
    degree: e.degree,
    institute: e.institute,
    duration: e.duration,
    description: e.description || '',
});

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see useProjects.js for the rationale.
const fetchEducation = () => import('../services').then(({ educationService }) => educationService.getAll());

/**
 * @param {Array} staticEducation  The bundled educationData array.
 */
export function useEducation(staticEducation) {
    const merge = (live) => {
        if (!Array.isArray(live?.data)) return null;
        return mergeListByKey(staticEducation, live.data, (item) => `${item.degree}|${item.institute}`, normalizeLive);
    };

    const [education] = useHybridData(fetchEducation, staticEducation, merge);
    return education;
}

export default useEducation;
