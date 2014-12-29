var path     = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env      = process.env.NODE_ENV || 'development'
  , user     = process.env.user     || 'postgres'
  , password = process.env.password || ''
  , PSQLPort = process.env.port     || 5432;

var config = {
  development: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , port     : 3000
    , PSQLPort : PSQLPort
    , username : user
    , password : password
    , db: 'bitvagas_dev'
  },

  test: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , port: 3000
    , PSQLPort : PSQLPort
    , username: user
    , password: password
    , db: 'bitvagas_test'
  },

  production: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , port: 3000
    , PSQLPort : PSQLPort
    , username: user
    , password: password
    , db: 'bitvagas'
  }
};

module.exports = config[env];
