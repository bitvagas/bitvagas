var express  = require('express')
  , category = require('../controllers/category-controller')
  , router   = express.Router();

router.get('/', function(request, response){
    category.findAll(request, response);
});

module.exports = router;
