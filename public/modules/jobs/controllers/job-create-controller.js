angular.module('bitvagas.jobs.controllers', ['pg-ng-dropdown'])
.controller('JobPostController', JobPostController)
.controller('JobCreateController', JobCreateController);

JobPostController.$inject   = ['$scope', '$filter', '$state', '$stateParams', 'JobService', 'Categories', 'lodash', 'marked'];
JobCreateController.$inject = ['$scope', '$filter', '$state', '$stateParams', '$timeout', 'JobService', 'OrgService', 'Categories', 'lodash', 'SweetAlert', 'marked'];
function JobPostController($scope, $filter, $state, $stateParams, JobService, Categories, _, marked){

    var markdown;

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;
    $scope.categories[2].selected = true;

    // Render markedown on confirm page
    if($state.current.name === 'jobs-confirm') {
        if(_.isEmpty($scope.data))
            $state.transitionTo('jobs-post');

        $scope.data.DESCRIPTION = marked($scope.data.DESCRIPTION);
    }

    if(_.isElement(document.getElementById("markdown__editor"))) {
        markdown = new SimpleMDE({
            element: document.getElementById("markdown__editor")
          , spellChecker: false
        });
        //Back editor value
        markdown.value($scope.data.marked);
        markdown.render();
    }

    $scope.create = function(){
        $scope.data.CATEGORY_ID = _.selected($scope.categories, 'id');
        $scope.data.TAGS = _.map($scope.tags, 'text');
        $scope.data.DESCRIPTION = markdown.value();
        $scope.data.marked = markdown.value();

        var typeId = $scope.data.TYPE_ID;
        $scope.data.TYPE_NAME = typeId == 1 ? 'FULL-TIME' :
                                typeId == 2 ? 'PART-TIME' :
                                typeId == 3 ? 'FREELANCE' :
                                typeId == 4 ? 'TEMPORARY' : 'FREELANCE';

        $state.go('jobs-confirm', { data : $scope.data });
    };

    $scope.confirm = function(data){

        JobService.post(data)
        .then(function(data){
            $state.go('jobs-show', { id: data.data.id, title: $filter('UrlFilter')(data.data.TITLE) });
        }, function(err){
            //back to crate state and show errors
            $state.go('jobs-post', {
                data   : $scope.data
            });
        });
    };

    $scope.unconfirm = function(data){
        $state.go('jobs-post', {
            data : $scope.data
        });
    };
}

function JobCreateController($scope, $filter, $state, $stateParams, $timeout, JobService, OrgService, Categories, _, SweetAlert, marked){

    var markdown;

    $scope.data = $stateParams.data;
    $scope.errors = $stateParams.errors || [];

    $scope.categories = Categories.data;
    $scope.orgs = $scope.currentUser.orgs;

    $scope.categories[1].selected = true;

    if($scope.orgs[0])
        $scope.orgs[0].selected = true;

    // Render markedown on confirm page
    if($state.current.name === 'dashboard.jobs.confirm')
        $scope.data.DESCRIPTION = marked($scope.data.DESCRIPTION);

    if(_.isElement(document.getElementById("markdown__editor"))) {
        markdown = new SimpleMDE({
            element: document.getElementById("markdown__editor")
          , spellChecker: false
        });

        //Back editor value
        markdown.value($scope.data.marked);
        markdown.render();
    }

    $scope.create = function(){
        $scope.data.CATEGORY_ID = _.selected($scope.categories, 'id');
        $scope.data.ORG_ID = _.selected($scope.orgs, 'id');
        $scope.data.ORG_NAME = _.result(_.find($scope.orgs, { id: $scope.data.ORG_ID }), 'NAME');
        $scope.data.TAGS = _.map($scope.tags, 'text');
        $scope.data.DESCRIPTION = markdown.value();
        $scope.data.marked = markdown.value();

        var typeId = $scope.data.TYPE_ID;
        $scope.data.TYPE_NAME = typeId == 1 ? 'FULL-TIME' :
                                typeId == 2 ? 'PART-TIME' :
                                typeId == 3 ? 'FREELANCE' :
                                typeId == 4 ? 'TEMPORARY' : 'FREELANCE';

        $state.transitionTo('dashboard.jobs.confirm', { data : $scope.data });
    };

    $scope.confirm = function(data){
        JobService.create(data)
        .then(function(data){
            $state.go('jobs-show', { id: data.data.id, title: $filter('UrlFilter')(data.data.TITLE) });
        }, function(err){
            $state.go('dashboard.jobs.create', {
                data : $scope.data
            });
        });
    };

    $scope.unconfirm = function(data){
        $state.go('dashboard.jobs.create', {
            data : $scope.data
        });
    };

    $scope.alertNewOrg = function(){

        SweetAlert.swal({
              title: "Organização"
            , text: "Crie uma organização "
            , type: "input"
            , inputPlaceholder: 'Nome da Organização'
            , html: true
            , showCancelButton: true
            , closeOnConfirm: false
            , confirmButtonColor: "#28B5DF"
            , confirmButtonText: "Cadastrar"
            , showLoaderOnConfirm: true
        }, function(inputValue){
            if(inputValue === false) return false;
            if(inputValue){
                OrgService.create({ NAME: inputValue }).then(function(data){
                    SweetAlert.swal({
                        title: "Success"
                        , text: "Organização Criada."
                        , type: "success"
                        , confirmButtonColor: "#29B5DF"
                    }, function(){
                        $state.reload();
                    });
                });
            } else {
                SweetAlert.swal({
                      title: "Concelled"
                    , text: "Nome da organização é obrigatorio"
                    , type: "error"
                    , confirmButtonColor: "#C1C1C1"
                });
            }
        });
    };

    if($scope.orgs.length === 0){
        //Open a popup to create an organization
        $scope.alertNewOrg();
    }
}
