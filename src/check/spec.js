import chai from 'chai';
import check from './index.js';

const { expect } = chai;
const { document } = global;
const nodes = [];

/**
 * Simplified node
 */
class Node {
    constructor(data) {
        Object.assign(this, data);
    }
}

describe('check', () => {
    before(() => {
        global.document = { querySelectorAll: () => nodes };
    });
    afterEach(() => {
        nodes.length = 0;
    });
    after(() => {
        global.document = document;
    });
    it('should retrieve nodes without load attribute', () => {
        nodes.push(
            new Node(),
            new Node(),
            new Node()
        );
        expect(check()).to.have.lengthOf(3);
    });
    it('should skip deferred and async scripts', () => {
        nodes.push(
            new Node(),
            new Node({ async: true }),
            new Node({ defer: true })
        );
        expect(check()).to.have.lengthOf(1);
    });
    it('should skip loaded scripts', () => {
        nodes.push(
            new Node(),
            new Node({ loaded: 1 }),
            new Node({ loaded: 1 })
        );
        expect(check()).to.have.lengthOf(1);
    });
    it('should convert node data to an object', () => {
        nodes.push(
            new Node({ src: 'script.js' })
        );
        const [ { src } ] = check();
        expect(src).to.equal('script.js');
    });
});
