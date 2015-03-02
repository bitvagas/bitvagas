angular.module('bitvagas.jobs.controllers',[])
.controller('JobListController', JobListController)
.controller('JobShowController', JobShowController);

JobListController.$inject = ['$scope','$state','JobService', 'UserService'];
JobShowController.$inject = ['$scope','$state','JobService'];

function JobListController($scope, $state, JobService, UserService){

    if(Object.getOwnPropertyNames(UserService.current).length === 0){
        JobService.findAll().then(function(data){
            $scope.jobs = data.data;
        });
    } else
        $scope.jobs = UserService.current.jobs;
}

function JobShowController($scope, $state, JobService){
    var id = $state.params.id;
    JobService.findById(id).then(function(data){
        $scope.job = data.data;
    });
}

