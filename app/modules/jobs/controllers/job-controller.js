var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.JOB.findAll().success(function(jobs){
            response.json(jobs);
        });
    },

    create: function(request, response){
        var json = {}
        response.json(json);
    }
};
