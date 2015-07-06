angular.module('bitvagas.org.controllers',[])
.controller('OrgController', OrgController);

OrgController.$inject = ['$scope', '$state', 'OrgService', 'ErrorHandling'];
function OrgController($scope, $state, OrgService, ErrorHandling){

    if($state.params.OrgID !== undefined) {
        OrgService.findById($state.params.OrgID)
        .then(function(data){
            $scope.org = data.data;
        });
    }

    $scope.create = function(org){
        OrgService.create(org).then(function(data){
            GoBack();
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };

    $scope.edit = function(org){
        OrgService.edit(org).then(function(data){
            GoBack();
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };

    $scope.delete = function(id){
        //TODO: Message confirmation
        OrgService.delete(id).then(function(data){
            GoBack();
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };

    function GoBack(){
        $state.transitionTo('dashboard.organization.list');
    }
}
