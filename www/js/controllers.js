angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, loginSrvc,  $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function(user) {
    console.log('Logging In:', user);
    loginSrvc.login($scope.user).then(function(user) {
      loginSrvc.user = user; //on the login srvc persists the user data
      $state.go('tabsController.home');
      console.log('User: ', user);
      // console.log('User Id: ', $scope.user._id);
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: errMsg
      });
    });
  };
})

.controller('registerCtrl', function($scope, loginSrvc, $ionicPopup, $state) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.signup = function() {
    loginSrvc.register($scope.user).then(function(user) {
      $state.go('tabsController.user');
      var alertPopup = $ionicPopup.alert({
        title: 'Register success!',
        template: user
      });
      loginSrvc.user = user; //on the login srvc persists the user data
      console.log('user', user);
      console.log('loginsrvc.user', loginSrvc.user);
    }, function(errMsg) {
      var alertPopup = $ionicPopup.alert({
        title: 'Register failed!',
        template: errMsg
      });
    });
  };
})

.controller('userCtrl', function($scope, $cordovaCamera, dogSrvc, loginSrvc, $ionicPopup) {
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

  $scope.addMyDog = {};

  $scope.addDog = function() {
      console.log('addMyDog: ', $scope.addMyDog);
      console.log('User(id): ', loginSrvc.user._id);
    dogSrvc.addDog(loginSrvc.user._id, $scope.addMyDog).then(function(res){
        var alertPopup = $ionicPopup.alert({
          title: 'Woof!',
          template: res.data
        });
        // $scope.addMyDog = res.data.user.dogs;
        console.log($scope.addMyDog);
        console.log('res' , res);
      }, function(errMsg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Bark! Please try again.',
          template: errMsg
        });
    });
  };

  $scope.toggleTimer = function() {
    // console.log($scope.mode);
    if ($scope.mode === 'Clock in') {
      if($scope.location !== undefined){
        console.log($scope.location);
        var today = new Date();
        timeStart = today.getTime();
        startTimer();
        $scope.mode = "Clock out";
        $scope.clockedIn = true;
      }
    } else {
      stopTimer();
      $scope.mode = "Clock in";
      $scope.clockedIn = false;
    }

  };
})


//does memberinfo endpoint work?
.controller('InsideCtrl', function($scope, loginSrvc, API_ENDPOINT, $http, $state) {
  $scope.destroySession = function() {
    loginSrvc.logout();
  };

  $scope.getInfo = function() {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function(result) {
      $scope.memberinfo = result.data.msg;
    });
  };

  $scope.logout = function() {
    loginSrvc.logout();
    $state.go('login');
  };
})

.controller('AppCtrl', function($scope, $state, $ionicPopup, loginSrvc, AUTH_EVENTS) {
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    loginSrvc.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
})

.controller('homeCtrl', function($scope, $ionicPopover, homeSrvc) {
  $scope.getUsers = function( user ) {
      homeSrvc.getUsers().then(function(res) {
        $scope.users = res.data; // .data is an array and projects will be the project in projects
        console.log("Users (Home): ", $scope.users);
        console.log("Dogname: ", $scope.users[3].dogs[0].name);
      });

  	};

    $scope.getUsers();

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
