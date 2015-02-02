angular.module('bitvagas.jobs.controllers',[])
.controller('JobCreateController', JobCreateController);

JobCreateController.$inject = ['$scope','$state','JobService', 'CategoryService'];

function JobCreateController($scope, $state, JobService, CategoryService ){

    $scope.jobs = JobServices.findAll();

    CategoryService.findAll().then(function(data){
        $scope.categories = data.data;
    });
}
