var secrets  = require(root + '/config/secrets')
  , db       = require(root + '/app/models')
  , users    = require('./user-controller')
  , lodash   = require('lodash')
  , token    = require('./token-jwt')
  , request  = require('request')
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

    , linkedInCallback: function(req, res){

        if(!req.user)
            return res.status(401).json({ message: 'You need be logged to connect your linkedIn' });

        var accessTokenUrl = 'https://www.linkedin.com/uas/oauth2/accessToken';
        var peopleApiUrl = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-urls::(original),headline,summary,location,public-profile-url)';
        var params = {
            code: req.body.code,
            client_id: req.body.clientId,
            client_secret: secrets.linkedIn.clientSecret,
            redirect_uri: req.body.redirectUri,
            grant_type: 'authorization_code'
        };

        request.post(accessTokenUrl, { form: params, json: true }, function(err, response, body) {

            if (response.statusCode !== 200)
                return res.status(response.statusCode).send({ message: body.error_description });

            // Step 2. Retrieve profile information about the current user.
            var data = linkedin.init(body.access_token);
            data.people.me(function(err, profile){

                db.user.find({ where : { LINKEDIN_ID : profile.id }}).then(function(user){

                    if(req.user.id !== user.id &&
                       req.user.LINKEDIN_ID !== profile.id)
                        return res.status(401).json({ message: 'This account is already connected' });

                    users.findById(req.user.id).then(function(user){
                        user.update({
                              HEADLINE         : profile.headline
                            , SUMMARY          : profile.summary
                            , LOCATION         : profile.location.name
                            , PICTURE          : profile.pictureUrls.values[0] || null
                            , LINKEDIN_PROFILE : profile.publicProfileUrl
                            , LINKEDIN_ID      : profile.id
                            , LINKEDIN_TOKEN   : body.access_token
                        }).then(function(user){
                            res.status(201).json({ token: token.createJWT(user) });
                        }).catch(function(err){
                            res.statsu(400).json({ message: err });
                        });
                    });
                });
            });
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
