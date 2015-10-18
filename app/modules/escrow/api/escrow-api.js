var express = require('express')
  , escrow  = require('../controllers/escrow-controller')
  , user    = require('../../users/controllers/user-controller')
  , bitcoin = require('../../users/controllers/bitcoin-controller')
  , router  = express.Router();

module.exports = function(app){

    router.route('/escrow')
    .post(user.ensureAuthenticated
        , escrow.create
        , escrow.getBuyerSeller
        , bitcoin.createEscrowWallet
        , bitcoin.getWallet
        , bitcoin.createWebHook
        , escrow.updateEscrow
    );

    router.route('/escrow/verify')
    .post(user.ensureAuthenticated
        , escrow.verifyEscrow);

    router.route('/escrow/callback')
    .post(escrow.buyerPayment);

    router.route('/escrow/:id/sendproduct')
    .post(user.ensureAuthenticated
        , escrow.sendProduct);


    return router;
};
