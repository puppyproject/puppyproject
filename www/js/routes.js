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

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
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

// .run(function ($rootScope, $state, loginSrvc, AUTH_EVENTS) {
//   $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
//     if (!loginSrvc.isAuthenticated()) {
//       console.log(next.name);
//       if (next.name !== 'login' && next.name !== 'register') {
//         event.preventDefault();
//         $state.go('login');
//       }
//     }
//   });
// });
