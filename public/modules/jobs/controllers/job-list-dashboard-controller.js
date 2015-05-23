angular.module('bitvagas.jobs.controllers')
.controller('JobDashListController', JobDashListController);


JobDashListController.$inject = ['$scope', '$sce', 'JobService'];

function JobDashListController($scope, $sce, JobService){

    var setUrl = function(id){
        $scope.url = $sce.trustAsResourceUrl("https://sandbox.coinbase.com/checkouts/6d111844c2041be4fdbdd1b3df5eaab5/inline"+(id ? "?c="+id : ""));
    };

    JobService.findByUser().then(function(data){
        $scope.jobs = data.data;
    });

    $scope.toggle = function(index, id) {

        if($scope.$parent.open == index)
            return;

        setUrl(id);

        $scope.$parent.open = index;
    };
}

