var passport = require('passport')
  , user     = require('../controllers/user-controller')
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

    app.route('/auth')
    .get(function(request, response){
        response.render('auth', { message : request.flash('error') });
    })
    .post(user.findByEmail, passport.authenticate('signin',
        { successRedirect : '/#/dashboard/overview'
        , failureRedirect : '/auth'
        , failureFlash    : true
        })
    );

    app.route('/auth/linkedin')
    .get(passport.authenticate('linkedin', { state : 'state' }), function(request, response){});

    app.route('/auth/linkedin/callback')
    .get(passport.authenticate('linkedin',
        { successRedirect : '/#/dashboard/profile'
        , failureRedirect : '/auth'
        , failureFlash    : true
        })
    );
};
