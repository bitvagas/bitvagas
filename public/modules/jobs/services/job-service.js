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

    this.receive = function(id) {
        //generate a new address from 1Mck... will be changed with websocket integration
        var address = "1MckjA4yZWgwo4kXFnE6ikbfPPuB3yCcx3";
        var callback = window.location.origin+"/api/jobs/premium/callback/"+id;
        var url = blockChainUrl + "/receive?method=create&cors=true&format=plain&address="+address+"&shared=false&callback="+callback;
        return $http.get(url);
    };
}
