angular.module('bitvagas.users.services', [])
.service('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {
    var baseUrl = 'api/signup';
    this.create = function(user){
        return $http.post(baseUrl, user);
    };
}
