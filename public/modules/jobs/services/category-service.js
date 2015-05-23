angular.module('bitvagas.jobs.category.services', [])
.service('CategoryService', CategoryService);

CategoryService.$inject = ['$http'];
function CategoryService($http){
    var baseUrl = 'api/categories';
    this.findAll = function(){
        return $http.get(baseUrl);
    };
}
