import check from '../check/index.js';
import { code, message } from '../consts/index.js';

/**
 * Call "createError" only when document's readyState is complete.
 * @param {function} callback
 * @returns {undefined}
 */
export default function register(callback) {
    document.readyState === 'complete'
        ? createError(callback)
        : document.addEventListener(
            'readystatechange',
            () => register(callback),
            { once: true }
        );
}

/**
 * Belated execution of the check and error throwing
 * Throws the error globally (potentially).
 * @param {function} callback
 * @returns {undefined}
 */
function createError(callback) {

    // Check and throw on next tick
    setTimeout(() => {
        const files = check();

        if (!files.length) { return; }

        const error = new Error(
            [
                message,
                ...files.map(
                    ({ src }) => src
                )
            ].join('\n')
        );
        error.code = code;
        error.files = files;

        error.toJSON = () => ({
            message: error.message,
            code: error.code
        });

        if (typeof callback === 'function') {
            callback(error);
        } else {
            throw error;
        }
    });
}
