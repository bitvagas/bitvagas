angular.module('bitvagas.jobs.services', [])
.service('JobService', JobService);

JobService.$inject = ['$http'];
function JobService($http){
    var baseUrl = '/api/jobs/';

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
    this.findByTitle = function(title){
        return $http.get(baseUrl + 'title/' + title);
    };
    this.active = function(job){
        return $http.post(baseUrl + job.id + '/active', job);
    };

    //Apply job
    this.apply = function(job, apply){
        return $http.post(baseUrl + job.id + '/apply', apply);
    };

    this.appliers = function(job){
    };
}
