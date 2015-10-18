var db      = require(root + '/app/models')
  , async   = require('async')
  , math    = require('bitcoin-math')
  , crypto  = require('crypto')
  , bitcoin = require('../../users/controllers/bitcoin-controller')
  , _       = require('lodash')
  , mailer  = require(root + '/config/mail');

var STATUS = {
    PENDING:   1
  , WAITINGPAYMENT: 2
  , WAITINGPRODUCT: 3
  , WAITINGBUYERSIGN: 4
  , WAITINGSELLERSIGN: 5
  , COMPLETE: 6
  , DISPUTED: 7
  , DISPUTEDWAITINGOWNER: 8
};

module.exports = {

    updateEscrow: function(request, response){
        if(!request.user)
            return response.status(401).send('Unauthorized');

        if(!request.wallet)
            return response.status(401).send('Unauthorized: Wallet Missing');

        var user = request.user;
        var escrow = request.escrow;

        var wallet = request.wallet;

        escrow.WALLET_ID = wallet.id();
        escrow.save().then(function(escrow){
            response.status(201).json(escrow);
        }).catch(function(err){
            response.status(400).json(err);
        });
    }

    , create: function(request, response, next){

        if(!request.user)
            return response.status(401).send('Unauthorized');

        var escrow = request.body;
        escrow.STATUS = STATUS.PENDING;

        if(escrow.initBuyer){
            escrow.BUYER  = request.user.id;
            escrow.SELLER = request.body.partnerId;
        }
        if(!escrow.initBuyer) {
            escrow.SELLER = request.user.id;
            escrow.BUYER  = request.body.partnerId;
        }

        crypto.randomBytes(20, function(err, bytes){
            escrow.TOKEN = bytes.toString('hex');
            escrow.VALUE_SATOSHI = escrow.VALUE_BTC.toSatoshi();
            db.escrow.create(escrow).then(function(escrow){
                request.escrow = escrow;
                next();
            }).catch(function(err){
                console.log('Error Escrow');
                console.log(err);
                response.status(400).json(err);
            });
        });
    }

    , verifyEscrow: function(request, response, next){
        var hashedEscrow = request.body.token;

        db.escrow.find({ where : { TOKEN : hashedEscrow }})
        .then(function(escrow){
            return escrow.update({ TOKEN: null, STATUS : STATUS.WAITINGPAYMENT });
        }).then(function(escrow){
            response.status(201).json({ message: 'Escrow Initialized', escrow: escrow });
        }).catch(function(err){
            response.status(400).json(err);
        });
    }

    /*
     * Callback from bitgo
     */
    , buyerPayment: function(request, response){
        bitcoin.getTxDetails(request).then(function(tx){

            async.each(tx.outputs, function(output, callback){
                console.log(output.account);
                db.escrow.find({ where: { WALLET_ID: output.account }})
                .then(function(escrow){
                    if(escrow){

                        db.escrow_notification.find({ where: { TX_ID: request.body.hash }})
                        .then(function(notifications){
                            if(!notifications){
                                // New notification
                                escrow.increment({ VALUE_PAID: output.value }).then(function(escrow){
                                    var notification = {
                                        TX_ID: request.body.hash
                                      , ESCROW_ID: escrow.id
                                      , TITLE: 'BUYER PAYMENT'
                                      , DESCRIPTION: ''
                                      , STATUS: STATUS.WAITINGPRODUCT
                                    };

                                    return db.escrow_notification.create(notification);
                                }).then(function(){
                                    callback();
                                }).catch(function(err){
                                    callback(err);
                                });
                            } else {
                                callback('TX Already exists');
                            }
                        }).catch(function(err){
                            console.log(err);
                            callback(err);
                        });
                    } else {
                        callback();
                    }
                }).catch(function(err){
                    console.log(err);
                    callback(err);
                });
            }, function(err){
                if(err)
                    return response.status(400).json(err);

                response.status(200).send('OK');
            });

        }).catch(function(err){
            response.status(400).json(err);
        });
    }

    /*
     * TODO
     */
    , sendProduct: function(request, response, next){
    }

    /*
     * TODO
     */
    , transferEscrow: function(request, response, next){
    }

    /*
     * TODO
     */
    , initDispute: function(request, response, next){
    }

    , getBuyerSeller: function(request, response, next){

        db.user.findById(request.escrow.BUYER).then(function(buyer){
            request.BUYER = buyer;
            return db.user.findById(request.escrow.SELLER);
        }).then(function(seller){
            request.SELLER = seller;
            next();
        }).catch(function(err){
            console.log(err);
            response.status(400).send(err);
        });
    }

    /*
     * TODO
     */
    , getEscrow: function(request, response, next, id){

    }
};
