angular.module('bitvagas.org.controllers',[])
.controller('OrgController', OrgController);

OrgController.$inject = ['$scope', '$state', 'OrgService', 'ErrorHandling'];

function OrgController($scope, $state, OrgService, ErrorHandling){

    OrgService.findByUser().then(function(data){
        $scope.orgs = data.data;
    });

    if($state.params.OrgID !== undefined)
        OrgService.findById($state.params.OrgID)
        .then(function(data){
            $scope.org = data.data[0];
        });

    $scope.create = function(org){
        OrgService.create(org).then(function(data){
            $state.go('dashboard.organization.list');
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };

    $scope.edit = function(org){
        OrgService.edit(org).then(function(data){
            $state.go('dashboard.organization.list', {}, { reload: true});
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };

    $scope.delete = function(id){
        //TODO: Message confirmation
        OrgService.delete(id).then(function(data){
            $state.go('dashboard.organization.list', {}, { reload: true});
        }, function(err){
            console.log(err);
            $scope.errors = ErrorHandling.getErrors(err.data);
        });
    };
}
