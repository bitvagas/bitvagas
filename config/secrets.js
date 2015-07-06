module.exports = {
    JWT : {
        TOKEN_SECRET : process.env.TOKEN_SECRET || 'JWT_SECRET'
    }
    , linkedIn : {
        clientID          : process.env.LINKEDIN_ID
      , clientSecret      : process.env.LINKEDIN_SECRET
      , callbackURL       : process.env.LINKEDIN_CALLBACK_URL || "http://localhost:9000/auth/linkedin/callback"
      , scope             : ['r_basicprofile', 'r_emailaddress']
      , passReqToCallback : true
    }
};
