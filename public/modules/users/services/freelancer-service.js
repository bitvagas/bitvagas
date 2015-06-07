angular.module('bitvagas.users.services', [])
.service('FreelancerService', FreelancerService);

FreelancerService.$inject = ['$http'];
function FreelancerService($http){

    this.findAll = function(){
        return $http.get('/api/freelancer');
    };

    this.findById = function(id){
        return $http.get('/api/freelancer/'+id);
    };

    this.getCV = function(token){
        return $http.post('/api/freelancer/cv', token);
    };
}
