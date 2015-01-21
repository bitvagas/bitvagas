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

passport.use('signup', new LocalStrategy(
    {
        usernameField     : 'EMAIL'
      , passwordField     : 'PASSWORD'
      , passReqToCallback : true
    },
    function(request, username, password, done) {

        if(request.body.PASSWORD != request.body.REPASSWORD)
            return done(null, false, { message: 'These passwords don\'t match.'});

        users.findByEmail(request)
        .then(function(user){
            if(user)
                return done(null, false, { message: 'User already exists'});
            else
                return users.create(request);
        }).then(function(user){
                return done(null, { email: user.EMAIL });
        }).catch(function(err){
                done(err);
        });
}));

