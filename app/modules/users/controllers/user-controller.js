var express = require('express')
  , db      = require('../../../models');

module.exports = {

    findByEmail: function(request){
        var email = request.param('email');
        return db.user.find({ where : { EMAIL : email }});
  }

  , create: function(request){
        return db.user.create({ NAME     : request.param('name')
                              , EMAIL    : request.param('email')
                              , PASSWORD : request.param('password')
                              , ADMIN    : false
        });
  }
}
