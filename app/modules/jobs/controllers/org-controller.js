var express = require('express'),
    db      = require('../../../models');

module.exports = {

    findAll: function(request, response){
        db.org.findAll().then(function(orgs){
            response.json(orgs);
        });
    }

    , findById: function(request, response){

        db.org.findAll({
            where : { id : request.params.OrgID }
        }).then(function(org){
            response.json(org);
        });
    }

    , findByUser: function(request, response){
        db.org.findAll({
            where : { USER_ID : request.user.id  }
        }).then(function(orgs){
            response.json(orgs);
        });
    }

    , create: function(request, response){
        if(request.user === undefined)
            return response.send(401, 'user invalid');

        request.body.USER_ID = request.user.id;
        db.org.create(request.body).then(function(org){
            response.json(org);
        }).catch(function(error){
            response.json(400, error);
        });
    }

    , edit: function(request, response){
        db.org.update(request.body, { where : {
            id : request.params.OrgID
        }}).then(function(org){
            response.json(org);
        }).catch(function(error){
            response.json(400, error);
        });
    }

    , delete: function(request, response){
        db.org.destroy({ where : {
            id : request.params.OrgID
        }}).then(function(){
            return response.send('deleted');
        }).catch(function(error){
            return response.json(400, error);
        });
    }
};
