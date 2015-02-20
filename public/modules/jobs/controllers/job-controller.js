angular.module('bitvagas.jobs.controllers',[])
.controller('JobListController', JobListController)
.controller('JobShowController', JobShowController);

JobListController.$inject = ['$scope','$state','JobService', 'CategoryService'];
JobShowController.$inject = ['$scope','$state','JobService', 'CategoryService'];

function JobListController($scope, $state, JobService){

    JobService.findAll().then(function(data){
        $scope.jobs = data.data;
    });
}

function JobShowController($scope, $state, JobService){
    var id = $state.params.id;
    JobService.findById(id).then(function(data){
        $scope.job = data.data;
    });
}

