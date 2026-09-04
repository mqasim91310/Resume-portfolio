import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus inside a modal while `active` is true.
 *
 * Without this, a screen-reader or keyboard-only user hitting Tab inside an
 * open modal eventually tabs past its last focusable element and lands back
 * on the page behind it — which is still visually covered/inert. This:
 *   1. Remembers whatever had focus before the modal opened.
 *   2. Moves focus into the modal shortly after it mounts.
 *   3. Wraps Tab at the last focusable element back to the first (and
 *      Shift+Tab at the first back to the last).
 *   4. Restores focus to the original element when the modal closes.
 *
 * @param {boolean} active  Whether the modal is currently open.
 * @returns {React.RefObject} Attach to the modal's outermost content element.
 */
export function useFocusTrap(active) {
    const containerRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!active) return undefined;

        previouslyFocused.current = document.activeElement;

        const focusTimer = setTimeout(() => {
            const container = containerRef.current;
            const focusable = container?.querySelectorAll(FOCUSABLE_SELECTOR);
            (focusable?.[0] || container)?.focus();
        }, 50); // let the enter animation/mount settle first

        const onKeyDown = (e) => {
            if (e.key !== 'Tab' || !containerRef.current) return;

            const focusable = Array.from(
                containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
            ).filter((el) => el.offsetParent !== null);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            clearTimeout(focusTimer);
            document.removeEventListener('keydown', onKeyDown);
            previouslyFocused.current?.focus?.();
        };
    }, [active]);

    return containerRef;
}

export default useFocusTrap;
