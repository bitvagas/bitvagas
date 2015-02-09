angular.module('bitvagas.jobs.organization.services', [])
.service('OrgService', JobService);

OrgService.$inject = ['$http'];
function OrgService($http){
    var baseUrl = 'api/organizations/';

    this.create = function(org){
        return $http.post(baseUrl, org);
    };

    this.findAll = function(){
        return $http.get(baseUrl);
    };

    this.findByUser = function(user){
        return $http.post(baseUrl, user);
    };
};
