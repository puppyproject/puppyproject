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
            resolve(result.data);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
          console.log(123123, result);
          if (result.data.success) {
            var userInfo = result.data.user;
            storeUserCredentials(result.data.token);
            console.log('token: ', result.data.token);
            resolve(result.data.user);
            console.log('Login success: ', result.data.token);
          } else {
            reject(result.data.user);
            console.log('Login Failed: ', result.data.token);
          }
        });
      });
    };

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

  .service('dogSrvc', function($q, $http, API_ENDPOINT) {
    this.addDog = function(user, dog) {
      var dfd = $q.defer();
      console.log('User:', user);
      $http({
        method: 'PUT',
        url: API_ENDPOINT.url + '/user/' + user + '/dogs',
        data: {
          name: dog.name,
          age: dog.age,
          gender: 'It',
          size: dog.size,
          breed: dog.breed,
          description: 'poopy dog',
          fixed: false
        }
      }).then(function(res) {
        dfd.resolve(res);
        console.log('Dog: ', dog);
      }).catch(function(err) {
        dfd.reject(err);
      });
      return dfd.promise;
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

  .service('dogSrvc', function($q, $http, API_ENDPOINT) {
    this.addDog = function(user, dog) {
      var dfd = $q.defer();
      console.log('User:', user);
      $http({
        method: 'PUT',
        url: API_ENDPOINT.url + '/user/' + user + '/dogs',
        data: {
          name: dog.name,
          age: dog.age,
          gender: 'It',
          size: dog.size,
          gender: dog.gender,
          breed: dog.breed,
          description: 'poopy dog',
          photo: dog.image,
          fixed: false
        }
      }).then(function(res) {
        dfd.resolve(res);
        console.log('Dog: ', dog);
      }).catch(function(err) {
        dfd.reject(err);
      });
      return dfd.promise;
    };

    this.editDog = function(user, dog) {
      var dfd = $q.defer();
      console.log('User:', user);
      $http({
        method: 'PUT',
        url: API_ENDPOINT.url + '/user/' + user + '/editdog/',
        data: {
          name: dog.name,
          age: dog.age,
          gender: 'It',
          size: dog.size,
          breed: dog.breed,
          description: 'poopy dog',
          fixed: false
        }
      }).then(function(res) {
        dfd.resolve(res);
        console.log('Dog: ', dog);
      }).catch(function(err) {
        dfd.reject(err);
      });
      return dfd.promise;
    };
  })


  .service('homeSrvc', function($q, $http, API_ENDPOINT) {
    this.getCards = function(card) {
      var dfd = $q.defer();
      console.log('Card:', card);
      $http({
        method: 'GET',
        url: API_ENDPOINT.url + '/user/',
      }).then(function(res) {
        dfd.resolve(res);
      }).catch(function(err) {
        dfd.reject(err);
      });
      return dfd.promise;
    };
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });
