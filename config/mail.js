var nodemailer = require('nodemailer')
  , smtp       = require('nodemailer-smtp-transport')
  , sendGrid   = require('nodemailer-sendgrid-transport')
  , handleBar  = require('nodemailer-express-handlebars')
  , config     = require('./config');

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

    , sendMail : function(to, subject, template, context){

        var mailOptions = {
            to       : to
          , from     : config.mailer.email
          , subject  : subject
          , template : template
          , context  : context
        };

        var Transport = null;

        if(process.env.NODE_ENV === "development"){
            //Local SMTP configuration
            Transport = nodemailer.createTransport(smtp({
                host    : 'smtp.gmail.com'
              , service : 'Gmail'
              , port    : 465
              , auth    : options.auth
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
