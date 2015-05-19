var express = require('express')
  , db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.category.findAll().then(function(categories){
            response.status(200).json(categories);
        });
    }
};
