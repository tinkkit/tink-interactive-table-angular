'use strict';
(function(module) {
  try {
    module = angular.module('tink.interactivetable');
  } catch (e) {
    module = angular.module('tink.interactivetable', ['tink.popover']);
  }
  module.directive('tinkInteractiveTable',['$compile',function($compile){
  return{
    restrict:'EA',
    templateUrl:'templates/reorder.html',
    scope:{
      ngModel:'=',
      headers:'='
    },
    link:function(scope,element,attrs,ctrl){
      scope.nums = 1;

        scope.createTable = function(){
          var table = document.createElement('table');
          createHeaders(table,scope.headers);
          createBody(table,scope.ngModel);
          
          var tableEl = element.find('table');
          tableEl.replaceWith(table); // old code: $('table').replaceWith($(table));
          $compile(table)(scope);
        }

        function createBody(table,content){
          var body = table.createTBody();
          for(var i=scope.headers.length-1;i>=0;i--){
            for(var j=0;j<content.length;j++){
                var row;
              if(body.rows[j]){
                row = body.rows[j];
              }else{
                row = body.insertRow(j);
              }
              var val = content[j][scope.headers[i].field];
              var cell = row.insertCell(0);
              cell.innerHTML = val;
            }
          }
        }

        function createHeaders(tableEl,headers){
          var header = tableEl.createTHead();
          var row = header.insertRow(0);
          
          for(var i=0;i<headers.length;i++){
            
            //take alias of field of the headers
            var val = headers[i].alias || headers[i].field;
            var th = document.createElement('th');
            th.innerHTML = val;
            row.appendChild(th);
          }
        }

        scope.viewer = scope.headers;

        scope.createTable();
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

