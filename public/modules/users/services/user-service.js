angular.module('bitvagas.users.services')
.service('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {

    this.current = {};
    this.create = function(user){
        return $http.post('/signup', user);
    };

    this.invite = function(user){
        return $http.post('/invite', user);
    };

    this.auth  = function(user){
        return $http.post("/auth", user);
    };
}
