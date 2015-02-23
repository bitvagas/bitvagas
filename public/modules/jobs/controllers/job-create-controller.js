angular.module('bitvagas.jobs.controllers')
.controller('JobCreateController', JobCreateController);

JobCreateController.$inject = ['$scope', '$state', '$stateParams', 'JobService', 'Categories', 'ErrorHandling'];
function JobCreateController($scope, $state, $stateParams, JobService, Categories, ErrorHandling){

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;

    $scope.create = function(){
        if($scope.form.$valid)
            $state.go('jobs-confirm', { data : $scope.data })
    }

    $scope.confirm = function(data){

        JobService.post(data)
        .then(function(data){
            console.log(data);
            $state.go('jobs-show', { 'id': data.data.id});
        }, function(err){
            console.log(err);
            //back to crate state and show errors
            $state.go('jobs-create', {
                data   : $scope.data
              , errors : ErrorHandling.getErrors(err.data)
            });
        });
    }
}
