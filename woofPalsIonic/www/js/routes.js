angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider


  .state('tabsController', {
    url: '/tabs',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
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
  });

$urlRouterProvider.otherwise('/login');



});
