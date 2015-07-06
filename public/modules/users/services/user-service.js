angular.module('bitvagas.users.services')
.service('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {

    this.currentUser = {};

    this.me = function(){
        return $http.get('/me');
    };

    this.invite = function(user){
        return $http.post('/invite', user);
    };
}
