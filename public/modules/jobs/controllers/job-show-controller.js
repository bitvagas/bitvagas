angular.module('bitvagas.jobs.controllers')
.controller('JobShowController', JobShowController);

JobShowController.$inject = ['$scope', '$state', 'JobService'];

function JobShowController($scope, $state, JobService){
    var id = $state.params.id;
    JobService.findById(id).then(function(data){
        $scope.job = data.data;
    });

    $scope.apply = function(){
        $scope.applied = true;
    };
}
