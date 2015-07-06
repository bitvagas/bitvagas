angular.module('bitvagas',
    ['ui.router'
    ,'pascalprecht.translate'
    ,'satellizer'
    ,'ngLodash'
    ,'ngCookies'
    ,'bitvagas.main'
    ,'bitvagas.jobs'
    ,'bitvagas.org'
    ,'bitvagas.users'
    ,'bitvagas.admin'
    ]).config(function($translateProvider){
        //Angular translation configuration
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        })
        .preferredLanguage('en')
        .fallbackLanguage(['pt', 'en'])
        .useLocalStorage();

        $translateProvider.useSanitizeValueStrategy('escaped');
    }).config(function(lodash){

        //find selected : true property
        lodash.mixin({ 'selected' : function(array, property){
            return lodash.result(lodash.find(array, { selected : true }), property);
        }});

    }).config(function($authProvider, $httpProvider){

        $authProvider.loginUrl = '/auth/login';
        $authProvider.loginRedirect = '/dashboard/overview';

        $authProvider.signupUrl = '/signup';
        $authProvider.signupRedirect = '/login';

        $httpProvider.interceptors.push('Interceptor');

    }).run(function($rootScope, $state, $auth, $window, UserService){

        $rootScope.$on("$stateChangeStart", function(e, toState, toParams, fromState, fromParams){
            if(toState.authenticate) {
                if($auth.isAuthenticated() === false){
                    e.preventDefault();
                    $state.transitionTo('signin');
                }
            }

            if($window.localStorage.getItem('currentUser')      !== null &&
               $window.localStorage.getItem('satellizer_token') !== null)
               $rootScope.currentUser = JSON.parse($window.atob($window.localStorage.currentUser));
            else
                deleteCurrentUser();
        });

        $window.onload = function() {
            if($rootScope.isAuthenticated())
                updateUser();
        };

        $rootScope.$on('unauthorize', function(){
            $state.transitionTo('signin');
        });

        $rootScope.$on('update-me', function(){
            updateUser();
        });

        $rootScope.logout = function(){
            $auth.logout().then(function(){
                deleteCurrentUser();
            });
        };

        $rootScope.isAuthenticated = function(){
            return $auth.isAuthenticated();
        };

        function updateUser(){
            UserService.me().then(function(data){
                $window.localStorage.currentUser = $window.btoa(JSON.stringify(data.data));
                $rootScope.currentUser = data.data;
            });
        }

        function deleteCurrentUser(){
            delete $rootScope.currentUser;
            $window.localStorage.removeItem('currentUser');
        }
    });
