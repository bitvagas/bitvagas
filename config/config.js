var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'bitvagas-com'
    },
    port: 3000,
    db: 'mysql://localhost/bitvagas-com-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'bitvagas-com'
    },
    port: 3000,
    db: 'mysql://localhost/bitvagas-com-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'bitvagas-com'
    },
    port: 3000,
    db: 'mysql://localhost/bitvagas-com-production'
    
  }
};

module.exports = config[env];
