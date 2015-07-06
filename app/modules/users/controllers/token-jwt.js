var jwt    = require('jwt-simple')
  , config = require(root+'/config/secrets')
  , moment = require('moment');

module.exports = {
    createJWT  : function(user){
        var payload = {
            sub: user
          , iat: moment().unix()
          , exp: moment().add(30, 'days').unix()
        };
        return jwt.encode(payload, config.JWT.TOKEN_SECRET);
    }
    , decode   : function(token){
        return jwt.decode(token, config.JWT.TOKEN_SECRET);
    }
    , verify   : function(exp){
        return exp <= moment().unix();
    }
};
