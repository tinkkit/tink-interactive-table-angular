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
      priority: 1500.1,
      compile: function compile(tElement, tAttrs) {
        $(tElement.find('thead tr')[0]).prepend($('<th on-click="return false;"><input type="checkbox" id="{{$id}}-all" name="{{$id}}}-all" value=""><label for="{{$id}}-all"></label></th>'));
        var td = $('<td ng-click="prevent($event)"><input type="checkbox" id="{{$id}}}-{{$index}}" name="{{$id}}}-{{$index}}" value=""><label for="{{$id}}}-{{$index}}"></label></td>');
        $(tElement.find('tbody tr')[0]).prepend(td);
        tAttrs._tr = $(tElement.find('tbody tr')[0]);
        return {
          post:function postLink(scope){
            scope.prevent = function($event){
              $event.stopPropagation();
            }
          }
        }
      }
    };
  }]);
  module.directive('tinkInteractiveTable',['$compile',function($compile){
    return{
      restrict:'EA',
      transclude:true,
      priority: 1500,
      replace:true,
      scope:{
        tinkData:'=',
        tinkHeaders:'=',
        initAllChecked:'='
      },
      templateUrl:'templates/reorder.html',
      controller:function($scope){


      },
      compile: function compile(tElement, tAttrs) {

        return {
          pre: function preLink(scope, iElement, iAttrs, controller,transclude) { 

          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            scope.selected = -1;
            //If you select an other kolom name in de kolumn popup this function will be fired.
            scope.select = function(e,index){
              //Prevent the default to disable checkbox behaviour.
              e.preventDefault();
              //Changed the selected index.
              scope.selected = index;
            };

            function replaceBody(tr){
              var tbody = iElement.find('tbody');
              tbody.html('');
              tbody.append(tr);
              $compile(tbody)(scope.$parent);
            }

            //function will be called when pressing arrow for order change
            scope.arrowUp = function(){
              if(scope.selected > 0){
                scope.tinkHeaders.swap(scope.selected,scope.selected-1);

                var hulSwap = scope.selected +1;
                swapTds(hulSwap,hulSwap-1);
                replaceBody(iAttrs._tr);

                scope.selected-=1;
              }
            };
            //function will be called when pressing arrow for order change
            scope.arrowDown = function(){
              if(scope.selected < scope.tinkHeaders.length-1){
                scope.tinkHeaders.swap(scope.selected,scope.selected+1);

                var hulSwap = scope.selected +1;
                swapTds(hulSwap,hulSwap+1);
                replaceBody(iAttrs._tr);

                scope.selected+=1;
              }
            };

            //added this to swap elements easly
            Array.prototype.swap = function(a, b) {
              var temp = this[a];
              this[a] = this[b];
              this[b] = temp;
            };

            function swapTds (a,b){
              var td1 = iAttrs._tr.find('td:eq('+a+')'); // indices are zero-based here
              var td2 = iAttrs._tr.find('td:eq('+b+')');
              if(a < b){
                td1.detach().insertAfter(td2);
              }else if(a > b){
                td1.detach().insertBefore(td2);
              }
            }

          }
        }
      }
    };
  }])
})();
