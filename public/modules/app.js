angular.module('bitvagas',
    ['pascalprecht.translate'
    ,'ngLodash'
    ,'ngCookies'
    ,'bitvagas.main'
    ,'bitvagas.jobs'
    ,'bitvagas.org'
    ,'bitvagas.users'
    ,'bitvagas.admin'
    ]).config(function($translateProvider){
        //Angular translation configuration
        $translateProvider.useStaticFilesLoader({
            prefix: 'locales/',
            suffix: '.json'
        })
        .preferredLanguage('en')
        .fallbackLanguage(['pt', 'en'])
        .useLocalStorage();

        $translateProvider.useSanitizeValueStrategy('escaped');
    })
    .config(function(lodash){
        //Added text property to match dropdown
        lodash.mixin({ 'dropdown' : function(array, value){
            return lodash.map(array, function(obj) {
                return lodash.assign(obj, { "text": obj[value] });
            });
        }});

        //find selected : true property
        lodash.mixin({ 'selected' : function(array, property){
            return lodash.result(lodash.find(array, { selected : true }), property);
        }});
    });
