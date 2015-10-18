angular.module('bitvagas.jobs.controllers')
.controller('JobDashListController', JobDashListController);

JobDashListController.$inject = ['$scope', 'JobService'];
function JobDashListController($scope, JobService){

    $scope.toggle = function(index, id) {

        if($scope.$parent.open == index) {
            $scope.$parent.open = undefined;
            return;
        }

        $scope.$parent.open = index;
    };

    $scope.active = function(job){
        JobService.active(job).then(function(job){
            console.log(job);
        });
    }
}

