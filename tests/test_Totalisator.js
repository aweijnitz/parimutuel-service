var assert = require('assert');

const odds = require('odds-converter');
const parimutuel = require('../lib/parimutuel');

describe('Parimutuel', function () {
    describe('Basic Functionality', function () {
        it('Totalisator - Test example payout calculation from Wikipedia', function () {

            // See "Example" at
            // https://en.wikipedia.org/wiki/Parimutuel_betting

            let pool = [
                60.0,
                140.0,
                24.0,
                110.0,
                220.0,
                94.0,
                300.0,
                80.0];
            let outcome = 3; // The winning participant is the 4th one
            let commissonRate = 14.25; // 14.25% commission as take for the organiser/house

            let payoutPerDollar = parimutuel.totalize(pool, outcome, commissonRate);

            assert.equal(payoutPerDollar.toFixed(2), 8.01, "Payout Per Dollar should be 8.01");
        });

        it('Test calculate odds in pool', function () {

            // See "Example" at
            // https://en.wikipedia.org/wiki/Parimutuel_betting

            let pool = [
                60.0,
                140.0,
                24.0,
                110.0,
                220.0,
                94.0,
                300.0,
                80.0];
            let outcome = 3; // The winning participant is the 4th one
            let commissonRate = 14.25; // 14.25% commission as take for the organiser/house
            let poolOdds = parimutuel.calculateOdds(pool, commissonRate);

            assert.equal(poolOdds.oddsDec.length, 8, "Eight odds in pool expected. " + poolOdds);
            assert.equal(poolOdds.oddsDec[outcome], 8.01, "odds at 4th should be 8.01.");
            assert.equal(poolOdds.oddsFractional[outcome], "(7/1)", "odds in fractional should be 7 to 1");
        });

    });
});