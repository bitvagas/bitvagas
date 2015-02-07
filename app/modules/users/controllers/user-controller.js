var express  = require('express')
  , bcrypt   = require('bcryptjs')
  , passport = require('passport')
  , db       = require('../../../models');

module.exports = {

    findByEmail: function(request){
        var email = request.param('EMAIL');
        console.log('EMAIL: '+ email);
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
                var hash = bcrypt.hashSync(request.body.PASSWORD || 'default', salt);
                request.body.PASSWORD = hash;
                db.user.create(request.body).then(function(user){

                    user.PASSWORD = undefined;

                    request.logIn(user, function(err){

                        if(err)
                            response.json(400, err);
                        else
                            response.json(201, user);
                    });
                }).catch(function(err){
                    response.json(400, err);
                });
            }
        });
  }
}
