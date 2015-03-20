angular.module('bitvagas.users.services', [])
.service('UserService', UserService);

UserService.$inject = ['$http'];
function UserService($http) {
    var baseUrl = 'api/signup';

    this.current = {}
    this.create = function(user){
        return $http.post(baseUrl, user);
    };

    this.findAll = function(){
        return $http.get('/api/users');
    };

    this.findById = function(id){
        return $http.get('/api/users/'+id);
    };

    this.invite = function(user){
        return $http.post('/invite', user);
    };

    this.auth  = function(user){
        return $http.post("/auth", user);
    };

    this.getCV = function(token){
        console.log(token);
        return $http.post('/api/cv', token);
    };
}
