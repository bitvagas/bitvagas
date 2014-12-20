var express = require('express'),
    home    = require('../controllers/jobs'),
    router  = express.Router();

router.get('/', function(request, response){
    home.findAll(request, response);
});

router.get('/job', function(request, response){
    response.render('job');
});

module.exports = router;
