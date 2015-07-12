angular.module('bitvagas.users.controllers', [])
.controller('AuthController', AuthController);

AuthController.$inject = ['$rootScope', '$scope', '$state', '$window', '$auth', 'UserService'];
function AuthController ($rootScope, $scope, $state, $window, $auth, UserService) {

    if($auth.isAuthenticated())
        $state.transitionTo('dashboard.overview');

    $scope.login = function(){
        $auth.login({
            EMAIL: $scope.email
          , PASSWORD: $scope.password
        }).then(function(data){
            $scope.authenticated = true;
            $rootScope.$broadcast('update-me');
            $state.reload();
        }).catch(function(err){
            $scope.authenticated = false;
            if($state.current.name === 'signin')
                $window.location.href = '/auth/login';
        });
    };

    $scope.signup = function(user){
        $auth.signup({
            NAME: $scope.NAME
          , EMAIL: $scope.EMAIL
          , PASSWORD: $scope.PASSWORD
          , REPASSWORD: $scope.REPASSWORD
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.verify = function(token){
        UserService.verify(token).then(function(data){
            $window.location.href = '/#/signin';
        }).catch(function(err){
            console.log(err);
        });
    };
}
