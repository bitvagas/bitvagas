var express = require('express')
  , org     = require('./org-controller')
  , user    = require('../../users/controllers/user-controller')
  , db      = require(root + '/app/models');

module.exports = {

    findAll: function(request, response){
        console.log('\n\n\n\n');
        console.log(JSON.stringify(request.user));
        db.job.findAll({
            include : [
                db.job_type
              , db.category
              , db.org
            ]
        }).then(function(jobs){
            response.status(200).json(jobs);
        });
    }

    , findById: function(request, response){
        var id = request.params.id;
        db.job.find({
            where   : { id : id }
          , include : [
              db.job_type
            , db.category
            , db.org
          ]
        }).then(function(job){
            response.status(200).json(job);
        });
    }

    , findByUser: function(request, response){

        if(!request.user)
            response.status(403).send("Unauthorized");

        db.job.findAll({
            where   : { USER_ID : request.user.id }
          , include : [
              db.job_type
            , db.category
            , db.org
          ]
        }).then(function(job){
            response.status(200).json(job);
        });
    }

    , create: function(request, response){

        return db.job.create(request.body)
        .then(function(job){
            response.status(201).json(job);
        }).catch(function(error){
            response.status(400).json(error);
        });
    }

    /**
     * Invite an user and insert an organizations and a job.
     */
    , post : function(request, response){
        //begin transaction
        return db.sequelize.transaction(function(t){

            //invite an user
            return user.invite(request, response, t)
            .then(function(user){
                //create an organization
                request.body.USER_ID = user.id;
                //removes ambiguity between organization.name and user.name
                request.body.NAME = request.body.ORG_NAME;
                return db.org.create(request.body,{ transaction : t});
            })
            .then(function(org){
                //create a job
                request.body.ORG_ID = org.id;
                return db.job.create(request.body, { transaction : t});
            }).catch(function(err){
                response.status(400).json(err);
                //throw an error to rollback
                throw new Error(err);
            });

        }).then(function(result){
            //Transaction commited
            user.forgotPassword(request, response);
            return response.status(201).json(result);
        }).catch(function(err){
            //Trasaction rollbacked
            response.status(400).json(err);
        });
    }

    , premium : function(request, response) {

        console.log(JSON.stringify(request.query));
        if(typeof request.query.input_address    === 'undefined' ||
           typeof request.query.transaction_hash === 'undefined' ||
           typeof request.query.value            === 'undefined' ||
           typeof request.params.id              === 'undefined')
           return response.status(400).json("Missing values");

        var premium = true;
        var id = request.params.id;
        var value = request.query.value;
        var input_address = request.query.input_address;
        var transaction = request.query.transaction_hash;

        if(value < parseFloat(process.env.PRICE))
            premium = false;

        db.job.update({ TRANSACTION : transaction
                      , BTC_ADDRESS : input_address
                      , PREMIUM     : premium
                      }, { where    : { id : id } })
        .then(function(job) {
            console.log(JSON.stringify(job));
            response.status(200).json(job);
        }).catch(function(err) {
            console.log(JSON.stringify(err));
            response.status(400).json(err);
        });
    }
};
