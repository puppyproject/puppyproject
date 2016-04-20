angular.module('app.controllers', [])

.controller('cameraTabDefaultPageCtrl', function($scope) {

})

.controller('cartTabDefaultPageCtrl', function($scope) {

})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('userCtrl', function($scope) {

})

.controller('homeCtrl', function($scope, $ionicPopover) {
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

})

.controller('sniffsCtrl', function($scope) {

})

.controller('woofsCtrl', function($scope) {

})
