var express = require('express'),
    home    = require('../controllers/home'),
    router  = express.Router();

router.get('/', function(request, response){
    home.findAll(request, response);
});

module.exports = router;
