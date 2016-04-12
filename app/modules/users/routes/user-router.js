var passport = require('passport')
  , bitcoin  = require('../controllers/bitcoin-controller')
  , user     = require('../controllers/user-controller');

module.exports = function(app){

    app.route('/me')
    .get(user.ensureAuthenticated, user.me)
    .post(user.ensureAuthenticated, user.updateMe);

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
    .post(user.verifyAccount
        // , bitcoin.createWallet
        // , bitcoin.getWallet
        // , bitcoin.walletShare
        // , bitcoin.getAddress
        // , bitcoin.updateWallet
    );

    app.route('/forgot')
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
