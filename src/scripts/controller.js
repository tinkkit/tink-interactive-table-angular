'use strict';
(function(module) {
  try {
    module = angular.module('theApp');
  } catch (e) {
    module = angular.module('theApp', ['tink.navigation', 'tink.tinkApi','tink.interactivetable','ui.router']);
  }

  module.controller('ctrlData', ['$scope', function(scope) {
    var ctrl = this;

      ctrl.nums = 2;
      ctrl.totalitems = 1024;
      ctrl.numpp = 5;
      ctrl.asc = true;
      scope.data = {};

      scope.load=function(f){
        console.log('clicked',f);
        f.checked = !f.checked;
      };
      scope.changed = function(type,value,fn){
        fn();
      };
      scope.sorted = function(property,order,type){
        console.log('sorted',property,order,type);
      };
      scope.boxChecked = function($data,c){
        console.log($data,c);
      };

      ctrl.loading = false;

      scope.data.content = [

        {
          firstname: 'Tom',
          lastname: 'Wuyts',
          username: '@pxlpanic'
        },
        {
          firstname: 'Jasper',
          lastname: 'Van Proeyen',
          username: '@trianglejuice'
        }
      ];
      scope.actions = [
        {
          name: 'remove',
          callback: function(items) {
            angular.forEach(items, function(val) {
              scope.data.content.splice(scope.data.content.indexOf(val),1);
            });
          },
          order:1,
          master:true,
          icon:'fa-close'
        },{
          name: 'add',
          callback: function(items) {
            angular.forEach(items, function(val) {
              // scope.data.content.splice(scope.data.content.indexOf(val),1);
              scope.data.content.push({
                firstname: 'New first',
                lastname: 'New last',
                username: '@newuser'
              });
              console.log('Added ' + val.firstname);
            });
          },
          order:2,
          master:true,
          icon:'fa-edit'
        },{
          name: 'search',
          callback: function(items) {
            angular.forEach(items, function(val) {
              // scope.data.content.splice(scope.data.content.indexOf(val),1);
              console.log('Searched ' + val.firstname);
            });
          },
          order:100,
          master:true,
          icon:'fa-search'
        },
        {
          name: 'Jens',
          callback: function(items) {console.log('callback go');
            angular.forEach(items, function(val) {
              // scope.data.content.splice(scope.data.content.indexOf(val),1);
              console.log('Did something with ' + val.firstname);
            });
          },
          order:1,
          master:false,
          icon:'fa-arrows-h',
          single:true
        },
        {
          name: 'alwaysV',
          callback: function(items) {
            angular.forEach(items, function(val) {
              // scope.data.content.splice(scope.data.content.indexOf(val),1);
              console.log('Did something else with ' + val.firstname);
            });
          },
          order:5,
          master:false,
          icon:'fa-calculator',
          alwaysEnabled:true
        }
      ];


     scope.actions = [{
           name: 'Verwijderen f', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 0, // The order the button is viewed in the bar
           master: false, // If the button is a master button or not ! this value is required.
           icon: 'fa-remove' // The icon ('font-awesome') thats going to be showed. this is required !
       },
       {
           name: 'Toevoegen f', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 0, // The order the button is viewed in the barscope.load
           master: false, // If the button is a master button or not ! this value is required.
           icon: 'fa-plus'// The icon ('font-awesome') thats going to be showed. this is required !

       },
       {
           name: 'Wijzigen f', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 2, // The order the button is viewed in the bar
           master: false, // If the button is a master button or not ! this value is required.
           icon: 'fa-edit' // The icon ('font-awesome') thats going to be showed. this is required !
       },
       {
           name: 'Toevoegen t', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 0, // The order the button is viewed in the bar
           master: true, // If the button is a master button or not ! this value is required.
           icon: 'fa-plus'// The icon ('font-awesome') thats going to be showed. this is required !

       },
        {
           name: 'pl t', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 0, // The order the button is viewed in the bar
           master: true, // If the button is a master button or not ! this value is required.
           icon: 'fa-plus'// The icon ('font-awesome') thats going to be showed. this is required !

       },
       {
           name: 'Wijzigen t', // the name of the actions
           callback: function () {
               // here you are going to write what happen when they clicked on the button.
               // The items variable contains the items that are checked.
           },
           order: 2, // The order the button is viewed in the bar
           master: true, // If the button is a master button or not ! this value is required.
           icon: 'fa-edit' // The icon ('font-awesome') thats going to be showed. this is required !
       }
       ];

      scope.headers = [{
        alias:'Voornaam',
        sort:'firstname',
        checked:true
      },{
        disabled:true,
        alias:'Achternaam',
        checked:true
      },{
        alias:'Gebruikersnaam',
        sortalias:'User',
        sort:'',
        checked:true
      }];
  }]);

})();