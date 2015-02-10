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

/*
 * Signup an user indirect
 */
router.post('/invite', function(request, response){
    users.invite(request, response);
});

router.get('/verify', function(request, response){
    if(request.query.token === undefined)
        return response.redirect('/#/signup');

    response.render('verify', { token : request.query.token });
});

router.post('/verify', function(request, response){
    users.verifyAccount(request, response);
});

router.get('/forgot', function(request, response){
    response.render('forgot', { email : request.params.email || '' });
});

router.get('/reset', function(request, response){
    response.render('reset');
});

module.exports = router;
