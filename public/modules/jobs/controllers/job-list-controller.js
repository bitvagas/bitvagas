angular.module('bitvagas.jobs.controllers')
.controller('JobListController', JobListController);

JobListController.$inject = ['$scope', '$state', '$stateParams', 'JobService'];

function JobListController($scope, $state, $stateParams, JobService) {

    $scope.filter = $stateParams.filter;

    $scope.filterTypes = {
        'FULL-TIME': true,
        'PARTTIME': true,
        'FREELANCE': true,
        'TEMPORARY': true
    };

    JobService.findAll().then(function(data){
        $scope.jobs = data.data;
    });

    $scope.filterJobs = function(){
        $state.go('jobs-list', { filter : $scope.filter }, { notify: false });
    };

    $scope.filterType = function(type){
        return $scope.filterTypes[type.job_type.NAME];
    };
}
