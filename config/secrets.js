module.exports = {
    JWT : {
        TOKEN_SECRET : process.env.TOKEN_SECRET || 'JWT_SECRET'
    }
    , BITGO: {
        accessToken: process.env.BITGO_SECRET
      , proxy: process.env.FIXIE_URL
      , env: 'prod'
    }
    , linkedIn : {
        clientID          : process.env.LINKEDIN_ID
      , clientSecret      : process.env.LINKEDIN_SECRET
      , callbackURL       : process.env.LINKEDIN_CALLBACK_URL || "http://localhost:9000/auth/linkedin/callback"
      , scope             : ['r_basicprofile', 'r_emailaddress']
    }
};
