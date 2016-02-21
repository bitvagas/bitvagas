angular.module('bitvagas',
    ['ui.router'
    ,'ngAnimate'
    ,'pascalprecht.translate'
    ,'angular-loading-bar'
    ,'720kb.tooltips'
    ,'ngTagsInput'
    ,'satellizer'
    ,'ngSanitize'
    ,'ngLodash'
    ,'ngCookies'
    ,'ngInput'
    ,'angularMoment'
    ,'oitozero.ngSweetAlert'
    ,'hc.marked'
    ,'ja.qr'
    ,'angucomplete-alt'
    ,'bitvagas.main'
    ,'bitvagas.jobs'
    ,'bitvagas.org'
    ,'bitvagas.users'
    ,'bitvagas.dashboard'
    ]).config(["$translateProvider", function($translateProvider){

        //Angular translation configuration
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        })
        .addInterpolation('$translateMessageFormatInterpolation')
        .preferredLanguage('pt-BR')
        .fallbackLanguage(['pt-BR', 'en-US'])
        .useLocalStorage();

        $translateProvider.useMessageFormatInterpolation();

        $translateProvider.useSanitizeValueStrategy('escaped');
    }]).config(["lodash", function(lodash){


        //find selected : true property
        lodash.mixin({ 'selected' : function(array, property){
            return lodash.result(lodash.find(array, { selected : true }), property);
        }});

    }]).config(["$authProvider", "$httpProvider", function($authProvider, $httpProvider){

        $authProvider.loginOnSignup = true;

        $authProvider.loginUrl = '/auth/login';
        $authProvider.loginRedirect = '/dashboard/overview';

        $authProvider.signupUrl = '/signup';
        $authProvider.signupRedirect = '/signup/verify';

        $authProvider.linkedin({
            clientId: '78h4jk2ak53yof'
          , url: '/auth/linkedin/callback'
        });

        $httpProvider.interceptors.push('Interceptor');

    }]).run(["$rootScope", "$state", "$auth", "$window", "$translate", "UserService", function($rootScope, $state, $auth, $window, $translate, UserService){

        $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams){

            // Set title back
            $window.document.title = $translate.instant('layout.head.title');

            if(toState.authenticate) {
                if($auth.isAuthenticated() === false){
                    e.preventDefault();
                    $state.transitionTo('signin');
                }
            }

            if($window.localStorage.getItem('currentUser')      !== null &&
               $window.localStorage.getItem('satellizer_token') !== null)
               $rootScope.currentUser = JSON.parse(decodeURIComponent($window.atob($window.localStorage.currentUser)));
            else
                deleteCurrentUser();
        });

        $rootScope.linkedIn = function(){
            $auth.authenticate('linkedin');
        };

        $window.onload = function() {
            if($rootScope.isAuthenticated())
                $rootScope.updateUser();
        };

        $rootScope.$on('unauthorized', function(){
            $state.transitionTo('signin');
        });

        $rootScope.$on('update-me', function(){
            $rootScope.updateUser();
        });

        $rootScope.logout = function(){
            $auth.logout().then(function(){
                deleteCurrentUser();
            });
        };

        $rootScope.isAuthenticated = function(){
            return $auth.isAuthenticated();
        };

        $rootScope.updateUser = function(){
            UserService.me().then(function(data){
                $window.localStorage.currentUser = $window.btoa(encodeURIComponent(JSON.stringify(data.data)));
                $rootScope.currentUser = data.data;
            });
        };

        function deleteCurrentUser(){
            delete $rootScope.currentUser;
            $window.localStorage.removeItem('currentUser');
        }
    }]);
