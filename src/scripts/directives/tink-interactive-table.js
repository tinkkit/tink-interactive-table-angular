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
        $(tElement.find('thead tr')[0]).prepend($('<th ng-if="$parent.hasActions()"><div class="checkbox"><input type="checkbox" ng-click="$parent.$parent.checkAll($event)" ng-class="{indeterminate:true}"  ng-model="$parent.$parent.allChecked" indeterminate id="{{$id}}-all" name="{{$id}}-all" value=""><label for="{{$id}}-all"></label></div></th>'));
        var td = $('<td ng-if="$parent.$parent.hasActions()" ng-click="prevent($event)"><input type="checkbox" ng-change="$parent.$parent.$parent.checkChange()" ng-model="$parent.$parent.$parent.tinkData[$index].checked" id="{{$id}}-{{$index}}" name="{{$id}}-{{$index}}" value=""><label for="{{$id}}-{{$index}}"></label></td>');
        $(tElement.find('tbody tr')[0]).prepend(td);
        tAttrs._tr = $(tElement.find('tbody tr')[0]);
        return {
          pre:function preLing(scope,elm,attr){
            $(tElement.find('tbody tr')[0]).prepend($('<td>o</td>'));
          },
          post:function postLink(scope,elm,attr){
            scope._tr = attr._tr;
            scope.prevent = function($event){
              $event.stopPropagation();
            };
          }
        };
      }
    };
  }]);
    module.controller('interactiveCtrl', ['$scope','$attrs','$element','$compile', function($scope,$attrs,$element,$compile) {
        var ctrl = this;
        var tr = null;

        ctrl.replaceBody = function(tr){
          var tbody = $element.find('tbody');
          tbody.html('');
          tbody.append($attrs._tr);
          $compile(tbody)($scope.$parent);
        };

        ctrl.changeColumn = function(a,b){
          a+=1;
          b+=1;
          ctrl.swapTds(a,b);
          ctrl.replaceBody($attrs._tr);
        };

        ctrl.swapTds = function(a,b){
          var td1 = $attrs._tr.find('td:eq('+a+')'); // indices are zero-based here
          var td2 = $attrs._tr.find('td:eq('+b+')');
          if(a < b){
            td1.detach().insertAfter(td2);
          }else if(a > b){
            td1.detach().insertBefore(td2);
          }
        };
      }])
  module.directive('tinkInteractiveTable',['$compile','$rootScope',function($compile,$rootScope){
    return{
      restrict:'EA',
      transclude:true,
      priority: 1500,
      replace:true,
      scope:{
        tinkData:'=',
        tinkHeaders:'=',
        initAllChecked:'=',
        tinkActions:'='
      },
      controller:'interactiveCtrl',
      templateUrl:'templates/reorder.html',
      compile: function compile(tElement, tAttrs) {

        return {
          pre: function preLink(scope, iElement, iAttrs, controller,transclude) { 

          },
          post: function postLink(scope, iElement, iAttrs, controller) {
            /*stuff actions*/
            scope.desktop = true;


            /*end actions*/
            scope.selected = -1;
            //If you select an other kolom name in de kolumn popup this function will be fired.
            scope.select = function(e,index){
              //Prevent the default to disable checkbox behaviour.
              e.preventDefault();
              //Changed the selected index.
              scope.selected = index;
            };
            scope.allChecked = false;

            scope.actionCallBack = function(c){
              var array = $.grep(scope.tinkData, function( a ) {
                return a.checked;
              });
              if(c.callback instanceof Function){
                c.callback(array);
              }
              scope.close();
            }

            scope.close = function(){
              $rootScope.$broadcast('popover-open', { group: 'option-table',el:$('<div><div>') });
            }

            scope.checkAll = function($event){
              var array = $.grep(scope.tinkData, function( a ) {
                return a.checked;
              });
              if(array.length === scope.tinkData.length){
                for (var i = 0, len = scope.tinkData.length; i < len; i++) {
                  scope.tinkData[i].checked = false;
                }
                scope.allChecked = false;
              }else{
                for (var i = 0, len = scope.tinkData.length; i < len; i++) {
                  scope.tinkData[i].checked = true;
                }
                scope.allChecked = true;
              }

            }

            scope.checkChange = function(){
              var array = $.grep(scope.tinkData, function( a ) {
                return a.checked;
              });
              if(array.length === scope.tinkData.length){
                scope.allChecked = true;
              }else if(array.length === 0 ){
                scope.allChecked = false;
              }else{
                scope.allChecked = false;
              }
            }

            scope.switchPosition = function(a,b){
              scope.tinkHeaders.swap(a,b);
              controller.changeColumn(a,b);
            }

            scope.hasActions = function(){
              if(scope.tinkActions !== undefined || scope.tinkActions !== null){
                if(scope.tinkActions instanceof Array && scope.tinkActions.length > 0){
                  return true;
                }
              }
              return false;
            }     

            //function will be called when pressing arrow for order change
            scope.arrowUp = function(){
              if(scope.selected > 0){
                scope.switchPosition(scope.selected,scope.selected-1);
                scope.selected-=1;
              }
            };
            //function will be called when pressing arrow for order change
            scope.arrowDown = function(){
              if(scope.selected < scope.tinkHeaders.length-1){
                scope.switchPosition(scope.selected,scope.selected+1);
                scope.selected+=1;
              }
            };

            //added this to swap elements easly
            Array.prototype.swap = function(a, b) {
              var temp = this[a];
              this[a] = this[b];
              this[b] = temp;
            };

          }
        }
      }
    };
  }])
.filter('tinkActionFilter',['$filter',function($filter) {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {
    var output;

    var master = $filter('filter')(optional1, {master: true});
    var sub = $filter('filter')(optional1, {master: false});

    if(optional2 === 'master'){
      if(master.length < 5){
        return input;
      }else{
        return input.slice(0,5);
      }
    }else{
      if(master.length >=5){
        return [];
      }else{
        return input.slice(0,5-master.length);
      }
    }
    return output;

  }

}])
.filter('tinkSlice', function() {
  return function(arr, start) {
    return (arr || []).slice(start);
  };
})
.directive('tinkShiftSort',['$timeout',function(timeout){
  return {
    restirct:'A',
    controller:'interactiveCtrl',
    link:function(scope,elem,attr,ctrl){
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
              var oldIndex = evt.oldIndex;
              var newIndex = evt.newIndex;
              scope.switchPosition(oldIndex,newIndex);
            });
          },
        });
      },200);
    }
  };
}]);
})();
