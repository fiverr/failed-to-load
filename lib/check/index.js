/**
 * @type {script} query selector for files that are supposed to set themselves with the loaded flag
 */
const QUERY = 'script[src][onload*="this.loaded"]';

/**
 * @returns {Error}
 */
export default () => Array.from(
    document.querySelectorAll(QUERY)
).filter(
    (s) => !(s.loaded || s.async || s.defer)
);
