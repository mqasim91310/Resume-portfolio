/**
 * Merges a live API list into a static/bundled list, keyed by a field like
 * title or name. This is deliberately NOT "API list replaces static list" —
 * a portfolio's real content already lives in the bundled data, and an
 * admin adding a single test entry shouldn't make every other project,
 * skill, or certificate vanish from the live site.
 *
 * - Live entries whose key matches a static entry OVERRIDE that entry
 *   (the admin edited something that already existed).
 * - Live entries with no matching key are APPENDED (the admin added
 *   something genuinely new).
 * - Static entries with no live counterpart are left untouched.
 *
 * @param {Array} staticList
 * @param {Array} liveList        Raw items from the API (not yet normalized).
 * @param {(item: object) => string} keyFn        Reads the merge key off a normalized item.
 * @param {(liveItem: object, index: number) => object} normalizeLive  Converts a raw API item into the same shape as the static list.
 */
export function mergeListByKey(staticList, liveList, keyFn, normalizeLive) {
    if (!Array.isArray(liveList) || liveList.length === 0) return staticList;

    const result = [...staticList];
    const claimed = new Set();

    liveList.forEach((rawItem, i) => {
        const normalized = normalizeLive(rawItem, i);
        const key = keyFn(normalized)?.toLowerCase().trim();
        if (!key) return;

        const matchIndex = result.findIndex(
            (existing, idx) => !claimed.has(idx) && keyFn(existing)?.toLowerCase().trim() === key
        );

        if (matchIndex !== -1) {
            result[matchIndex] = { ...result[matchIndex], ...normalized };
            claimed.add(matchIndex);
        } else {
            result.push(normalized);
        }
    });

    return result;
}

export default mergeListByKey;
