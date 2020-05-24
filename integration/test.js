import chai from 'chai';
import chaiString from 'chai-string';
import wait from '@lets/wait';
import { register } from '..';
import { code, message } from '../lib/consts';

chai.use(chaiString);
const { expect } = chai;
const { onerror } = window;
const errors = [];

describe('Throws errors when script tags are not loaded', () => {
    beforeEach(() => {
        window.onerror = (message, file, line, column, error) => {
            errors.push(error);
            return error.code === code
                ? false
                : onerror.call(window, message, file, line, column, error);
        };
    });
    afterEach(() => {
        errors.length = 0;
        window.onerror = onerror;
    });
    it('should throw relevant error on the window context', async() => {
        register();
        await wait(100);
        expect(errors).to.be.lengthOf(1);
        const [ error ] = errors;
        expect(error.code).to.equal(code);
    });
    it('should throw the desired error', async() => {
        register();
        await wait(100);
        const [ error ] = errors;
        expect(error).to.be.an.instanceof(Error);
        expect(error.code).to.equal(code);
        expect(error.message).to.match(new RegExp(`^${message}`));
    });
    it('should catch 2 failed files out of three total script files with relevant onload attribute', async() => {
        register();
        await wait(100);
        const [ error ] = errors;
        expect(
            document.querySelectorAll('script[src]')
        ).to.be.lengthOf.at.least(3);
        expect(error.files).to.be.lengthOf(2);
    });
    it('should expose the error code upon stringify', async() => {
        register();
        await wait(100);
        const [ error ] = errors;
        const json = error.toJSON();
        expect(json).to.have.keys('message', 'code');
    });
    it('should separate message and each file details to lines', async() => {
        register();
        await wait(100);
        const [ { message } ] = errors;
        expect(message).entriesCount('\n', 2);
    });
    it('should list sources of missing files', async() => {
        register();
        await wait(100);
        const [ { message } ] = errors;
        expect(message).to.match(/http:\/\/localhost:\d{4}\/one\/missing\.js/m);
        expect(message).to.match(/http:\/\/localhost:\d{4}\/other\/missing\.js/m);
    });
});
