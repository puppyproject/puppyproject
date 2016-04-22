angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $ionicPopup, $auth) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          });
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          });

        });
    };


    $scope.logout = function() {
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  })

.controller('userCtrl', function($scope, $cordovaCamera) {
  $scope.pictureUrl = 'http://placehold.it/300x300';

  $scope.takePicture = function() {
    var options = {
      allowEdit: true,
      mediaType: String,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG
    };
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

.controller('woofsCtrl', function($scope, $timeout, $ionicScrollDelegate) {

  $scope.showTime = true;

  var alternate,
    isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  $scope.sendMessage = function() {
    alternate = !alternate;

    var d = new Date();
    d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

    $scope.messages.push({
      userId: alternate ? '12345' : '54321',
      text: $scope.data.message,
      time: d
    });

    delete $scope.data.message;
    $ionicScrollDelegate.scrollBottom(true);

  };


  $scope.inputUp = function() {
    if (isIOS) $scope.data.keyboardHeight = 216;
    $timeout(function() {
      $ionicScrollDelegate.scrollBottom(true);
    }, 300);

  };

  $scope.inputDown = function() {
    if (isIOS) $scope.data.keyboardHeight = 0;
    $ionicScrollDelegate.resize();
  };

  $scope.closeKeyboard = function() {
    // cordova.plugins.Keyboard.close();
  };


  $scope.data = {};
  $scope.myId = '12345';
  $scope.messages = [];

});
