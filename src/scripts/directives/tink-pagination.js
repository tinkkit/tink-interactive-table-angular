'use strict';
(function(module) {
  try {
    module = angular.module('tink.interactivetable');
  } catch (e) {
    module = angular.module('tink.interactivetable', ['tink.popover','tink.sorttable','ngLodash']);
  }
  module.directive('tinkPagination',['lodash',function(_){
  return{
    restrict:'EA',
    templateUrl:'templates/pagination.html',
    scope:{
      tinkTotalItems:'=',
      tinkItemsPerPage:'=',
      tinkItemsPerPageValues:'=',
      tinkCurrentPage:'=',
      tinkChange:'=',
      tinkPaginationId:'@'
    },
    controllerAs:'ctrl',
    controller:['$scope','$rootScope','$timeout',function($scope,$rootScope,timeout){
      var ctrl = this;

      //ctrl.init = function(){
        /*ctrl.tinkTotalItems = $scope.tinkTotalItems;
        $scope.tinkItemsPerPage = $scope.tinkItemsPerPage;
        $scope.tinkItemsPerPageValues = $scope.tinkItemsPerPageValues;
        $scope.tinkCurrentPage =  $scope.tinkCurrentPage;
      //}*/
      ctrl.itemsPerPage = function(){
        if($scope.tinkItemsPerPageValues && $scope.tinkItemsPerPageValues instanceof Array && $scope.tinkItemsPerPageValues.length >0){
          if($scope.tinkItemsPerPageValues.indexOf(parseInt($scope.tinkItemsPerPage)) === -1){
            $scope.tinkItemsPerPage = $scope.tinkItemsPerPageValues[0];
          }
          return $scope.tinkItemsPerPageValues;
        }else{
          var basic = [5,10,20,30];
          if(basic.indexOf(parseInt($scope.tinkItemsPerPage)) === -1){
            $scope.tinkItemsPerPage = basic[0];
          }
          return basic;
        }
      };

      ctrl.perPageChange = function(){
        $rootScope.$broadcast('tink-pagination-'+$scope.tinkPaginationId,'loading');
        timeout(function(){
          $scope.tinkChange({type:'perPage',value:$scope.tinkItemsPerPage},function(){
            $rootScope.$broadcast('tink-pagination-'+$scope.tinkPaginationId,'ready');
          });
        },0);
      };

      ctrl.setPage = function(page){
        $scope.tinkCurrentPage = page;
        sendMessage();
      };


      ctrl.setPrev = function(){
        if($scope.tinkCurrentPage > 1){
          $scope.tinkCurrentPage = $scope.tinkCurrentPage -1;
        }
        sendMessage(); 
      };

      ctrl.setNext = function(){
        if($scope.tinkCurrentPage < ctrl.pages){
          $scope.tinkCurrentPage = $scope.tinkCurrentPage +1;
        }
        sendMessage(); 
      };

      function sendMessage(){
        $rootScope.$broadcast('tink-pagination-'+$scope.tinkPaginationId,'loading');
        timeout(function(){
          $scope.tinkChange({type:'page',value:$scope.tinkCurrentPage},function(){
            $rootScope.$broadcast('tink-pagination-'+$scope.tinkPaginationId,'ready');
          });
        },0);
      }

      ctrl.calculatePages = function(){
        var num = $scope.tinkCurrentPage;
        ctrl.pages = Math.ceil($scope.tinkTotalItems/$scope.tinkItemsPerPage);

        if(num > ctrl.pages){
          num = $scope.tinkCurrentPage = ctrl.pages;
        }
        var arrayNums;
        if(ctrl.pages <6){
          arrayNums = _.range(2,ctrl.pages);
        }else{
          if(num < 4){
            arrayNums = _.range(2,4);
            arrayNums.push(-1);
          }else if(num >= ctrl.pages -2){
            arrayNums = [-1].concat(_.range(ctrl.pages-2,ctrl.pages));
          }else{
            arrayNums = [-1,num,-1];
          }
        }
        if(ctrl.pages >1 ){
          arrayNums.push(ctrl.pages);
        }
        return arrayNums;
      };

    }]
  };
  }]).filter('limitNum', [function() {
   return function(input, limit) {
      if (input > limit) {
          return limit;
      }
      return input;
   };
  }]).directive('tinkPaginationKey',['$rootScope',function(rootScope){
    return {
      link:function($scope,element,attrs){
        
        rootScope.$on('tink-pagination-'+attrs.tinkPaginationKey,function(e,value){

          if(value === 'loading'){
            $(element).find('table.table-interactive').addClass('is-loading');
          }else if(value === 'ready'){
            $(element).find('table.table-interactive').removeClass('is-loading'); 
          }
          
        });

      }
    };

  }]);
})();
