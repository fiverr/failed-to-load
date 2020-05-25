/**
 * @type {script} query selector for files that are supposed to set themselves with the loaded flag
 */
const QUERY = 'script[src][onload*="this.loaded"]';

/**
 * find and retrieve all script tag with the onload setup that are not marked as loaded. Exclude async and defer
 * @returns {HTMLScriptElement[]}
 */
export default () => Array.from(
    document.querySelectorAll(QUERY)
).filter(
    (s) => !(s.loaded || s.async || s.defer)
);
