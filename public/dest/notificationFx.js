/**
* notificationFx.js v1.0.0
* http://www.codrops.com
*
* Licensed under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 
* Copyright 2014, Codrops
* http://www.codrops.com
*/
;(function(window){

    'use strict';

    var docElem = window.document.documentElement,
    support = { animations : Modernizr.cssanimations },
    animEndEventNames = {
        'WebkitAnimation' : 'webkitAnimationEnd',
        'OAnimation' : 'oAnimationEnd',
        'msAnimation' : 'MSAnimationEnd',
        'animation' : 'animationend'
    },
    // animation end event name
    animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];

    /**
    * extend obj function
    */
    function extend(a, b) {
        for(var key in b)
            if(b.hasOwnProperty(key))
                a[key] = b[key];

        return a;
    }

    /**
    * NotificationFx function
    */
    function NotificationFx(options){
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
        this.show();
    }

    /**
    * NotificationFx options
    */
    NotificationFx.prototype.options = {
        // element to which the notification will be appended
        // defaults to the document.body
        wrapper : document.body,
        // the message
        message : 'yo!',
        // layout type: growl|attached|bar|other
        layout : 'growl',
        // effects for the specified layout:
        // for growl layout: scale|slide|genie|jelly
        // for attached layout: flip|bouncyflip
        // for other layout: boxspinner|cornerexpand|loadingcircle|thumbslider
        // ...
        effect : 'slide',
        // notice, warning, error, success
        // will add class ns-type-warning, ns-type-error or ns-type-success
        type : 'error',
        // if the user doesn´t close the notification then we remove it 
        // after the following time
        ttl : 6000,
        // callbacks
        onClose : function() { return false; },
        onOpen : function() { return false; }
    };

    /**
    * init function
    * initialize and cache some vars
    */
    NotificationFx.prototype._init = function() {
        // create HTML structure
        this.ntf = document.createElement('div');
        this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
        this.ntf.id = 'notification';
        var strinner = '<div class="ns-box-inner">';
        strinner += this.options.message;
        strinner += '</div>';
        strinner += '<span class="ns-close"></span></div>';
        this.ntf.innerHTML = strinner;

        // removes existing notifications
        var e = document.getElementById('notification');
        if(e)
            document.body.removeChild(e);

        // append to body or the element specified in options.wrapper
        this.options.wrapper = document.body;
        this.options.wrapper.insertBefore(this.ntf, this.options.wrapper.firstChild);

        // dismiss after [options.ttl]ms
        var self = this;

        if(this.options.ttl) { // checks to make sure ttl is not set to false in notification initialization
            this.dismissttl = setTimeout(function() {
                if(self.active)
                    self.dismiss();
            }, this.options.ttl);
        }

        // init events
        this._initEvents();
    };

    /**
    * init events
    */
    NotificationFx.prototype._initEvents = function() {
        var self = this;
        // dismiss notification
        this.ntf.querySelector('.ns-close').addEventListener('click', function() { self.dismiss(); });
    };

    /**
    * show the notification
    */
    NotificationFx.prototype.show = function() {
        this.active = true;
        this.ntf.classList.remove('ns-hide');
        this.ntf.classList.add('ns-show');
        if (typeof this.options.onOpen === 'function')
            this.options.onOpen();
    };

    /**
    * dismiss the notification
    */
    NotificationFx.prototype.dismiss = function() {
        var self = this;
        this.active = false;
        clearTimeout(this.dismissttl);
        this.ntf.classList.remove('ns-show');
        setTimeout( function() {
            self.ntf.classList.add('ns-hide');

            // callback
            if (typeof self.options.onClose === 'function')
                self.options.onClose();
        }, 25 );

        // after animation ends remove ntf from the DOM
        var onEndAnimationFn = function(ev) {
            if(support.animations) {
                if(ev.target !== self.ntf) return false;
                this.removeEventListener(animEndEventName, onEndAnimationFn);
            }
            self.options.wrapper.removeChild( this );
        };

        if(support.animations)
            this.ntf.addEventListener(animEndEventName, onEndAnimationFn);
        else
            onEndAnimationFn();
    };

    /**
    * add to global namespace
    */
    window.NotificationFx = NotificationFx;

})(window);
