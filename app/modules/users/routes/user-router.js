var passport  = require('passport')
  , user     = require('../controllers/user-controller');

module.exports = function(app){

    app.route('/me')
    .get(user.ensureAuthenticated, user.me);

    app.route('/signup')
    .post(user.findByEmail, user.signup);

    /*
     * Signup an user indirect
     */
    app.route('/invite')
    .post(user.invite);

    app.route('/verify')
    .get(function(request, response){
        if(request.query.token === undefined)
            return response.redirect('/#/signup');

        response.render('verify', { token : request.query.token });
    })
    .post(user.verifyAccount);

    app.route('/forgot')
    .get(function(request, response){
        response.render('forgot', { email : request.query.email || '' });
    })
    .post(user.findByEmail, user.forgotPassword);

    app.route('/reset')
    .get(function(request, response){
        response.render('reset', { token : request.query.token });
    })
    .post(function(request, response){
        if(request.body.token === undefined)
            return response.render('reset', { message : 'Check your email' });

        user.resetPassword(request, response);
    });
};
