module.exports = {
    linkedIn : {
        clientID          : process.env.LINKEDIN_ID
      , clientSecret      : process.env.LINKEDIN_SECRET
      , callbackURL       : process.env.LINKEDIN_CALLBACK_URL || "http://localhost:9000/auth/linkedin/callback"
      , scope             : ['r_fullprofile', 'r_emailaddress']
      , passReqToCallback : true
    }
};
