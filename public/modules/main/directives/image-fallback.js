angular.module('bitvagas.main.directives', [])
.directive('fallback', fallback);

function fallback(){
  return {
    restrict: 'A',
    link: link
  }

  function link(scope, element){
    element.on('error', function(){
      element.attr('src', 'img/unknown.svg');
    });
  }
}
