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
      tinkColumnReorder:'='
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
      scope.hasReoder = function(){
        if(scope.tinkColumnReorder === false || scope.tinkColumnReorder === 'false'){
          return false;
        }
        return true;
      };
        
        scope.buildTable = function(){
          changeAction();
          //Create a new table object
          var table = document.createElement('table');
          $(table).addClass('table-interactive');
          $(table).attr('tink-sort-table','ngModel');
          $(table).attr('tink-callback','sortHeader');
          if(currentSort.field){
            $(table).attr('tink-init-sort',currentSort.field);
            $(table).attr('tink-init-sort-order',currentSort.order);
          }
          if(currentSort.type){
            $(table).attr('tink-init-sort-type',currentSort.type);
          }
          //Create the headers of the table
          createHeaders(table,scope.tinkHeaders);
          //create the body of the table
          createBody(table,scope.ngModel);

          //create a copy for the headers
          //scope.tinkHeaders = scope.tinkHeaders;
          scope.checkB = scope.createArray(scope.ngModel.length);          
          fullChecked();
          var tableEl = element.find('table');
          tableEl.replaceWith(table);
          $compile(table)(scope);
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
                }else{
                  row = body.insertRow(j);
                  //If we have action add a checkbox.
                  if(scope.hasAction()){
                    var check = row.insertCell(0);
                    check.innerHTML = createCheckbox(j,j);
                  }
                }
                var val = content[j][scope.tinkHeaders[i].field];
                var cell;
                if(scope.hasAction()){
                  cell = row.insertCell(1);
                }else{
                  cell = row.insertCell(0);
                }
                $(cell).attr('ng-if','tinkHeaders['+i+'].checked');
                cell.innerHTML = val;
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
          if(order === 1){
            currentSort.order = 'asc';   
          }else{
            currentSort.order = 'desc';   
          }
                      
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

