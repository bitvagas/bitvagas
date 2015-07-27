angular.module('bitvagas.jobs.controllers')
.controller('JobDashListController', JobDashListController);

JobDashListController.$inject = ['$scope', '$sce'];
function JobDashListController($scope, $sce){

    var setUrl = function(id){
        $scope.url = $sce.trustAsResourceUrl("https://sandbox.coinbase.com/checkouts/6d111844c2041be4fdbdd1b3df5eaab5/inline"+(id ? "?c="+id : ""));
    };

    $scope.toggle = function(index, id) {

        if($scope.$parent.open == index) {
            $scope.$parent.open = undefined;
            return;
        }

        setUrl(id);
        $scope.$parent.open = index;
    };
}

