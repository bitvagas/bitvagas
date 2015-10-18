var nodemailer = require('nodemailer')
  , smtp       = require('nodemailer-smtp-transport')
  , sendGrid   = require('nodemailer-sendgrid-transport')
  , handleBar  = require('nodemailer-express-handlebars')
  , config     = require('./config')
  , env        = process.env.NODE_ENV;

if(env !== 'test')
    var options = {
        auth : {
            api_user : config.mailer.username
          , api_key  : config.mailer.pass
        }
    };

module.exports = {

    sendWelcome : function(user){

        var subject   = 'Welcome to BitVagas';

        var template = 'welcome';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
        };

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendForgotPassword : function(user){

        var subject = 'Reset your password';

        var template = 'reset';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
          , token : user.RESETTOKEN
          , url   : config.url
        };

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendEmailVerification : function(user){

        var subject = 'Verify your email address';

        var template = 'verify';
        var context  = {
            name  : user.NAME
          , email : user.EMAIL
          , token : user.TOKEN
          , url   : config.url
        };

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendApplierNotification: function(recipient, job, applier, apply){
        var subject  = 'BitVagas | ' + applier.NAME + ' has applied to your job';

        var template = 'applier';
        var context  = {
            applier: applier
          , apply: apply
          , job: job
          , url: config.url
        };

        this.sendMail(recipient, subject, template, context);
    }

    , sendEscrowVerification : function(user){
        var subject = 'You are invited to an escrow';

        var template = 'escrow';
        var context = {
            name  : user.NAME
          , email : user.EMAIL
          , token : user.TOKEN
          , url   : config.url
          , recipient: user.recipient
        };

        this.sendMail(user.EMAIL, subject, template, context);
    }

    , sendMail : function(to, subject, template, context){

        if(env === 'test')
            return;

        var mailOptions = {
            to       : to
          , from     : config.mailer.email
          , subject  : subject
          , template : template
          , context  : context
        };

        var Transport = null;

        if(env === "development"){
            //Local SMTP configuration
            var auth = {
                user : options.auth.api_user
              , pass : options.auth.api_key
            };
            Transport = nodemailer.createTransport(smtp({
                host    : 'smtp.gmail.com'
              , service : 'Gmail'
              , port    : 465
              , auth    : auth
            }));
        } else {
            //SendGrid configuration
            Transport = nodemailer.createTransport(sendGrid(options));
        }

        Transport.use('compile', handleBar({
            viewEngine : 'html'
          , viewPath   : 'app/views/mail-template'
          , extName    : '.html'
        }));

        Transport.sendMail(mailOptions, function(err, info){
            if(err)
                console.log('Error on sending email: ' + JSON.stringify(err));
            else
                console.log('Email sent: '+JSON.stringify(info));
        });
    }
};
