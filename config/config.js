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
    username: 'root',
    password: '',
    db: 'BITVAGAS'
  },

  test: {
    root: rootPath,
    app: {
      name: 'bitvagas-com'
    },
    port: 3000,
    username: 'root',
    password: '',
    db: 'BITVAGAS'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'bitvagas-com'
    },
    port: 3000,
    username: 'root',
    password: '',
    db: 'BITVAGAS'
    
  }
};

module.exports = config[env];
