angular.module('bitvagas.users.controllers', [])
.controller('AuthController', AuthController);

AuthController.$inject = ['$rootScope', '$scope', '$state', '$window', '$auth', 'UserService', 'SweetAlert'];
function AuthController ($rootScope, $scope, $state, $window, $auth, UserService, SweetAlert) {

    $scope.data = {};
    $scope.data.walletEnable = true;

    if($auth.isAuthenticated())
        $state.transitionTo('dashboard.overview');

    $scope.login = function(){
        $auth.login({
            EMAIL: $scope.email
          , PASSWORD: $scope.password
        }).then(function(data){
            $scope.authenticated = true;
            if($window.location.pathname === '/auth/login')
                $window.location.href = '/dashboard/overview';
            else
                $state.reload();
        }).catch(function(err){
            $scope.authenticated = false;
            // if($state.current.name === 'signin')
                // $window.location.href = '/auth/login';
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

    $scope.verify = function(verify){
        UserService.verify(verify).then(function(data){
            setTimeout(function(){
                $state.transitionTo('signin');
            }, 500);
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.forgot = function(){
        UserService.forgot($scope.data).then(function(data){
            setTimeout(function(){
                $state.transitionTo('verify');
            }, 500);
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.reset = function(token){
        $scope.data.token = token;
        UserService.reset($scope.data).then(function(data){
            setTimeout(function(){
                $window.location.href = '/signin';
            }, 500);
        }).catch(function(err){
            console.log(err);
        });
    };

    $scope.error = function(){
        var msg = "";
        if($scope.form.$error.minlength)
            msg = 'Passwords must be at least 8 characters.';

        SweetAlert.swal({
            title: "Errors"
          , type: "error"
          , text: msg
          , confirmButtonColor: "#C1C1C1"
        });
    };
}
