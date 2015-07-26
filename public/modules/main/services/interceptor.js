angular.module('bitvagas.main.factory')
.factory('Interceptor', Interceptor);

Interceptor.$inject = ['$rootScope', '$q'];
function Interceptor($rootScope, $q){
    return {

        response: function(response){

            if((response.status === 201 ||
                response.status === 204) &&
                !/\/api\/jobs\/\d\/apply/.exec(response.config.url))
                $rootScope.$broadcast('update-me');

            return response;
        }

        , responseError: function(response){

            if(response.status === 401){

                if(response.data.destroy === true)
                    $rootScope.logout();

                $rootScope.$broadcast('unauthorized');
                return $q.reject(response);
            }

            if(response.status === 400 ||
               response.status === 404){
                //show error
                return $q.reject(response);
            }

            return response;
        }
    };
}

