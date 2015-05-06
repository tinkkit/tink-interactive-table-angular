'use strict';
(function(module) {
  try {
    module = angular.module('tink.interactivetable');
  } catch (e) {
    module = angular.module('tink.interactivetable', []);
  }
  module.directive('tinkReorder',[function(){
    return {
      restrict:'EA',
      link:function(scope,element,attrs,ctrl){
       console.log(element)
       console.log($(element).find('tbody'))
       $(element).find('tbody');
       setTimeout(function(){
        $(element).find('tbody tr:first').remove();
       },200)
      }
    };
  }]).directive('tinkShiftSort',['$timeout',function(timeout){
  return {
    restirct:'A',
    link:function(scope,elem){
      timeout(function(){
        Sortable.create(elem.find('ul').get(0),{
          ghostClass: 'draggable-placeholder',
          animation: 200,
          handle:'.draggable-elem',
          onStart: function (evt) {
             scope.$apply(function(){
              scope.selected = evt.oldIndex;
            });
          },
          onUpdate: function (evt) {
            scope.$apply(function(){
              var old = scope.headers[evt.oldIndex];
              scope.headers[evt.oldIndex] = scope.headers[evt.newIndex];
              scope.headers[evt.newIndex] = old;
              scope.selected = evt.newIndex;
              scope.buildTable();
            });
          },
        });
      },200);
    }
  };
}]);
})();
