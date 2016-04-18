angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.user', {
    url: '/user',
    views: {
      'tab2': {
        templateUrl: 'templates/user.html',
        controller: 'userCtrl'
      }
    }
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab1': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.sniffs', {
    url: '/sniffs',
    views: {
      'tab3': {
        templateUrl: 'templates/sniffs.html',
        controller: 'sniffsCtrl'
      }
    }
  })

  .state('tabsController.woofs', {
    url: '/woofs',
    views: {
      'tab4': {
        templateUrl: 'templates/woofs.html',
        controller: 'woofsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('')



});
