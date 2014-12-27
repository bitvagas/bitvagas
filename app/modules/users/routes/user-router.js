var express   = require('express')
  , passport  = require('passport')
  , stratergy = require('../controllers/passport')
  , router    = express.Router();

router.get('/auth', function(request, response){
    response.render('auth', { message : request.flash('error') });
});

router.post('/auth', passport.authenticate('signin',
    { successRedirect : '/'
    , failureRedirect : '/auth'
    , failureFlash    : true
    })
);

module.exports = router;
