'use strict';
(function(module) {
  try {
    module = angular.module('tink.interactivetable');
  } catch (e) {
    module = angular.module('tink.interactivetable', ['tink.popover','tink.sorttable']);
  }
  module.directive('tinkInteractiveTable',['$compile',function($compile){
    return{
      restrict:'EA',
      template:function(tElement,tAttr){
        tAttr._tds = $(tElement).find('tbody').clone().find('td');
        tAttr._tr = $(tElement).find('tbody').clone().find('tr:first');
        return '';
      },
      controller:function($scope){

        this.buildTable = function(headerContent,trContent,tdContent){
          var table = document.createElement("TABLE");
          var header = table.createTHead();
          var row = header.insertRow(0);
          var i = headerContent.length; //or 10
          while(i--)
          {
            var cell = row.insertCell(0);
            cell.innerHTML = headerContent[i].name;
          }
          var body = table.createTBody();console.log(tAttrs.ngModel)
          //trContent.attr('ng-repeat','_view in '+tAttrs.ngModel);
          $(body).append(trContent);
          return $compile(table)(scope);
        }

      },
      compile: function compile(tElement, tAttrs) {
        return {
          pre: function preLink(scope, iElement, iAttrs, controller) { 
            
            iElement.replaceWith(createTable(scope[tAttrs.tinkHeaders],tAttrs._tr,tAttrs._tds));

          },
          post: function postLink(scope, iElement, iAttrs, controller) { }
        }
      }
    };
  }])
})();
