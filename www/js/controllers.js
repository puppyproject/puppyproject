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

.controller('homeCtrl', function($scope, $http, homeSrvc, $ionicLoading, loginSrvc) {

        $scope.showCards = true;
        var cardTypes = [];

        $scope.getCards = function() {
          homeSrvc.getCards().then(function(res) {

            console.log(res.data);

            var card = res.data;

            $scope.cards = res.data;

            cardTypes = res.data.slice();

          });
        };

        console.log('cardTypes', cardTypes);

        $scope.getCards();
        // $scope.cards = cardTypes; //this is the card in cards

        	$scope.cardsControl = {};

          $scope.reload = function() {
          	$scope.cards = Array.prototype.slice.call(cardTypes, 0);
          };

          $scope.cardDestroyed = function(index) {
            $scope.cards.splice(index, 1);
          };

          $scope.addCard = function() {
            var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
          };

          $scope.yesClick = function() {
            $scope.cardsControl.swipeRight();
          };

          $scope.noClick = function() {
            $scope.cardsControl.swipeLeft();
          };

          rejectId = [];

          $scope.cardSwipedLeft = function(index) {
            console.log('LEFT SWIPE');
            // $scope.addCard();
            rejectId.push(cardTypes[index]._id);
            console.log('rejectId', rejectId);

            if(rejectId.length >= 3){
              for(var i = 0; i < rejectId.length; i++){
                homeSrvc.postRejections(loginSrvc.user._id, rejectId[i]);
              }
              rejectId = [];
            }
            // $scope.addCard();
            console.log('CardType Index: ', cardTypes[index]);
            console.log('rejectId', rejectId);
          };

          var storeId = [];


          $scope.cardSwipedRight = function(index) {
            console.log('index: ', index);
            console.log('RIGHT SWIPE');
            console.log('User(id): ', loginSrvc.user._id);
            console.log('Ids:', cardTypes[index]._id);

            storeId.push(cardTypes[index]._id);
            console.log('storeID', storeId);

            if(storeId.length >= 3){
              for(var i = 0; i < storeId.length; i++){
                homeSrvc.postPossibles(loginSrvc.user._id, storeId[i]);
                // .then(function(res) {
                //   console.log('postPossible_storeId: ', storeId[i]);
                //   console.log('res: ', res);
                // });
              }
              storeId = [];
            }

            // $scope.addCard();
            console.log('CardType Index: ', cardTypes[index]);
            console.log('storeId', storeId);
          };

          $scope.reload();
})

.controller('sniffsCtrl', function($scope, $http, $ionicLoading, sniffsSrvc, loginSrvc) {
  var getConnections = function() {
    sniffsSrvc.getConnections(loginSrvc.user._id).then(function(res) {
      $scope.connections = res.data.connections;
      console.log('sniffsCtrl: ', res.data.connections[0].dogs[0].name);
    });
  };
  getConnections();
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
