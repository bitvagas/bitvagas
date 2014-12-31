var passport      = require('passport')
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
        usernameField     : 'email'
      , passwordField     : 'password'
      , passReqToCallback : true
    },
    function(request, username, password, done){

        users.findByEmail(request)
        .success(function(user){

            if(!user || user.PASSWORD != password)
                return done(null, false, { message: 'Email or Password Invalid'});

            return done(null, { email: user.EMAIL });

        })
        .error(function(err){
            console.log('error: '+err);
            done(err);
        });
    }
));

passport.use('signup', new LocalStrategy(
    {
        usernameField     : 'email'
      , passwordField     : 'password'
      , passReqToCallback : true
    },
    function(request, username, password, done) {
        users.findByEmail(request)
        .success(function(user){
            if(user)
                return done(null, false, { message: 'User already exists'});
            else{
                users.create(request).success(function(user){
                    return done(null, { email: user.EMAIL });
                }).error(function(err) {
                    console.log('error: '+err);
                    done(err);
                });
            }
        });
}));

