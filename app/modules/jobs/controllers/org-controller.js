var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.org.findAll().then(function(orgs){
            response.status(200).json(orgs);
        });
    }

    , findById: function(request, response){

        db.org.findAll({
            where : { id : request.params.OrgID }
        }).then(function(org){
            response.status(200).json(org);
        });
    }

    , findByUser: function(request, response){
        db.org.findAll({
            where : { USER_ID : request.user.id  }
        }).then(function(orgs){
            response.status(200).json(orgs);
        });
    }

    , create: function(request, response, t){
        if(request.user === undefined)
            return response.send(401, 'user invalid');

        request.body.USER_ID = request.user.id;
        db.org.create(request.body, { transaction : t}).then(function(org){
            response.status(201).json(org);
        }).catch(function(error){
            response.status(400).json(error);
        });
    }

    , edit: function(request, response){
        db.org.update(request.body, { where : {
            id : request.params.OrgID
        }}).then(function(org){
            response.status(200).json(org);
        }).catch(function(error){
            response.status(400).json(error);
        });
    }

    , delete: function(request, response){
        db.org.destroy({ where : {
            id : request.params.OrgID
        }}).then(function(){
            return response.status(200).send('deleted');
        }).catch(function(error){
            return response.status(400).json(error);
        });
    }
};
