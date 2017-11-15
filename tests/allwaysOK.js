var assert = require('assert');
describe('Verify Mocha Working', function () {
    describe('Should always pass', function () {
        it('Test indexOf()', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
        });
    });
});