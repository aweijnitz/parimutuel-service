const express = require('express');
const router = express.Router();
const moment = require('moment');
const odds = require('odds-converter');


const getOdds = function getodds(id) {
    let oddsDec = 9.38; //8.01;
    return [{id: id, oddsDecimal: oddsDec, oddsFractional: odds.decimal.toFractional(oddsDec.toFixed(1)).simplify().toString() }];
};


/* GET users listing. */
router.get('/', function (req, res, next) {
    let allEvents = [{id: 0, name: "event-a"}, {id: 1, name: "event-b"}, {id: 2, name: "event-c"}];
    res.json(allEvents).end();
});

router.get('/:id', function (req, res, next) {
    let event = [{id: req.params.id, name: "event-" + req.params.id, beginDateTime: moment().format(), odds: []}];
    res.json(event).end();
});


/**
 * Place a bet on an event
 * Each event maintains pools for the following bet types
 *  - Win (Participant to win)
 *  - Place (Participant to either win or place second)
 *
 *  Expected parameters
 *   - Bettor (id)
 *   - Participant (id)
 *   - Type ['win', 'place']
 *   - Amount (amount*1000). Ex. Amount betted: 1.5 -> 1.5*1000 -> 1500
 */
router.post('/:id', function (req, res, next) {
    let event = [{id: req.params.id, name: "event-" + req.params.id, beginDateTime: moment().format(), odds: []}];
    res.json(event).end();
});


router.get('/:id/odds', function (req, res, next) {
    let event = getOdds(req.params.id);
    res.json(event).end();
});

module.exports = router;
