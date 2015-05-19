var secrets  = require(root + '/config/secrets')
  , db       = require(root + '/app/models')
  , Users    = require('./user-controller')
  , lodash   = require('lodash')
  , linkedin = require('node-linkedin')(secrets.linkedIn.clientID
                                      , secrets.linkedIn.clientSecret
                                      , secrets.linkedIn.callbackURL);

module.exports = {

    getFreelancers: function(request, response){
        Users.findAll().then(function(users){
            lodash.forEach(users, function(user){
                user.PASSWORD = undefined;
            });
            response.status(200).json(users);
        });
    }

    , getFreelancerById: function(request, response){
        Users.findById(request.params.id).then(function(user){
            user.PASSWORD = undefined;
            response.status(200).json(user);
        });
    }

    , getCV : function(request, response){
        var token = request.body.token ||
                    request.user.LINKEDIN_TOKEN;

        var data  = linkedin.init(token);
        data.people.me(function(error, profile){
            if(err)
                return response.status(400).json(error || profile);

            response.status(200).json(profile);
        });
    }
};
