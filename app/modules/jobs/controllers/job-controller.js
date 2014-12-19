var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        var json = {}
        response.json(json);
    },

    create: function(request, response){
        var json = {}
        response.json(json);
    }
};
