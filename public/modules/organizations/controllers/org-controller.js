angular.module('bitvagas.org.controllers',[])
.controller('OrgController', OrgController);

OrgController.$inject = ['$scope', '$state', 'OrgService', 'SweetAlert'];
function OrgController($scope, $state, OrgService, SweetAlert){

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
        });
    };

    $scope.edit = function(org){
        OrgService.edit(org).then(function(data){
            GoBack();
        }, function(err){
            console.log(err);
        });
    };

    $scope.delete = function(id){

        SweetAlert.swal({
            title: "Delete Organization"
          , text: "Deseja deletar essa organização"
          , type: "warning"
          , showCancelButton: true
          , confirmButtonColor: "#DD6B55",confirmButtonText: "Sim, deletar!"
          , cancelButtonText: "No"
          , closeOnConfirm: false
          , closeOnCancel: false }
          , function(isConfirm){
                if (isConfirm) {
                    SweetAlert.swal({ title: "Deleted!"
                                    , text: "Organização deletada."
                                    , type: "success"
                                    , confirmButtonColor: "#29B5DF"
                                    });
                    OrgService.delete(id).then(function(data){
                        GoBack();
                    }, function(err){
                        console.log(err);
                    });
                } else {
                    SweetAlert.swal({ title: "Cancelled"
                                    , type: "error"
                                    , confirmButtonColor: "#29B5DF"
                                    });
                }
            });
    };

    function GoBack(){
        $state.transitionTo('dashboard.organization.list');
    }
}
