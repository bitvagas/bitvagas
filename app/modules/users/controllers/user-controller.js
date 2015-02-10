var express  = require('express')
  , bcrypt   = require('bcryptjs')
  , crypto   = require('crypto')
  , passport = require('passport')
  , db       = require('../../../models');

module.exports = {

    findByEmail: function(request){
        var email = request.body.EMAIL;
        return db.user.find({
            where   : { EMAIL : email }
          , include : [db.job]
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
                var hashEmail = bcrypt.hashSync(request.body.EMAIL, salt);
                request.body.PASSWORD = hash;
                request.body.TOKEN = hashEmail;
                db.user.create(request.body).then(function(user){

                    user.PASSWORD = undefined;
                    //TODO: Send a email to user.
                    response.json(201, { data : user, token : hashEmail});

                }).catch(function(err){
                    response.json(400, err);
                });
            }
        });
  }

  , invite: function(request, response){
      this.findByEmail(request).then(function(user){
          if(user)
                response.send(400, 'User already exists');
          else{

              crypto.randomBytes(20, function(err, bytes){
                  var user = request.body;
                  var token = bytes.toString('hex');
                  user.RESETTOKEN   = token;
                  user.RESETEXPIRES = Date.now() + 360000;
                  user.PASSWORD = '';
                  //User invited
                  user.USER_STATUS = 1;
                  db.user.create(user).then(function(user){
                      response.json(201, user);
                  }).catch(function(err){
                      response.json(400, err);
                  });
              });
          }
      })
  }

  , verifyAccount: function(request, response){

      var hashedEmail = request.body.token;
      db.user.find({ where : { TOKEN : hashedEmail }})
      .then(function(user){
          return user.update({ USER_STATUS : 3 });
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
}
