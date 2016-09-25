angular.module('bitvagas.jobs.filters', ['txx.diacritics'])
.filter('UrlFilter', UrlFilter);

UrlFilter.$inject = ['removeDiacritics'];
function UrlFilter(removeDiacritics) {
  return function (input) {
    return removeDiacritics
      .replace(input)
      .replace(/\s+/g, "-")
      .replace(/\/+/g, "-")
      .replace(/\-+/g, "-")
      .toLowerCase()
  }
}
