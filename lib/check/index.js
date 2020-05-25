/**
 * Query selector for script tags that are supposed to mark themselves with the loaded flag.
 * @type {string}
 */
const QUERY = 'script[src][onload*="this.loaded"]';

/**
 * Find and retrieve all script tag with the onload setup that are not marked as loaded.
 * Excludes tags that have either the `async` or `defer` attribute.
 * @returns {HTMLScriptElement[]}
 */
export default () => Array.from(
    document.querySelectorAll(QUERY)
).filter(
    (s) => !(s.loaded || s.async || s.defer)
);
