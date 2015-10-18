var BitGoJS    = require('bitgo')
  , secret     = require(root+'/config/secrets')
  , math       = require('bitcoin-math')
  , superagent = require('superagent')
  , bitgo      = {};

require('superagent-proxy')(superagent);

bitgo = new BitGoJS.BitGo({ env: secret.BITGO.env
                          , accessToken: secret.BITGO.accessToken
                          , proxy: secret.BITGO.proxy
                          });

module.exports = {

    market: function(request, response){
        bitgo.market({}, function callback(err, market) {
            response.status(200).json(market);
        });
    }

    , updateWallet: function(request, response){

        if(!request.user)
            return response.status(401).send('Unauthorized');

        if(!request.wallet)
            return response.status(401).send('Unauthorized: Wallet Missing');


        var user = request.user;

        var wallet = request.wallet;

        user.BALANCE   = wallet.balance().toBitcoin();
        user.WALLET_ID = wallet.id();

        user.save().then(function(user){
            response.status(201).json(user);
        }).catch(function(err){
            response.status(400).json(err);
        });
    }

    , createKeyChain: function(request, response){
        var keyChains = bitgo.keychains();
        var keyChain  = keyChains.create();
        response.status(200).json(keyChain);
    }

    , listWallets: function(request, response){
        var wallets = bitgo.wallets();
        wallets.list({limit:30}, function(err, wallets) {
            if(err){
                console.log('Error List');
                console.log(err);
                return response.status(401).json(err);
            }
            console.log(wallets);
            response.status(200).json(wallets);
        });
    }


    , createWallet: function(request, response, next){
        if(!request.user)
            return response.status(401).send('Unauthorized');

        if(request.user.WALLET_ADDRESS)
            return response.status(401).send('Wallet exists');

        // Create a user keychain for backup
        // TODO: Send it by email
        var keyChain = bitgo.keychains().create();

        var wallet = {
            passphrase: request.body.passphrase
          , label: "BitVagas: " + request.user.NAME
          , backupXpub: keyChain.xpub
        };

        return bitgo.wallets().createWalletWithKeychains(wallet)
        .then(function(result) {

            console.log("User keychain encrypted xPrv: "   + result.userKeychain.encryptedXprv);
            console.log("Backup keychain encrypted xPrv: " + result.backupKeychain.encryptedXprv);
            return bitgo.wallets().get({ id: result.wallet.wallet.id });
        }).then(function(wallet){
            request.wallet = wallet;
            next();
        }).catch(function(err){
            return response.status(400).send(err);
        });
    }

    , createEscrowWallet: function(request, response, next){

        if(!request.escrow)
            return response.status(400).send('Escrow not found');

        var buyerKey  = bitgo.keychains().create();
        var sellerKey = bitgo.keychains().create();

        var buyer_password  = request.body.buyer_password;
        var seller_password = request.body.seller_password;

        var options = {
            label: "key buyer"
          , xpub: buyerKey.xpub
          , encryptedXprv: bitgo.encrypt({ password: buyer_password, input: buyerKey.xprv })
        };

        bitgo.keychains().add(options).then(function(keychain){

            var options = {
                label: 'key seller'
              , xpub: sellerKey.xpub
              , encryptedXprv: bitgo.encrypt({ password: seller_password, input: sellerKey.xprv })
            };

            return bitgo.keychains().add(options);
        }).then(function(keychain){

            console.log('Adding BitGo keychain');
            return bitgo.keychains().createBitGo({});
        }).then(function(keychain){

            var data = {
                label: "BitVagas Escrow: " + request.BUYER.NAME + " - " + request.SELLER.NAME
              , m: 2
              , n: 3
              , keychains: [
                  { xpub: buyerKey.xpub  }
                , { xpub: sellerKey.xpub }
                , { xpub: keychain.xpub  }
              ]
            };

            bitgo.wallets().add(data).then(function(wallet){
                console.dir(wallet);
                request.wallet = wallet;
                next();
            }).catch(function(err){
                response.status(400).send(err);
            });
        }).catch(function(err){
            response.status(400).send(err);
        });
    }

    , getWallet: function(request, response, next){
        if(!request.user)
            return response.status(401).send('Missing User');

        var walletId = request.wallet.id() || request.user.WALLET_ID;
        bitgo.wallets().get({ id: walletId })
        .then(function(wallet){
            request.wallet = wallet;
            next();
        }).catch(function(err){
            console.log('Error Getting Wallet');
            console.log(err);
            return response.status(400).send(err);
        });
    }

    , walletShare: function(request, response, next){

        if(!request.wallet)
            return response.status(400).send('Wallet Missing');

        if(!request.user)
            return response.status(400).send('User Missing');

        var shared = {
            email: request.user.EMAIL
          , walletPassphrase: request.body.passphrase
          , permissions: 'view,spend'
          , skipKeychain: false
        };

        request.wallet.shareWallet(shared)
        .then(function(){
            next();
        }).catch(function(err){
            return response.status(400).send(err);
        });
    }


    , createWebHook: function(request, response, next){

        if(!request.wallet)
            return response.status(400).send('Wallet Missing');

        var url = process.env.URL+'/api/escrow/callback';

        request.wallet.addWebhook({ url: url, type: 'transaction'})
        .then(function(){
            next();
        }).catch(function(err){
            console.log(err);
            return response.status(400).send(err);
        });
    }

    , getTxDetails: function(request){
        return bitgo.blockchain().getTransaction({ id: request.body.hash });
    }
};
