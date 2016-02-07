angular.module('bitvagas.jobs.controllers')
.controller('JobShowController', JobShowController);

JobShowController.$inject = ['$scope', '$state',  '$auth', 'JobService', 'Job', 'lodash', 'marked'];
function JobShowController($scope, $state, $auth, JobService, Job, lodash, marked){

    $scope.apply = {};

    var job = Job.data;
    $scope.job = job;
    $scope.job.DESCRIPTION = marked(job.DESCRIPTION);
    AlreadyApplied();

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
            JobService.findById($scope.job.id).then(function(data){
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
