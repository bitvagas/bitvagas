var passport         = require('passport')
  , bcrypt           = require('bcryptjs')
  , LocalStrategy    = require('passport-local').Strategy
  , users            = require('../controllers/user-controller')
  , db               = require(root+'/app/models');

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
            if(user){
              bcrypt.compare(password, user.PASSWORD, function(err, res){
                  if(err || !res)
                      return done(null, false, { message: 'Email or Password Invalid'});
                  else {
                      if(user.USER_STATUS != 3)
                          return done(null, false, { message : 'Verify your account, check your email' })

                      return done(null, user);
                  }
              });
            } else
                return done(null, false, { message: 'Email or Password Invalid'});
        })
        .catch(function(err){
            done(err);
        });
    }
));
