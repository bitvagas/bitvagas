var express = require('express')
  , jobs    = require('../controllers/job-controller')
  , router  = express.Router();

router.get('/', function(request, response){
    jobs.findAll(request,response);
});

router.get('/:id', function(request, response){
    jobs.findById(request, response);
});

router.post('/', function(request, response){
    jobs.create(request, response);
});

router.post('/post', function(request, response){
    jobs.post(request, response);
});

module.exports = router;
