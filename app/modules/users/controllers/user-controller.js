var express  = require('express')
  , bcrypt   = require('bcryptjs')
  , crypto   = require('crypto')
  , passport = require('passport')
  , mailer   = require(root + '/config/mail')
  , db       = require(root + '/app/models');

module.exports = {

    findById : function(id){
        return db.user.find({
            where   : { id : id }
          , include : [{ model : db.job, include : [db.job_type] }]
        });
  }

  , findByEmail: function(request){
        var email = request.body.EMAIL;
        return db.user.find({
            where   : { EMAIL : email }
          , include : [{ model : db.job, include : [db.job_type] }]
          });
  }

  , signup: function(request, response, next){

        if(request.body.PASSWORD != request.body.REPASSWORD)
             response.send(400, 'These passwords don\'t match.');

        this.findByEmail(request).then(function(user){
            if(user)
                response.send(400, 'User already exists');
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
                    response.json(201, { data : user, token : hashEmail });

                }).catch(function(err){
                    response.json(400, err);
                });
            }
        });
  }

  /*
   * Signup an user indirect just by your email, and send a password reset
   */
  , invite: function(request, response, t){

      return this.findByEmail(request).then(function(user){
          if(user)
              response.send(400, 'User already exists');
          else {
              request.body.USER_STATUS = 1; //User invited
              request.body.PASSWORD = '';
              //Create User
              return db.user.create(request.body, { transaction : t });
          }
      });
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

          request.logIn(user, function(err){
              if(err)
                  response.json(400, err);
              else
                  response.redirect('/#/dashboard/overview');
          });
      })
      .catch(function(err){
          response.json(400, err);
      });
  }

  /*
   * Generate a token for reset password
   * Expire after 1 hour.
   */
  , forgotPassword: function(request, response){

      this.findByEmail(request).then(function(user){
          crypto.randomBytes(20, function(err, bytes){
              var token = bytes.toString('hex');

              user.update({
                  RESETTOKEN   : token
                , RESETEXPIRES : Date.now() + 3600000
              }).then(function(user){
                  //Send link to email to reset password
                  mailer.sendForgotPassword(user);
                  response.render('index');
              }).catch(function(err){
                  response.render('forgot', { message : err });
              })
          })
      })
  }

  /*
   * Check if token is not expired and update password user.
   * If expired generate another token.
   */
  , resetPassword: function(request, response){
      db.user.find({ where : { RESETTOKEN : request.body.token }})
      .then(function(user){

          if(user.RESETEXPIRES > Date.now()){

              if(request.body.PASSWORD != request.body.REPASSWORD)
                  return response.render('reset', { message : 'These passwords don\'t match.' });

              var salt = bcrypt.genSaltSync(4);
              var hash = bcrypt.hashSync(request.body.PASSWORD, salt);
              user.PASSWORD = hash;
              user.update({ PASSWORD : hash, USER_STATUS : 3 });
              response.render('auth');
          }else{
              //Token Expired
              //keep email on request
              request.body.EMAIL = user.EMAIL;
              //Generate another token.
              this.forgotPassword(request, response);
          }
      });
  }
}
