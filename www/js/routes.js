angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
      // var commonConfig = {
      //   popupOptions: {
      //     location: 'no',
      //     toolbar: 'yes',
      //     width: window.screen.width,
      //     height: window.screen.height
      //   }
      // };

  // $authProvider.facebook(angular.extend({}, commonConfig, {
  //     clientId: '617529111729160',
  //     url: 'http://localhost:8873/auth/facebook'
  //   }));


  $stateProvider
    .state('tabsController', {
      url: '/tabs',
      templateUrl: 'templates/tabsController.html',
      abstract: true
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
