angular.module('bitvagas.main.factory',[])
.factory('ErrorHandling', function(){

    var handler = {};

    handler.getErrors = function(data){
        var errorList = [];
        if(typeof data === 'object')
            //Get a list of errors
            for(var errorIndex in data.errors)
                errorList.push(data.errors[errorIndex].message);
        else
            //Single error
            errorList.push(data);

        return errorList;
    }

    return handler
});
