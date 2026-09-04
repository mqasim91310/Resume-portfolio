import { useHybridData } from './useHybridData';
import { resolveBackendAsset } from '../utils/backendAsset';
import { dedupedFetch } from '../utils/requestCache';

// Dynamically imported so axios/the API layer only loads in the background
// after static content has painted. This one matters most of all: useAbout
// is called from Navbar and Footer, which render on every single page —
// dedupedFetch collapses their simultaneous calls into one network request.
const fetchAbout = () =>
    dedupedFetch('about', () => import('../services').then(({ aboutService }) => aboutService.get()));

/**
 * Wires the concrete, admin-editable identity fields — name, social links,
 * profile photo, resume file — to the About API. Deliberately leaves the
 * hero's hand-written marketing copy (role tagline, typing phrases, intro
 * paragraph) alone: those are crafted prose, not form fields, and the About
 * schema's single `designation`/`biography` strings don't have anywhere
 * good to go without reshaping content the site already presents well.
 *
 * @param {{name, github, linkedin, email, profileImage, resumeUrl}} staticDefaults
 */
export function useAbout(staticDefaults) {
    const merge = (live) => {
        const a = live?.data;
        if (!a) return null;
        const merged = { ...staticDefaults };
        if (a.name) merged.name = a.name;
        if (a.socialLinks?.github) merged.github = a.socialLinks.github;
        if (a.socialLinks?.linkedin) merged.linkedin = a.socialLinks.linkedin;
        if (a.socialLinks?.email) {
            const email = a.socialLinks.email.trim();
            merged.email = email.startsWith('mailto:') ? email : `mailto:${email}`;
        }
        if (a.profileImage) merged.profileImage = resolveBackendAsset(a.profileImage);
        if (a.resumeFile) merged.resumeUrl = resolveBackendAsset(a.resumeFile);
        // These four map 1:1 onto About page tabs, so — unlike the free-form
        // `biography` field above — there's a clear place for them to go.
        // Only override the bundled copy when an admin has actually set one.
        if (a.careerObjective) merged.careerObjective = a.careerObjective;
        if (a.currentFocus) merged.currentFocus = a.currentFocus;
        if (a.futureGoals) merged.futureGoals = a.futureGoals;
        if (a.interests) merged.interests = a.interests;
        return merged;
    };

    const [about] = useHybridData(fetchAbout, staticDefaults, merge);
    return about;
}

export default useAbout;
