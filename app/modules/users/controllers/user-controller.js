var express  = require('express')
  , bcrypt   = require('bcryptjs')
  , crypto   = require('crypto')
  , passport = require('passport')
  , mailer   = require(root + '/config/mail')
  , token    = require('./token-jwt')
  , db       = require(root + '/app/models')
  , includes = [
        { model : db.job, include : [
            { model: db.job_type }
          , { model: db.job_apply, include: [{ model: db.user, attributes: ['LOCATION', 'PICTURE', 'LINKEDIN_PROFILE'] }] }
          ]
        }
      , { model : db.org }
      , { model : db.job_apply, include: [db.job] }
  ];

module.exports = {

    findById : function(id){
        return db.user.find({
            where   : { id : id }
          , include : includes
          });
  }

  , me: function(request, response){

        if(!request.user)
            return response.status(401).send('User has not found');

        db.user.findById(request.user.id , { include : includes })
        .then(function(user){
            user.PASSWORD = undefined;
            response.status(200).json(user);
        });
  }

  , updateMe: function(request, response){
      if(!request.user)
          return response.status(401).send('User has not found');

      db.user.findOne({
          where : { id : request.user.id }
      }).then(function(user){

          user.NAME = request.body.NAME;
          user.LOCATION = request.body.LOCATION;
          user.NOTIFY_JOBS = request.body.NOTIFY_JOBS;
          user.NOTIFY_APPLIES = request.body.NOTIFY_APPLIES;

          user.save().then(function(user){
              user.PASSWORD = undefined;
              response.status(201).json(user);
          }).catch(function(err){
              response.status(400).json({ error: err });
          });
      });
  }

  , signup: function(request, response, next){

        if(request.body.PASSWORD != request.body.REPASSWORD)
             response.status(400).send('These passwords don\'t match.');

        if(request.user)
            response.status(400).send('User already exists');
        else {

            var salt = bcrypt.genSaltSync(4);
            var hash = bcrypt.hashSync(request.body.PASSWORD, salt);

            //Define a token for email verification
            var hashEmail = bcrypt.hashSync(request.body.EMAIL, salt);
            request.body.PASSWORD = hash;
            request.body.TOKEN = hashEmail;
            db.user.create(request.body).then(function(user){

                user.PASSWORD = undefined;
                //Send Welcome Message to user by email :D
                mailer.sendWelcome(user);
                //Send a link to email to verification
                mailer.sendEmailVerification(user);
                response.status(200).json({ data : user, token : token.createJWT(user) });

            }).catch(function(error){
                response.status(400).json(error);
            });
        }
  }

  /*
   * Signup an user indirect just by your email, and send a password reset
   */
  , invite: function(request, response, t){

      if(request.user)
          response.status(400).send('User already exists');
      else {
          request.body.USER_STATUS = 1; //User invited
          request.body.PASSWORD = '';
          //Create User
          return db.user.create(request.body, { transaction : t });
      }
  }

  /*
   * Verify an user account after receive an email to confirmation
   */
  , verifyAccount: function(request, response){

      var hashedEmail = request.body.token;
      db.user.find({ where : { TOKEN : hashedEmail }})
      .then(function(user){
          return user.update({ USER_STATUS : 3, TOKEN : null });
      })
      .then(function(user){
          response.status(201).json({ message: 'verified', USER_STATUS: user.USER_STATUS });
      })
      .catch(function(err){
          response.status(400).json(err);
      });
  }

  /*
   * Generate a token for reset password
   * Expire after 1 hour.
   */
  , forgotPassword: function(request, response){
      if(request.user) {
          crypto.randomBytes(20, function(err, bytes){
              var token = bytes.toString('hex');

              request.user.update({
                  RESETTOKEN   : token
                , RESETEXPIRES : Date.now() + 3600000
              }).then(function(user){
                  //Send link to email to reset password
                  mailer.sendForgotPassword(user);
                  response.status(200).json({ message: 'A link has been send to your email' });
              }).catch(function(err){
                  response.status(400).json({ message : err });
              });
          });
      }
  }

  /*
   * Check if token is not expired and update password user.
   * If expired generate another token.
   */
  , resetPassword: function(request, response){
      db.user.find({ where : { RESETTOKEN : request.body.token }})
      .then(function(user){

          if(user.RESETEXPIRES > Date.now()){

              if(request.body.PASSWORD !== request.body.REPASSWORD)
                  return response.status(400).json({ message : 'These passwords don\'t match.' });

              var salt = bcrypt.genSaltSync(4);
              var hash = bcrypt.hashSync(request.body.PASSWORD, salt);
              user.PASSWORD = hash;
              user.update({ PASSWORD     : hash
                          , USER_STATUS  : 3
                          , RESETTOKEN   : null
                          , RESETEXPIRES : null
              });
              response.status(200).send('Password Changed');
          } else {
              //Token Expired
              response.status(400).json({ message: 'Token Expired', email: user.EMAIL });
          }
      });
  }

    /*
     * Middleware for catch email o request body
     */
  , findByEmail: function(request, response, next){
      if(!request.body.EMAIL)
          response.status(404).json({ error: 'Missing email'});

      db.user.find({
          where: { EMAIL : request.body.EMAIL }
        }).then(function(user){
          request.user = user || undefined;
          next();
      }).catch(function(err){
          next(err);
      });
  }

  /*
   * Middleware for ensure authentication token
   */
  , ensureAuthenticated: function(request, response, next){
      if(!request.headers.authorization)
          return response.status(401).json({ message: 'Missing Authorization header' });

      var headerToken = request.headers.authorization.split(' ')[1];

      var payload = null;

      try {
          payload = token.decode(headerToken);
      } catch(err) {
          console.log(err);
          return response.status(401).json({ message: err.message, destroy: true });
      }

      if(token.verify(payload.exp))
          return response.status(401).send({ message: 'Token has expired' });

      if(payload.sub.USER_STATUS !== 3 &&
         payload.sub.USER_STATUS !== 4)
          return response.status(401).send({ message: 'Verify your account, check your email' });

      request.user = payload.sub;
      next();
  }

  /*
   * Middleware to check authentication optionally
   */
  , checkAuthentication: function(request, response, next){
      if(request.headers.authorization) {
          var headerToken = request.headers.authorization.split(' ')[1];

          var payload = null;

          try {
              payload = token.decode(headerToken);
          } catch(err){
              next();
          }

          if(payload.sub.USER_STATUS !== 3 &&
             payload.sub.USER_STATUS !== 4)
             next();

          request.user = payload.sub;
          next();

      } else next();
  }
};
