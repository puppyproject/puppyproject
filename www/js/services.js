angular.module('app.services', [])

  .service('loginSrvc', function($q, $http, API_ENDPOINT) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
      var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      if (token) {
        useCredentials(token);
      }
    }

    function storeUserCredentials(token) {
      window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
      useCredentials(token);
    }

    function useCredentials(token) {
      isAuthenticated = true;
      authToken = token;

      // Set the token as header for your requests!
      $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
      authToken = undefined;
      isAuthenticated = false;
      $http.defaults.headers.common.Authorization = undefined;
      window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var register = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
          if (result.data.success) {
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
          if (result.data.success) {
            storeUserCredentials(result.data.token);
            console.log('token: ', result.data.token);
            resolve(result.data.msg);
            console.log('Login success: ', result.data.token);
          } else {
            reject(result.data.msg);
            console.log('Login Failed: ', result.data.token);
          }
        });
      });
    };

  //   var login = function (user) {
  //   var dfd = $q.defer();
  //   $http({
  //     method: 'POST',
  //     url: API_ENDPOINT.url + '/authenticate',
  //     data: user
  //   }).then(function (user) {
  //     storeUserCredentials(user.data.token);
  //     console.log('token: ', user.data.token);
  //     console.log(user.data);
  //     dfd.resolve(user.data.msg);
  //     // currentUser = user.data;
  //     // dfd.resolve(user);
  //   }).catch(function (err) {
  //     dfd.reject(err);
  //   });
  //   return dfd.promise;
  // };

    var logout = function() {
      destroyUserCredentials();
    };

    loadUserCredentials();

    return {
      login: login,
      register: register,
      logout: logout,
      isAuthenticated: function() {return isAuthenticated;},
    };
  })

  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
