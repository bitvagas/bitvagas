angular.module('bitvagas.jobs.controllers',[])
.controller('JobListController', JobListController)
.controller('JobShowController', JobShowController);

JobListController.$inject = ['$scope', '$interval', '$state', 'JobService', 'UserService'];
JobShowController.$inject = ['$scope', '$state','JobService'];

function JobListController($scope, $interval, $state, JobService, UserService){

    JobService.findAll().then(function(data){
        $scope.jobs = data.data;
    });

    $scope.toggle = function(index, id) {
        if($scope.$parent.open == index)
            return;

        $scope.$parent.open = index;

        var ticker = $interval(function() {
            JobService.findById(id).then(function(job){
                if(job.PREMIUM) {
                    $scope.jobs.id = job;
                    $interval.cancel(ticker);
                }
            });
        }, 10000);

        JobService.receive(id).then(function(data) {
            $scope.qrcode = data.data.input_address;
        });
    };
}

function JobShowController($scope, $state, JobService){
    var id = $state.params.id;
    JobService.findById(id).then(function(data){
        $scope.job = data.data;
    });

    $scope.apply = function(){
        $scope.applied = true;
    };
}

