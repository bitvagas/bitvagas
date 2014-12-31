var express   = require('express')
  , passport  = require('passport')
  , users     = require('../controllers/user-controller')
  , stratergy = require('../controllers/passport')
  , router    = express.Router();

router.get('/auth', function(request, response){
    response.render('auth', { message : request.flash('error') });
});

router.post('/auth', passport.authenticate('signin',
    { successRedirect : '/#/dashboard'
    , failureRedirect : '/auth'
    , failureFlash    : true
    })
);

router.post('/api/signup', function(request, response, next){
    passport.authenticate('signup', function(err, user, info){

        if(err || info)
            return response.json(405, err || info.message);

        return response.json(user);
    })(request, response, next);
});

module.exports = router;
