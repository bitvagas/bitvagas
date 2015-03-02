angular.module('bitvagas.jobs.controllers')
.controller('JobPostController', JobPostController)
.controller('JobCreateController', JobCreateController);

JobPostController.$inject   = ['$scope', '$state', '$stateParams', 'JobService', 'Categories', 'ErrorHandling'];
JobCreateController.$inject = ['$scope', '$state', '$stateParams', 'JobService', 'Categories', 'Organizations', 'ErrorHandling'];
function JobPostController($scope, $state, $stateParams, JobService, Categories, ErrorHandling){

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

function JobCreateController($scope, $state, $stateParams, JobService, Categories, Organizations, ErrorHandling){

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;
    $scope.orgs = Organizations.data;

    $scope.create = function(){
        if($scope.form.$valid)
            $state.go('dashboard.jobs.confirm', { data : $scope.data })
        else
            console.log($scope.form.$errors);
    }

    $scope.confirm = function(data){

        JobService.create(data)
        .then(function(data){
            console.log(data);
            $state.go('dashboard.jobs.list');
        }, function(err){
            console.log(err);
            //back to crate state and show errors
            $state.go('dashboard.jobs.create', {
                data   : $scope.data
              , errors : ErrorHandling.getErrors(err.data)
            });
        });
    }
}
