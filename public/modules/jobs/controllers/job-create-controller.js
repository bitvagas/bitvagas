angular.module('bitvagas.jobs.controllers', ['pg-ng-dropdown'])
.controller('JobPostController', JobPostController)
.controller('JobCreateController', JobCreateController);

JobPostController.$inject   = ['$scope', '$state', '$stateParams', 'JobService', 'Categories', 'ErrorHandling', 'lodash'];
JobCreateController.$inject = ['$scope', '$state', '$stateParams', 'JobService', 'Categories', 'lodash', 'ErrorHandling'];
function JobPostController($scope, $state, $stateParams, JobService, Categories,  ErrorHandling, _){

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;

    $scope.create = function(){
        $scope.data.CATEGORY_ID = _.selected($scope.categories, 'id');
        if($scope.form.$valid)
            $state.go('jobs-confirm', { data : $scope.data });
    };

    $scope.confirm = function(data){

        JobService.post(data)
        .then(function(data){
            $state.go('jobs-show', { 'id': data.data.id});
        }, function(err){
            //back to crate state and show errors
            $state.go('jobs-create', {
                data   : $scope.data
              , errors : ErrorHandling.getErrors(err.data)
            });
        });
    };
}

function JobCreateController($scope, $state, $stateParams, JobService, Categories, _, ErrorHandling){

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;

    $scope.create = function(){
        $scope.data.CATEGORY_ID = _.selected($scope.categories, 'id');
        $scope.data.ORG_ID = _.selected($scope.orgs, 'id');
        $state.go('dashboard.jobs.confirm', { data : $scope.data });
    };

    $scope.confirm = function(data){

        JobService.create(data)
        .then(function(data){
            $state.go('dashboard.jobs.list');
        }, function(err){
            //back to crate state and show errors
            $state.go('dashboard.jobs.create', {
                data   : $scope.data
              , errors : ErrorHandling.getErrors(err.data)
            });
        });
    };
}
