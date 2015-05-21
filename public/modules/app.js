angular.module('bitvagas',
    ['pascalprecht.translate'
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
    });
