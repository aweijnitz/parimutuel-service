const odds = require('odds-converter');

/**
 * Calculates the payout per dollar for the winning outcome in a given betting pool.
 * Commission/take of the house is removed before payout calculation.
 *
 * @param poolArray - Array of bets per outcome in the pool. Ex. [110.5, 75.0, 200.1]
 * @param winningOutcome - Index into the array for the winning outcome. Integer between 0 and poolArray.length-1
 * @param houseCommissionInPercent - The take of the house before payout in percent. Ex. 3.0 (for 3%). Defaults to 0%
 * @return payout per dollar for the given outcome
 */
const totalize = function totalize(poolArray, winningOutcome, houseCommissionInPercent = 0) {
    if (poolArray.length <= 1)
        throw new Error("poolArray must have more than one element.");

    if (winningOutcome < 0 || winningOutcome >= poolArray.length)
        throw new RangeError("winning outcome must be in range 0 - poolArray.length - 1. winningOutcome = " + winningOutcome);

    let poolTotal = poolArray.reduce((total, bettedOnPosition) => {
        return total + bettedOnPosition;
    });
    let poolAfterTake = poolTotal * (1 - houseCommissionInPercent / 100);
    return (1000 * (poolAfterTake / poolArray[winningOutcome]) / 1000); // Payout per dollar
};

/**
 * Calculate decimal odds (payout per dollar) for all entries in a betting pool.
 *
 * @param poolArray - Array with amount betted per outcome
 * @param houseCommissionInPercent - The take of the house before payout in percent. Ex. 3.0 (for 3%). Defaults to 0%
 * @return object with two properties, both arrays. poolOddsDec and oddsFractional
 */
const calculateOdds = function calculateOdds(poolArray, houseCommissionInPercent = 0) {
    let poolOddsDec = poolArray.map((amount, i) => {
        return totalize(poolArray, i, houseCommissionInPercent).toFixed(2);
    });
    let oddsFractional = poolOddsDec.map((oddsInDec) => {
        return odds.decimal.toFractional((oddsInDec*1.0).toFixed(0)).simplify().toString();
    });

    return {
        oddsDec: poolOddsDec,
        oddsFractional: oddsFractional
    };
};

exports.totalize = totalize;
exports.calculateOdds = calculateOdds;