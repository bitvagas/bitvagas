angular.module('bitvagas.jobs.controllers')
.controller('JobListController', JobListController);

JobListController.$inject = ['$scope', 'JobService'];

function JobListController($scope, JobService) {

    JobService.findAll().then(function(data){
        $scope.jobs = data.data;
    });
}
