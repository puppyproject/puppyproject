angular.module('woofPals', ['ionic', 'ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

//THIS CAN MAKE IT GET ACCESS BY COMMENT IT OUT
//If user is not authed go back to login
.run(function ($rootScope, $state, loginSrvc, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!loginSrvc.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'login' && next.name !== 'register') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})

// .run(function ($rootScope, $state, loginSrvc, AUTH_EVENTS) {
//   $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {
//
//     if ('data' in next && 'authorizedRoles' in next.data) {
//       var authorizedRoles = next.data.authorizedRoles;
//       if (!loginSrvc.isAuthorized(authorizedRoles)) {
//         event.preventDefault();
//         $state.go($state.current, {}, {reload: true});
//         $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
//       }
//     }
//
//     if (!loginSrvc.isAuthenticated()) {
//       if (next.name !== 'login') {
//         event.preventDefault();
//         $state.go('login');
//       }
//     }
//   });
// })

// All this does is allow the message
// to be sent when you tap return
.directive('input', function($timeout) {
  return {
    restrict: 'E',
    scope: {
      'returnClose': '=',
      'onReturn': '&',
      'onFocus': '&',
      'onBlur': '&'
    },
    link: function(scope, element, attr) {
      element.bind('focus', function(e) {
        if (scope.onFocus) {
          $timeout(function() {
            scope.onFocus();
          });
        }
      });
      element.bind('blur', function(e) {
        if (scope.onBlur) {
          $timeout(function() {
            scope.onBlur();
          });
        }
      });
      element.bind('keydown', function(e) {
        if (e.which == 13) {
          if (scope.returnClose) element[0].blur();
          if (scope.onReturn) {
            $timeout(function() {
              scope.onReturn();
            });
          }
        }
      });
    }
  };
});
