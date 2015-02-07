var passport      = require('passport')
  , bcrypt        = require('bcryptjs')
  , LocalStrategy = require('passport-local').Strategy
  , users         = require('../controllers/user-controller')
  , db            = require('../../../models');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use('signin', new LocalStrategy(
    {
        usernameField     : 'EMAIL'
      , passwordField     : 'PASSWORD'
      , passReqToCallback : true
    },
    function(request, username, password, done){

        users.findByEmail(request)
        .then(function(user){

            bcrypt.compare(password, user.PASSWORD, function(err, res){
                if(err || !res)
                    return done(null, false, { message: 'Email or Password Invalid'});
                else
                    return done(null, user);
            });
        })
        .catch(function(err){
            done(err);
        });
    }
));
