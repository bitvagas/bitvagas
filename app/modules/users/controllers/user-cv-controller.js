var secrets  = require(root + '/config/secrets')
  , linkedin = require('node-linkedin')(secrets.linkedIn.clientID
                                      , secrets.linkedIn.clientSecret
                                      , secrets.linkedIn.callbackURL);

module.exports = {

    getCV : function(request, response){
        var token = request.user.LINKEDIN_TOKEN;
        var data  = linkedin.init(token);
        data.people.me(function(err, profile){
            if(err)
                return response.json(400, err || profile);

            response.json(profile);
        });
    }
};
