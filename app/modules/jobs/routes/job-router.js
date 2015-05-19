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
    request.body.USER_ID = request.user.id;
    jobs.create(request, response);
});

router.post('/post', function(request, response){
    jobs.post(request, response);
});

router.get('/premium/callback', function(request, response){
    jobs.premium(request, response);
});

module.exports = router;
