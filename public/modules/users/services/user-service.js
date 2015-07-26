angular.module('bitvagas.users.services')
.service('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {

    this.currentUser = {};

    this.me = function(){
        return $http.get('/me');
    };

    this.updateMe = function(data){
        return $http.post('/me', data);
    };

    this.invite = function(user){
        return $http.post('/invite', user);
    };

    this.verify = function(token){
        return $http.post('/verify', { token: token });
    };

    this.forgot = function(email){
        return $http.post('/forgot', email);
    };

    this.reset = function(data){
        return $http.post('/reset', data);
    };
}
