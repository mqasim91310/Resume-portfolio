const inflight = new Map();

/**
 * Deduplicates concurrent identical fetches within the same page session.
 *
 * Navbar and Footer render on every page and both call useAbout(); the
 * homepage additionally renders Home, which calls both useAbout() and
 * useStatistics(). Without this, that's 2-3 identical GET requests fired
 * in the same tick for something that only needs to be fetched once.
 *
 * If a request for `key` is already in flight, later callers get the same
 * promise instead of starting a new network call. Once it settles, the
 * entry is cleared so a later remount (e.g. navigating away and back) can
 * fetch fresh data again — this is a de-dup cache, not a persistent one.
 */
export function dedupedFetch(key, fetchFn) {
    if (inflight.has(key)) return inflight.get(key);

    const promise = fetchFn().finally(() => {
        inflight.delete(key);
    });
    inflight.set(key, promise);
    return promise;
}

export default dedupedFetch;
