import chai from 'chai';
import { code, message } from './index.js';

const { expect } = chai;

describe('consts', () => {
    Object.entries({ code, message }).forEach(
        ([ name, value ]) => it(`should have a non-empty string value for ${name}`, () => {
            expect(value).to.be.a('string');
            expect(value).to.have.lengthOf.at.least(1);
        })
    );
});
