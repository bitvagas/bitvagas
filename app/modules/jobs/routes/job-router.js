var express = require('express')
  , jobs    = require('../controllers/job-controller')
  , app     = module.exports = express()
  , router  = express.Router();

router.get('/', function(request, response){
    jobs.findAll(request, response);
});

router.get('/list', function(request, response){
    jobs.findAll(request,response);
});

router.get('/create', function(request, response){
    jobs.create(request, response);
});

module.exports = router;
