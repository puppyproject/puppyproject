angular.module('woofPals')

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
  // url: 'http://localhost:8100/api'
  url: 'http://woofpals.co/api'
  //  For a simulator use: url: 'http://127.0.0.1:8080/api'
});
