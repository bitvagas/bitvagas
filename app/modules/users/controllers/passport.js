var passport         = require('passport')
  , bcrypt           = require('bcryptjs')
  , LocalStrategy    = require('passport-local').Strategy
  , LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
  , users            = require('../controllers/user-controller')
  , secrets          = require(root+'/config/secrets')
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

        if(request.user) {
            var user  = request.user;
            bcrypt.compare(password, user.PASSWORD, function(err, res) {
                if(err || !res)
                    return done(null, false, { message: 'Email or Password Invalid'});
                else {
                    if(user.USER_STATUS != 3)
                        return done(null, false, { message : 'Verify your account, check your email' });

                    user.PASSWORD = undefined;
                    return done(null, user);
                }
            });
        } else
            return done(null, false, { message: 'Email or Password Invalid'});
    }
));

if(process.env.LINKEDIN_ID && process.env.LINKEDIN_SECRET) {
    passport.use(new LinkedInStrategy(secrets.linkedIn, function(request, accessToken, refreshToken, profile, done){
        if(request.user){
            db.user.find({ where : { LINKEDIN_ID : profile.id }}).then(function(user){
                if(user){
                    done(null, false, { message : 'Your account is already connected' });
                } else {
                    users.findById(request.user.id).then(function(user){
                        user.update({
                            HEADLINE       : profile._json.headline
                          , SUMMARY        : profile._json.summary
                          , LOCATION       : profile._json.location.name
                          , PICTURE        : profile._json.pictureUrl
                          , LINKEDIN_ID    : profile.id
                          , LINKEDIN_TOKEN : accessToken
                        }).then(function(user){
                            done(null, user);
                        }).catch(function(err){
                            done(err);
                        });
                    });
                }
            });
        }else
            return done(null, false, { message : 'You need be logged' });
    }));
}
