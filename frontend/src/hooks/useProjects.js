import { useHybridData } from './useHybridData';
import { mergeListByKey } from '../utils/mergeListByKey';
import { resolveProjectIcon, resolveGradient } from '../utils/iconResolvers';
import { resolveBackendAsset } from '../utils/backendAsset';

const normalizeLive = (p, index) => ({
    _id: p._id,
    semester: p.semester,
    category: p.category || 'other',
    title: p.title,
    description: p.description,
    technologies: p.technologies,
    role: p.role || '',
    features: p.features || '',
    problem: p.problem || '',
    solution: p.solution || '',
    techHighlights: p.techHighlights || '',
    contribution: p.contribution || '',
    challenges: p.challenges || '',
    outcome: p.outcome || '',
    icon: resolveProjectIcon(p.category || '', index),
    gradient: resolveGradient(index),
    github: p.githubLink || undefined,
    demo: p.liveDemoLink || undefined,
    featured: !!p.featured,
    image: p.images?.[0] ? resolveBackendAsset(p.images[0]) : undefined,
});

// Dynamically imported (not a static top-level import) so axios and the
// whole API service layer only download in the background after the static
// content has already painted — a static top-level import here would make
// every public page that renders projects wait on that network request
// before it could even render, defeating the point of "static-first".
const fetchProjects = () => import('../services').then(({ projectsService }) => projectsService.getAll());

/**
 * @param {Array} staticProjects  The bundled projectData array.
 */
export function useProjects(staticProjects) {
    const merge = (live) => {
        if (!Array.isArray(live?.data)) return null;
        return mergeListByKey(staticProjects, live.data, (item) => item.title, normalizeLive);
    };

    const [projects] = useHybridData(fetchProjects, staticProjects, merge);
    return projects;
}

export default useProjects;
