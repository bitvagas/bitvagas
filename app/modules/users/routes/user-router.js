var express = require('express')
  , router  = express.Router();

router.get('/auth', function(request, response){
    response.render('auth');
});
router.get('/auth/signin', function(request, response){
    response.render('auth');
});
router.get('/signup', function(request, response){
    response.render('signup');
});

module.exports = router;
