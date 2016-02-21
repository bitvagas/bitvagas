var express   = require('express')
  , bitcore   = require('bitcore')
  , Sequelize = require('sequelize')
  , org       = require('./org-controller')
  , user      = require('../../users/controllers/user-controller')
  , db        = require(root + '/app/models')
  , includes  = [
      db.job_type
    , { model: db.job_apply, attributes: ['createdAt'] }
    , db.category
    , db.org
  ];

module.exports = {

    findAll: function(request, response){
        db.job.findAll({ include : includes
                       , where: { ACTIVE: true }
                       , order: '"createdAt" DESC'
        }).then(function(jobs){
            response.status(200).json(jobs);
        });
    }

    , read: function(request, response){
        response.status(200).json(request.job);
    }

    , create: function(request, response){
        request.body.USER_ID = request.user.id;
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
                request.user = user;
                request.body.USER_ID = user.id;
                //removes ambiguity between organization.name and user.name
                request.body.NAME = request.body.ORG_NAME;
                return db.org.create(request.body,{ transaction : t});
            }).then(function(org){
                //create a job
                request.body.ORG_ID = org.id;
                request.body.LOCATION = request.body.JOB_LOCATION;
                return db.job.create(request.body, { transaction : t});
            }).catch(function(err){
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

    , active: function(request, response){
        if(!request.job)
            return response.status(401).send('errorMessage.job.not.found');

        var job = request.job;

        job.ACTIVE = request.body.ACTIVE;
        job.save().then(function(job){
            response.status(201).json(job);
        }).catch(function(err){
            response.status(401).json(err);
        });
    }

    , premium : function(request, response) {

        //Job ID
        var id = request.body.order.custom;
        var transaction = request.body.order.transaction.hash;
        var input_address = request.body.order.receive_address;

        //Units BTC
        var valueBTC = new bitcore.Unit.fromSatoshis(request.body.order.total_btc.cents).BTC;

        db.job.find({ where : { id : id }}).then(function(job){

            db.job_transaction.create({
                BTC_ADDRESS : input_address
              , TRANSACTION : transaction
              , VALUE       : valueBTC
              , JOB_ID      : id
            }).then(function(transaction){
                return job.update({ PREMIUM : true });
            }).then(function(job){
                response.status(201).json(job);
            }).catch(function(err){
                response.status(400).json(err);
            });
        });
    }

    /*
     * Middleware job for id parameter
     */
    , findById : function(request, response, next, id){
        db.job.findOne({
            where   : { id : id }
          , include : includes
        }).then(function(job){
            if(!job)
                response.status(400).json({ message : "errorMessage.job.not.found" });

            request.job = job;
            next();
        }).catch(function(err){
            next(err);
        });
    }

    /*
     * Middleware job for title querys tring
     */
    , findByTitle : function(request, response, next, title){
        db.job.findOne({
          where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('TITLE')),
                                 Sequelize.fn('lower', title))
          , include : includes
        }).then(function(job){
            if(!job)
                response.status(400).json({ message : "errorMessage.job.not.found" });

            request.job = job;
            next();
        }).catch(function(err){
            next(err);
        });
    }
};
