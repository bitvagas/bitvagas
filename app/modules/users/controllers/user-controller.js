var express = require('express')
  , bcrypt  = require('bcryptjs')
  , db      = require('../../../models');

module.exports = {

    findByEmail: function(request){
        var email = request.param('email');
        return db.user.find({ where : { EMAIL : email }});
  }

  , create: function(request){

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(request.body.PASSWORD, salt);
        request.body.PASSWORD = hash;
        return db.user.create(request.body);
  }
}
