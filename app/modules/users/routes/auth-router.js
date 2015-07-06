var passport = require('passport')
  , user     = require('../controllers/user-controller')
  , token    = require('../controllers/token-jwt')
  , strategy = require('../controllers/passport');

module.exports = function(app){

    app.route('/isAuthenticated')
    .get(function(request, response){
        if(request.isAuthenticated())
            response.status(200).send(request.user);
        else
            //Unauthorized request
            response.status(401).send(0);
    });

    app.route('/auth/login')
    .get(function(request, response){
        response.render('auth', { message : 'error' });
    })
    .post(user.findByEmail, function(request, response, next){
        passport.authenticate('signin', { session: false }
        , function(err, user, info){
            if(err || info && info.message)
                return response.status(401).json({ message: info.message });

            response.status(200).json({ token: token.createJWT(user) });
        })(request, response, next);
    });

    app.route('/auth/linkedin')
    .get(passport.authenticate('linkedin', { state : 'state' }), function(request, response){});

    app.route('/auth/linkedin/callback')
    .get(passport.authenticate('linkedin',
        { successRedirect : '/#/dashboard/profile'
        , failureRedirect : '/auth'
        })
    );
};
