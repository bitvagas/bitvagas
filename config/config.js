var path     = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env      = process.env.NODE_ENV || 'development'
  , url      = process.env.URL      || 'http://localhost:9000'
  , host     = process.env.host     || 'localhost'
  , database = process.env.database || 'bitvagas_dev'
  , user     = process.env.user     || 'postgres'
  , password = process.env.password || ''
  , PSQLPort = process.env.port     || 5432;

global.root = rootPath;

var config = {
  development: {
    root: rootPath
    , app: {
        name   : 'bitvagas'
    }
    , mailer   : {
        email  : process.env.email
      , username : process.env.email
      , pass     : process.env.mailPass
    }
    , url      : url
    , host     : host
    , port     : 3000
    , PSQLPort : PSQLPort
    , username : user
    , password : password
    , db: 'bitvagas_dev'
  },

  test: {
    root: rootPath
    , app: {
        name   : 'bitvagas'
    }
    , host     : host
    , port     : 3000
    , PSQLPort : PSQLPort
    , username : user
    , password : password
    , db: 'bitvagas_test'
  },

  production: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , mailer     : {
        email    : "noreply@bitvagas.com"
      , username : process.env.SENDGRID_USERNAME
      , pass     : process.env.SENDGRID_PASSWORD
    }
    , url      : url
    , host     : host
    , port     : 3000
    , PSQLPort : PSQLPort
    , username : user
    , password : password
    , db: database
  }
};

module.exports = config[env];
