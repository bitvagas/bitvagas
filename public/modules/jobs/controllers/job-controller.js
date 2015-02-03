angular.module('bitvagas.jobs.controllers',[])
.controller('JobCreateController', JobCreateController)
.controller('JobListController', JobListController)
.controller('JobShowController', JobShowController);

JobCreateController.$inject = ['$scope','$state','JobService', 'CategoryService'];
JobListController.$inject = ['$scope','$state','JobService', 'CategoryService'];
JobShowController.$inject = ['$scope','$state','JobService', 'CategoryService'];

function JobListController($scope, $state, JobService){

    JobService.findAll().then(function(data){
        $scope.jobs = data.data;
        console.log($scope.jobs);
    });
}

function JobCreateController($scope, $state, JobService, CategoryService ){

    CategoryService.findAll().then(function(data){
        $scope.categories = data.data;
    });
}

function JobShowController($scope, $state, JobService){
    var id = $state.params.id;
    JobService.findById(id).then(function(data){
        $scope.job = data.data;
    });
}

