import check from '../check';
import { code, message } from '../consts';

/**
 * Register "checkAndThrow" function to the `window.load` event.
 */
export default function register() {
    document.readyState === 'complete'
        ? checkAndThrow()
        : window.addEventListener('load', checkAndThrow);
}

/**
 * Belated execution of the check and error throwing
 * Throws the error globally (potentially).
 */
function checkAndThrow() {

    // Check and throw on next tick
    setTimeout(() => {
        const files = check();

        if (files.length) {
            const error = new Error([ message, ...files.map(({ src }) => src) ].join('\n'));
            error.code = code;
            error.files = files;

            error.toJSON = () => ({
                message: error.message,
                code: error.code
            });

            throw error;
        }
    });
}
