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

router.post('/signup', passport.authenticate('signup',
    { successRedirect : '/#/dashboard'
    , failureRedirect : '/#/signup'
    , failureFlash    : true
    })
);
module.exports = router;
