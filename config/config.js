var path     = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env      = process.env.NODE_ENV || 'development'
  , user     = process.env.user     || 'postgres'
  , password = process.env.password || '';

var config = {
  development: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , port: 3000
    , username: user
    , password: password
    , db: 'bitvagas'
  },

  test: {
    root: rootPath
    , app: {
        name: 'bitvagas'
    }
    , port: 3000
    , username: user
    , password: password
    , db: 'bitvagas'
  },

  production: {
    root: rootPath
    , app: {
        name: 'bitvagas-com'
    }
    , port: 3000
    , username: user
    , password: password
    , db: 'bitvagas'
  }
};

module.exports = config[env];
