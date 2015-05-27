'use strict';
(function(module) {
  try {
    module = angular.module('tink.interactivetable');
  } catch (e) {
    module = angular.module('tink.interactivetable', ['tink.popover','tink.sorttable','ngLodash']);
  }
  module.directive('tinkInteractiveTable',['$compile','$rootScope',function($compile,$rootScope){
  return{
    restrict:'EA',
    templateUrl:'templates/reorder.html',
    scope:{
      ngModel:'=',
      tinkHeaders:'=',
      tinkActions:'=',
      tinkForceResponsive:'=',
      tinkColumnReorder:'=',
      tinkRowClick:'&',
      tinkChange:'&'
    },
    link:function(scope,element){
      scope.checkB = [];

      var currentSort = {field:null,order:null};

      scope.hasAction = function(){
        if(scope.viewActions && scope.viewActions instanceof Array && scope.viewActions.length > 0){
          return true;
        }
          return false;
      };
      scope.hasReorder = function(){
        if(scope.tinkColumnReorder === false || scope.tinkColumnReorder === 'false'){
          return false;
        }
        return true;
      };
      scope.forceResponsive = function(){
        if(scope.tinkForceResponsive === true || scope.tinkForceResponsive === 'true'){
          return true;
        }
        return false;
      };
      console.log(scope.hasReorder);

        scope.buildTable = function(){
          if(scope.ngModel){
            changeAction();
            var tableEl = element.find('table');
            //Create a new table object
            var table = document.createElement('table');
            $(tableEl).addClass('table-interactive');
            $(tableEl).attr('tink-callback','sortHeader($property,$order,$type)');

            createHeaders(table,scope.tinkHeaders);
            //create the body of the table
            createBody(table,scope.ngModel);

            scope.checkB = scope.createArray(scope.ngModel.length);
            fullChecked();

            tableEl.children('thead').html($(table).children('thead').children());
            tableEl.children('tbody').html($(table).children('tbody').children());
            $compile(tableEl.children('thead'))(scope);
            $compile(tableEl.children('tbody'))(scope);
          }
        };

        function createCheckbox(row,i,hulp){
        if(!hulp){
          hulp ='';
        }
        var checkbox = '<div class="checkbox">'+
                          '<input type="checkbox" ng-change="checkChange('+row+')" ng-model="checkB['+row+']._checked" id="'+row+'" name="'+row+'" value="'+row+'">'+
                          '<label for="'+row+'"></label>'+
                        '</div>';
        return checkbox;
      }

        function createBody(table,content){
          if(scope.tinkHeaders instanceof Array && content instanceof Array){
            var body = table.createTBody();
            for(var i=scope.tinkHeaders.length-1;i>=0;i--){
              for(var j=0;j<content.length;j++){
                var row;
                if(body.rows[j]){
                  row = body.rows[j];
                  //row
                }else{
                  row = body.insertRow(j);
                  //If we have action add a checkbox.
                  $(row).attr('ng-click','rowClick('+j+')');
                  if(scope.hasAction()){
                    var check = row.insertCell(0);
                    check.innerHTML = createCheckbox(j, j);
                    $(check).attr('ng-click', 'preventEvent($event)');
                  }
                }
                var fieldExpression = scope.tinkHeaders[i].field;
                var fieldNames = scope.tinkHeaders[i].field.split('+');
                angular.forEach(fieldNames, function (fieldName) {
                    fieldName = fieldName.trim();
                    if (fieldName.indexOf('"') < 0) {
                        var splittedFieldNames = fieldName.split('.');
                        var fieldValue = content[j];
                        angular.forEach(splittedFieldNames, function (splittedFieldName) {
                            fieldValue = fieldValue[splittedFieldName];
                        });
                        fieldExpression = fieldExpression.replace(fieldName, '"' + fieldValue + '"');
                    }
                });
                var fieldValueComplete = eval(fieldExpression);
                var cell;
                if (scope.hasAction()) {
                    cell = row.insertCell(1);
                } else {
                    cell = row.insertCell(0);
                }
                $(cell).attr('ng-if', 'tinkHeaders[' + i + '].checked');
                if (scope.tinkHeaders[i].filter) {
                    cell.innerHTML = $filter(scope.tinkHeaders[i].filter)(fieldValueComplete, scope.tinkHeaders[i].filterArg);
                }
                else {
                    cell.innerHTML = fieldValueComplete;
                }
              }
            }
          }
        }

        function changeAction(){
          if(scope.tinkActions instanceof Array){
            scope.viewActions = [];
            for(var i=0;i<scope.tinkActions.length;i++){
              var action = scope.tinkActions[i];
              scope.viewActions.push({name:action.name,callback:function(){
                var checked = [];
                for(var i=0;i<scope.ngModel.length;i++){
                  if(scope.checkB[i] && scope.checkB[i]._checked===true){
                    checked.push(scope.ngModel[i]);
                  }
                }
                scope.close();
                action.callback(checked,uncheckAll);
              }});
            }
          }
        }

        scope.rowClick=function(i){
          scope.tinkRowClick.call(null,{$element:scope.ngModel[i]});
        };

        scope.preventEvent = function (event) {
            event.stopPropagation();
        };

        function createHeaders(tableEl,headers){
          if(scope.tinkHeaders instanceof Array && headers instanceof Array){
            var header = tableEl.createTHead();
            var row = header.insertRow(0);

            if(scope.hasAction()){
              var thCheck = document.createElement('th');
              thCheck.setAttribute('class', 'has-checkbox');
              thCheck.innerHTML = createCheckbox(-1,-1,'hulp');
              row.appendChild(thCheck);
            }

            for(var i=0;i<headers.length;i++){
              //take alias of field of the headers
              var val = headers[i].alias || headers[i].field;
              var th = document.createElement('th');
              th.innerHTML = val;
              $(th).attr('ng-if','tinkHeaders['+i+'].checked');
              if(headers[i].sort){
                $(th).attr('tink-sort-header',headers[i].field);
              }

              row.appendChild(th);
            }
          }
        }

        scope.sortHeader = function(field,order,type){
          currentSort = {};
          currentSort.field = field;
          currentSort.type = type;
          currentSort.order = order;
          scope.tinkChange({$property:field,$order:order,$type:type});
        };

        function fullChecked(){
          var length = 0;
          for(var i=0;i<scope.ngModel.length;i++){
            if(scope.checkB[i] && scope.checkB[i]._checked){
                length+=1;
              }
            }
            if(!scope.checkB[-1]){
              scope.checkB[-1] = {};
            }
            if(length !== 0){
              scope.selectedCheck = true;
            }else{
              scope.selectedCheck = false;
            }
            if(length === scope.ngModel.length){
              scope.checkB[-1]._checked = true;
            }else{
              scope.checkB[-1]._checked = false;
            }
        }

        function uncheckAll(){
          for(var i=0;i<scope.ngModel.length;i++){
            if(scope.checkB[i] && scope.checkB[i]._checked===true){
              scope.checkB[i]._checked = false;
            }
          }
          if(scope.checkB[-1]){
              scope.checkB[-1]._checked = false;
            }
        }

        scope.createArray = function(num){
          var array = [];
          for(var i=0;i<num;i++){
            array[i] = {};
          }
          return array;
        };

        scope.checkChange = function(i){
          if(i === -1){
            var check = scope.checkB[-1]._checked;
            angular.forEach(scope.checkB,function(val){
              val._checked = check;
              scope.selectedCheck = check;
            });
          }else{
            if(scope.checkB[-1]){
              scope.checkB[-1]._checked = false;
            }
            fullChecked();
          }
        };

        //function will be called when pressing arrow for order change
        scope.arrowUp = function(){
          if(scope.selected > 0){
            scope.tinkHeaders.swap(scope.selected,scope.selected-1);
            scope.selected-=1;
            scope.buildTable();
          }
        };
        //function will be called when pressing arrow for order change
        scope.arrowDown = function(){
          if(scope.selected < scope.tinkHeaders.length-1){
            scope.tinkHeaders.swap(scope.selected,scope.selected+1);
            scope.selected+=1;
            scope.buildTable();
          }
        };

        scope.close = function(){
          $rootScope.$broadcast('popover-open', { group: 'option-table',el:$('<div><div>') });
        };

        //If you check/uncheck a checbox in de kolom popup this function will be fired.
        scope.headerChange = function(){
          scope.buildTable();
        };
        //If you select an other kolom name in de kolumn popup this function will be fired.
        scope.select = function(e,index){
          //Prevent the default to disable checkbox behaviour.
          e.preventDefault();
          //Changed the selected index.
          scope.selected = index;
        };

        scope.$watch('ngModel',function(){
          scope.buildTable();
        },true);

        //added this to swap elements easly
        Array.prototype.swap = function(a, b) {
          var temp = this[a];
          this[a] = this[b];
          this[b] = temp;
        };
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
              var old = scope.tinkHeaders[evt.oldIndex];
              scope.tinkHeaders.splice(evt.oldIndex, 1);
              scope.tinkHeaders.splice(evt.newIndex, 0,old);
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

