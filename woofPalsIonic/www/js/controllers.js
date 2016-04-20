angular.module('app.controllers', [])

.controller('cameraTabDefaultPageCtrl', function($scope) {

})

.controller('cartTabDefaultPageCtrl', function($scope) {

})

.controller('cloudTabDefaultPageCtrl', function($scope) {

})

.controller('loginCtrl', function($scope) {

})

.controller('userCtrl', function($scope, $cordovaCamera) {
  $scope.pictureUrl = 'http://placehold.it/300x300';

  $scope.takePicture = function() {
    var options = {
      allowEdit: true,
      mediaType: String,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
    }
    $cordovaCamera.getPicture(options).then(function(data) {
      // console.log('camera data:' + angular.toJson);
      $scope.pictureUrl = "data:image/jpeg;base64," + data;
    }, function(error) {
      console.log('camera error:' + angular.toJson(data));
    });
  };
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
