angular.module('bitvagas.jobs.services', [])
.service('JobService', JobService);

JobService.$inject = ['$http'];
function JobService($http){
    var baseUrl = '/api/jobs/';
    var blockChainUrl = "https://blockchain.info/api";

    this.create = function(job){
        return $http.post(baseUrl, job);
    };
    this.post = function(job){
        return $http.post(baseUrl + 'post', job);
    };
    this.findAll = function(){
        return $http.get(baseUrl);
    };
    this.findById = function(id){
        return $http.get(baseUrl+id);
    };
    this.findByUser = function(){
        return $http.post(baseUrl+'current');
    };
}
