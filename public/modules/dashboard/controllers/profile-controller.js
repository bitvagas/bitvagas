angular.module('bitvagas.dashboard.controllers')
.controller('ProfileController', ProfileController);

ProfileController.$inject = ['$rootScope', '$scope', '$state', 'UserService'];
function ProfileController($rootScope, $scope, $state, UserService){

    $scope.profile = {};
    $scope.profile.NAME = $scope.currentUser.NAME;
    $scope.profile.LOCATION = $scope.currentUser.LOCATION;
    $scope.profile.NOTIFY_JOBS = $scope.currentUser.NOTIFY_JOBS;
    $scope.profile.NOTIFY_APPLIES = $scope.currentUser.NOTIFY_APPLIES;

    $scope.UpdateProfile = function(){
        UserService.updateMe($scope.profile).then(function(data){
            $rootScope.$broadcast('update-me');
            $scope.profile.NAME = data.data.NAME;
            $scope.profile.LOCATION = data.data.LOCATION;
        });
    };
}
