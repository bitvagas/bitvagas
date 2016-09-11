angular.module('bitvagas.main.controllers', [])
.controller('MainController', MainController);


MainController.$inject = ['$scope', '$translate', 'amMoment'];

function MainController($scope, $translate, amMoment){
    $scope.setLang = function(langKey) {
        amMoment.changeLocale(langKey.toLowerCase());
        $translate.use(langKey);
    };
    $scope.currentLang = function(){
      return $translate.use();
    };
}
