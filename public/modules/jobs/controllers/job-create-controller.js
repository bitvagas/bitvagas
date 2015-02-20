angular.module('bitvagas.jobs.controllers')
.controller('JobCreateController', JobCreateController);

JobCreateController.$inject = ['$scope','$state','JobService', 'Categories', 'ErrorHandling'];
function JobCreateController($scope, $state, JobService, Categories, ErrorHandling){

    $scope.categories = Categories.data;

    $scope.create = function(data){

        JobService.post(data)
        .then(function(data){
            console.log(data);
            $state.go('jobs-show', { 'id': data.data.id});
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    }
}
