angular.module('bitvagas.jobs.services', [])
.service('JobService', JobService);

JobService.$inject = ['$http'];
function JobService($http){
    var baseUrl = '/api/jobs/';

    this.create = function(job){
        return $http.post(baseUrl + 'create', job);
    };
    this.findAll = function(){
        return $http.get(baseUrl);
    }
}
