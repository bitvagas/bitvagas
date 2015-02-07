var express   = require('express')
  , passport  = require('passport')
  , users     = require('../controllers/user-controller')
  , stratergy = require('../controllers/passport')
  , router    = express.Router();

router.get('/isAuthenticated', function(request, response){
    response.send(request.isAuthenticated() ? request.user : 0);
});

router.get('/auth', function(request, response){
    response.render('auth', { message : request.flash('error') });
});

router.post('/auth', passport.authenticate('signin',
    { successRedirect : '/#/dashboard/overview'
    , failureRedirect : '/auth'
    , failureFlash    : true
    })
);

router.post('/api/signup', function(request, response){
    users.signup(request, response);
});

module.exports = router;
