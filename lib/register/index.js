import check from '../check';
import { code, message } from '../consts';

/**
 * Self-register to the `window.load` event.
 * Throws the error globally.
 */
export default function register() {
    function asynchronous() {

        // Throw on next tick
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

    document.readyState === 'complete'
        ? asynchronous()
        : window.addEventListener('load', asynchronous);
}
