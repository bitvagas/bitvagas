angular.module('bitvagas.jobs.controllers')
.controller('JobShowController', JobShowController);

JobShowController.$inject = ['$scope', '$state', '$auth', 'JobService', 'lodash'];
function JobShowController($scope, $state, $auth, JobService, lodash){

    $scope.apply = {};

    var id = $state.params.id;

    JobService.findById(id).then(function(data){
        console.log(data);
        $scope.job = data.data;
        AlreadyApplied();
    }).catch(function(err){
        $state.transitionTo('index');
    });

    $scope.toggle = function(){
        $scope.toggled = true;

        if($auth.isAuthenticated()){
            $scope.apply.NAME  = $scope.currentUser.NAME;
            $scope.apply.EMAIL = $scope.currentUser.EMAIL;
        }

        $scope.otherEmail  = $auth.isAuthenticated() ? false : true;
    };

    $scope.other = function(){
        $scope.otherEmail = true;
    };

    $scope.applyJob = function(){
        JobService.apply($scope.job, $scope.apply).then(function(){
            JobService.findById(id).then(function(data){
                console.log(data);
                $scope.job = data.data;
                $scope.toggled = false;
                $scope.alreadyApplied = true;
            });
        });
    };

    function AlreadyApplied() {
        if($scope.currentUser)
            $scope.alreadyApplied = lodash.result(lodash.find($scope.currentUser.job_appliers, { JOB_ID: $scope.job.id }), 'EMAIL') !== undefined;
    }
}
