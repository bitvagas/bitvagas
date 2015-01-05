var express = require('express')
  , jobs    = require('../controllers/job-controller')
  , router  = express.Router();

router.get('/list', function(request, response){
    jobs.findAll(request,response);
});

router.post('/create', function(request, response){
    jobs.create(request, response);
});

module.exports = router;
