angular.module('bitvagas.admin.services', [])
.service('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$q', '$http', '$state'];
function AuthenticationService($q, $http, $state){
    var deferred = $q.defer();
    $http.get('/isAuthenticated').success(function(user){
        if(user !== 0)
            deferred.resolve();
        else
            $state.go('jobs.list');

    });
    return deferred.promise;
}
