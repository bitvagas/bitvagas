var express  = require('express')
  , category = require('../controllers/category-controller')
  , router   = express.Router();

module.exports = function(app){

    router.route('/categories')
    .get(category.findAll);

    return router;
};
