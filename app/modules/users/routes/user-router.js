var express   = require('express')
  , passport  = require('passport')
  , users     = require('../controllers/user-controller')
  , cv        = require('../controllers/user-cv-controller')
  , stratergy = require('../controllers/passport')
  , router    = express.Router();

router.get('/isAuthenticated', function(request, response){
    if(request.isAuthenticated())
        response.status(200).send(request.user);
    else
        //Unauthorized request
        response.status(401).send(0);
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

router.get('/auth/linkedin', passport.authenticate('linkedin', { state : 'state' }), function(request, response){});

router.get('/auth/linkedin/callback', passport.authenticate('linkedin',
    { successRedirect : '/#/dashboard/profile'
    , failureRedirect : '/auth'
    , failureFlash    : true
    })
);

router.get('/api/cv', cv.getCV);

router.post('/api/cv', cv.getCV);

router.get('/api/users', cv.getFreelancers);

router.get('/api/users/:id', cv.getFreelancerById);

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
    response.render('forgot', { email : request.query.email || '' });
});

router.get('/forgot', function(request, response){
    response.render('forgot', { email : request.query.email || '' });
});

router.get('/reset', function(request, response){
    response.render('reset', { token : request.query.token });
});

router.post('/reset', function(request, response){
    if(request.body.token === undefined)
        return response.render('reset', { message : 'Check your email' });

    users.resetPassword(request, response);
});

module.exports = router;
