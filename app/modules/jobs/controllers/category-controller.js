var express = require('express')
  , db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.category.findAll().then(function(categories){
            response.json(categories);
        });
    }
}
