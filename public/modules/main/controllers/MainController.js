angular.module('bitvagas.main.controllers', [])
.controller('MainController', MainController);


MainController.$inject = ['$scope', '$translate'];

function MainController($scope, $translate){
    $scope.setLang = function(langKey) {
        $translate.use(langKey);
    };
}
