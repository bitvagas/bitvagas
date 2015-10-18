var express = require('express')
  , users   = require('../controllers/user-controller')
  , bitcoin = require('../controllers/bitcoin-controller')
  , router  = express.Router();

module.exports = function(app){

    router.route('/market')
    .get(bitcoin.market);

    router.route('/wallets')
    .get(bitcoin.listWallets);

    router.route('/updatewallet')
    .post(users.ensureAuthenticated
        , users.getUser
        , bitcoin.getWallet
        , bitcoin.updateWallet
    );

    router.route('/createwallet')
    .post(users.ensureAuthenticated
        , users.getUser
        , bitcoin.createWallet
        , bitcoin.getWallet
        , bitcoin.walletShare
        , bitcoin.updateWallet
    );

    router.route('/mywallet')
    .post(users.ensureAuthenticated, bitcoin.getWallet, bitcoin.updateWallet);

    return router;
};
