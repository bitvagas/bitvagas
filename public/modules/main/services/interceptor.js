angular.module('bitvagas.main.factory')
.factory('Interceptor', Interceptor);

Interceptor.$inject = ['$rootScope', '$q'];
function Interceptor($rootScope, $q){
    return {

        response: function(response){

            if(response.status === 201 ||
               response.status === 204)
                $rootScope.$broadcast('update-me');

            return response;
        }

        , responseError: function(response){

            if(response.status === 401){
                $rootScope.$broadcast('unauthorized');
                console.log('401 error');
                console.log(response);
                $q.reject(response);
            }

            if(response.status === 400 ||
               response.status === 404){
                //show error
                console.log('400 error');
                console.log(response);
                $q.reject(response);
            }

            return response;
        }
    };
}

