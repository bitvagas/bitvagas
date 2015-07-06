angular.module('bitvagas.org.services', [])
.service('OrgService', OrgService);

OrgService.$inject = ['$http'];
function OrgService($http){
    var baseUrl = 'api/organizations/';

    this.findAll = function(){
        return $http.get(baseUrl);
    };

    this.findById = function(id){
        return $http.get(baseUrl+id);
    };

    this.create = function(org){
        return $http.post(baseUrl, org);
    };

    this.edit = function(org){
        return $http.put(baseUrl + org.id, org);
    };

    this.delete = function(id){
        return $http.delete(baseUrl + id);
    };
};
