var passport         = require('passport')
  , bcrypt           = require('bcryptjs')
  , LocalStrategy    = require('passport-local').Strategy
  , LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
  , users            = require('../controllers/user-controller')
  , secrets          = require(root+'/config/secrets')
  , db               = require(root+'/app/models');

passport.use('signin', new LocalStrategy(
    {
        usernameField     : 'EMAIL'
      , passwordField     : 'PASSWORD'
      , passReqToCallback : true
    },
    function(request, username, password, done){

        if(request.user) {
            var user  = request.user;
            bcrypt.compare(password, user.PASSWORD, function(err, res) {
                if(err || !res)
                    return done(null, false, { message: 'errorMessage.email.password.invalid' });
                else {

                    user.PASSWORD = undefined;
                    user.LINKEDIN_TOKEN = undefined;
                    return done(null, user);
                }
            });
        } else
            return done(null, false, { message: 'errorMessage.email.password.invalid'});
    }
));
