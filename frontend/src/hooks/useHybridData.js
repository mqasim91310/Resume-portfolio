import { useEffect, useRef, useState } from 'react';

/**
 * "Static-first, API-enhanced" data hook.
 *
 * The portfolio's public pages ship with real content bundled at build time
 * (src/data/*.js or inline arrays), so the site is always fast and always
 * has something correct to show — even offline, even if MongoDB is down,
 * even on the very first request before anyone has touched the admin panel.
 *
 * On mount, this hook:
 *   1. Returns `staticData` immediately — nothing waits on the network.
 *   2. Fires `fetchFn()` in the background.
 *   3. If it resolves with usable content, `merge(liveResponse, staticData)`
 *      decides what the visitor actually sees. `merge` gets the chance to
 *      keep individual fields/entries from the static data if the live
 *      value is empty/placeholder (e.g. a freshly-seeded Statistics doc
 *      full of zeros shouldn't blank out real numbers).
 *   4. If the fetch fails (backend asleep, offline, CORS, whatever) the
 *      static data simply stays on screen — failure is silent by design,
 *      this is a progressive enhancement, not a required data source.
 *
 * @param {() => Promise<any>} fetchFn      Called once on mount.
 * @param {any} staticData                  Bundled fallback, shown immediately.
 * @param {(live: any, staticData: any) => any} [merge]  Combine live + static.
 *        Return `null`/`undefined` to keep the static data as-is.
 * @returns {[any, 'static'|'live', boolean]} [data, source, isLive]
 */
export function useHybridData(fetchFn, staticData, merge) {
    const [data, setData] = useState(staticData);
    const [source, setSource] = useState('static');
    const fetchFnRef = useRef(fetchFn);
    const mergeRef = useRef(merge);
    fetchFnRef.current = fetchFn;
    mergeRef.current = merge;

    useEffect(() => {
        let cancelled = false;

        fetchFnRef.current()
            .then((live) => {
                if (cancelled) return;
                const merged = mergeRef.current ? mergeRef.current(live, staticData) : live;
                if (merged === null || merged === undefined) return;
                setData(merged);
                setSource('live');
            })
            .catch(() => {
                // Expected when the backend is unreachable/cold-starting —
                // the visitor already has correct static content on screen.
            });

        return () => {
            cancelled = true;
        };
        // staticData is intentionally excluded — it's the bundled default
        // and shouldn't re-trigger a fetch if a parent re-renders.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [data, source, source === 'live'];
}

export default useHybridData;
