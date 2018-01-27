var express = require('express');
var router = express.Router();
var findTemp = require('../lib/helper');

router.get('/gettemp', function(req, res, next){
    var lat = req.query.lat || '51.5';
    var long = req.query.long || '0.12';
    var unit = req.query.unit || 'C';   
    findTemp(lat, long, unit, res);
});

router.post('/gettemp', function(req, res, next){
    var lat = req.body.lat || '51.5';
    var long = req.body.long || '0.12';
    var unit = req.body.unit || 'C';   
    findTemp(lat, long, unit, res);
});

module.exports = router;