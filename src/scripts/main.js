'use strict';
(function(module) {
  try {
    module = angular.module('theApp');
  } catch (e) {
    module = angular.module('theApp', ['tink.navigation', 'tink.tinkApi','tink.interactivetable','ui.router']);
  }

  module.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/state1');
    //
    // Now set up the states
    $stateProvider
      .state('state1', {
        url: '/state1',
        templateUrl: 'templates/View1.html',
        controller:'ctrlData',
        controllerAs:'ctrl'
      })
      .state('state2', {
        url: '/state2',
        templateUrl: 'templates/View2.html',
        controller:'ctrlData',
        controllerAs:'ctrl'
      });
  });

})();