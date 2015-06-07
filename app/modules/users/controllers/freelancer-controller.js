var secrets  = require(root + '/config/secrets')
  , db       = require(root + '/app/models')
  , Users    = require('./user-controller')
  , lodash   = require('lodash')
  , linkedin = require('node-linkedin')(secrets.linkedIn.clientID
                                      , secrets.linkedIn.clientSecret
                                      , secrets.linkedIn.callbackURL);

module.exports = {

    list: function(request, response){
        db.user.findAll({ where: { LINKEDIN_ID: { $ne: null }}}).then(function(users){
            lodash.forEach(users, function(user){
                user.PASSWORD = undefined;
            });
            response.status(200).json(users);
        });
    }

    , read: function(request, response){
        var freelancer = request.freelancer;
        freelancer.PASSWORD = undefined;
        response.status(200).json(freelancer);
    }

    , getCV : function(request, response){
        var token = request.body.token ||
                    request.user.LINKEDIN_TOKEN;

        var data  = linkedin.init(token);
        data.people.me(function(error, profile){
            if(error)
                return response.status(400).json(error || profile);

            response.status(200).json(profile);
        });
    }

    /*
     * Middleware for freelancer (user) id
     */
    , getFreelancerById: function(request, response, next, id){
        db.user.find({ where : { id : id }}).then(function(user){
            if(!user) response.status(404).json({ error : 'Freelancer not found' });

            request.freelancer = user;
            next();
        }).catch(function(err){
            next(err);
        });
    }
};
