const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let allUsers = [{ id: 0, name: "a" },{ id: 1, name: "b" },{ id: 2, name: "c" }];
    res.json(allUsers).end();
});

router.get('/:id', function(req, res, next) {
    let user = [{ id: req.params.id, name: "name"+req.params.id }];
    res.json(user).end();
});


module.exports = router;
