import { useHybridData } from './useHybridData';

const flatten = (grouped) =>
    grouped.flatMap((cat) => cat.items.map((item) => ({ category: cat.category, name: item.name, level: item.level })));

const regroup = (flat) => {
    const order = [];
    const byCategory = new Map();
    flat.forEach(({ category, name, level }) => {
        if (!byCategory.has(category)) {
            byCategory.set(category, []);
            order.push(category);
        }
        byCategory.get(category).push({ name, level });
    });
    return order.map((category) => ({ category, items: byCategory.get(category) }));
};

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted — see useProjects.js for the rationale.
const fetchSkills = () => import('../services').then(({ skillsService }) => skillsService.getAll());

/**
 * @param {Array} staticSkillsData  Array of { category, items: [{ name, level }] }.
 */
export function useSkills(staticSkillsData) {
    const merge = (live) => {
        if (!Array.isArray(live?.data) || live.data.length === 0) return null;

        const staticFlat = flatten(staticSkillsData);
        const liveFlat = live.data.map((s) => ({
            category: s.category,
            name: s.name,
            level: `${s.percentage}%`,
        }));

        const result = [...staticFlat];
        const claimed = new Set();
        liveFlat.forEach((liveSkill) => {
            const key = `${liveSkill.category}::${liveSkill.name}`.toLowerCase();
            const idx = result.findIndex(
                (s, i) => !claimed.has(i) && `${s.category}::${s.name}`.toLowerCase() === key
            );
            if (idx !== -1) {
                result[idx] = liveSkill;
                claimed.add(idx);
            } else {
                result.push(liveSkill);
            }
        });

        return regroup(result);
    };

    const [skillsData] = useHybridData(fetchSkills, staticSkillsData, merge);
    return skillsData;
}

export default useSkills;
