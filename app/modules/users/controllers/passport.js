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
        usernameField     : 'email'
      , passwordField     : 'password'
      , passReqToCallback : true
    },
    function(request, username, password, done){

        users.findByEmail(request)
        .success(function(user){

            bcrypt.compare(password, user.PASSWORD, function(err, res){
                console.log("ERROR: "+err+" RES: "+res);
                if(err)
                    return done(null, false, { message: 'Email or Password Invalid'});
                else
                    return done(null, { email: user.EMAIL, name : user.NAME });
            });
        })
        .error(function(err){
            done(err);
        });
    }
));

passport.use('signup', new LocalStrategy(
    {
        usernameField     : 'EMAIL'
      , passwordField     : 'PASSWORD'
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
                    done(err);
                });
            }
        });
}));

