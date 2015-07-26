angular.module('bitvagas.admin.services', [])
.factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$q', '$http', '$state'];
function AuthenticationService($q, $http, $state){
    return {
        isAuthenticated : function() {
            var deferred = $q.defer();
            $http.get('/isAuthenticated').then(function(user){
                if(user !== 0)
                    deferred.resolve(user);
                else
                    deferred.reject();

            },function(err){
                deferred.reject(err);
            });
            return deferred.promise;
        }
    };
}
