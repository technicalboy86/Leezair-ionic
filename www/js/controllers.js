angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope, $state ) {
  $scope.onClickSignin = function(){
      $state.go("signin");
  };
  
  $scope.onClickSignup = function(){
      $state.go("signup");
  };

})

.controller('SigninCtrl', function($scope, $ionicLoading, Auth, Storage, $location, $timeout, $state, $ionicHistory, $ionicViewSwitcher) {
  //$scope.user = {email:"jonatan@claimony.com", password:"test"};
  $scope.user = {email:"", password:""};
  $scope.login_state = "login";
  
  var mUser = Storage.getObject("user");
  
  function looksLikeMail(str) {
      var lastAtPos = str.lastIndexOf('@');
      var lastDotPos = str.lastIndexOf('.');
      return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  }
  
  $scope.onFBSignin = function(){
    facebookConnectPlugin.api("me",["user_birthday"],
          function(response){
              //var ret = JSON.stringify(response);              
              //ret = JSON.parse(ret);
              console.log(response);
                              $scope.user.email = response.email;
                              $scope.$apply();
/*
              $ionicLoading.show();
              var promise = Auth.signin(response.email, "");
              promise.then(function(data) {
                if(data === true) { //success
                  $location.path("/collect");
                } else { //failed
                  $scope.showAlert('Warning', data);
                }
                $ionicLoading.hide();
              }, function(reason){
                $ionicLoading.hide();
                $scope.showAlert("Warning", "Please check your connection.");
              });
 */
          },
          function(response){
            console.log(response);  
    });
  };
  
  $scope.onSignin = function(){
    console.log($scope.user);

    if($scope.user.email === "" || $scope.user.password ===""){
      $scope.showAlert("Warning", "Please fill out all fields.");
      return;
    }
    
    if(looksLikeMail($scope.user.email) === false){
      $scope.showAlert("Warning", "Please input valid email address.");
      return;
    }
    
    $scope.login_state = "logining";
    $scope.$apply();
    $timeout(function(){
      $scope.login_state = "failed";
      $scope.$apply();
      $timeout(function(){
        $ionicViewSwitcher.nextDirection("back");
        $state.go("app.tabs.activities");
      }, 500);
    }, 1000);
    /*
    var promise = Auth.signin($scope.user.email, $scope.user.password);
    promise.then(function(data) {
      if(data == true) { //success
        $location.path("/collect");
      } else { //failed
        $scope.showAlert('Warning', data);
      }
      $ionicLoading.hide();
    }, function(reason){
      $ionicLoading.hide();
      $scope.showAlert("Warning", "Please check your connection.");
    });
    */
  };
  
  $scope.onBack = function(){
    $ionicHistory.goBack();
  };
  
  $scope.onClickSignup = function(){
    $state.go("signup");
  };  
    
  $scope.onClickForgot = function(){
    $state.go("resetPassword");  
  };
  
  $scope.showAlert = function(title, template) {
    title = title!=""?title+" : ":title;
    //window.plugins.toast.showLongBottom(title +template);
  };
})


.controller('SignupCtrl', function($scope, $ionicLoading, Auth, Storage, $location, $timeout, $state, $ionicHistory) {
  //$scope.user = {email:"jonatan@claimony.com", password:"test"};
  $scope.user = {email:"", password:"", firstname:"", lastname:""};
  $scope.signup_state = "sign";
  
  var mUser = Storage.getObject("user");
  
  function looksLikeMail(str) {
      var lastAtPos = str.lastIndexOf('@');
      var lastDotPos = str.lastIndexOf('.');
      return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  }
  
  $scope.onSignup = function(){
    console.log($scope.user);
  
    if($scope.user.email === "" || $scope.user.password ==="" || $scope.user.firstname ==="" || $scope.user.lastname ===""){
      $scope.showAlert("Warning", "Please fill out all fields.");
      return;
    }
    
    if(looksLikeMail($scope.user.email) === false){
      $scope.showAlert("Warning", "Please input valid email address.");
      return;
    }
    
    $scope.signup_state = "signing";
    $scope.$apply();
    $timeout(function(){
      $scope.signup_state = "signed";
      $scope.$apply();
      $timeout(function(){
        //$state.go("home");
      }, 500);
    }, 1000);
  };
  
  $scope.onBack = function(){
    $ionicHistory.goBack();
  };
  
  $scope.onClickLogin = function(){
    $state.go("signin");
  };  
  
  $scope.showAlert = function(title, template) {
    title = title!=""?title+" : ":title;
   // window.plugins.toast.showLongBottom(title +template);
  };
})

.controller('ResetPasswordCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
  
  $scope.user = {email:""};
  $scope.send_state = "send";
  
  function looksLikeMail(str) {
      var lastAtPos = str.lastIndexOf('@');
      var lastDotPos = str.lastIndexOf('.');
      return (lastAtPos < lastDotPos && lastAtPos > 0 && str.indexOf('@@') == -1 && lastDotPos > 2 && (str.length - lastDotPos) > 2);
  }
  
  $scope.onBack = function(){
    $ionicHistory.goBack();
  };
  
  $scope.onSendEmail = function(){
    if($scope.user.email === "" ){
      $scope.showAlert("Warning", "Please fill out all fields.");
      return;
    }
    
    if(looksLikeMail($scope.user.email) === false){
      $scope.showAlert("Warning", "Please input valid email address.");
      return;
    }
    
    $scope.send_state = "sending";
    $scope.$apply();
    $timeout(function(){
      $scope.send_state = "sent";
      $scope.$apply();
      $timeout(function(){
        //$state.go("home");
      }, 500);
    }, 1000);
  };
  
  $scope.showAlert = function(title, template) {
    title = title!=""?title+" : ":title;
   // window.plugins.toast.showLongBottom(title +template);
  };
})


.controller('AppCtrl', function($scope, $state,$ionicViewSwitcher, $ionicLoading, Storage, $ionicHistory, $location, $timeout, $ionicHistory, $rootScope) {
  $scope.filterMoreExpend = false;
  
  $scope.onClickMoreFilter = function(){
    $scope.filterMoreExpend = true;
  };
  
  $scope.onClickLessFilter = function(){
    $scope.filterMoreExpend = false;
  };

  $scope.onClickActivity = function(){
	$location.path("/app/tabs/activities");
  };

  $scope.onClickDiscover = function(){
	$location.path("/app/tabs/discover");
  };

  $scope.onClickBookings = function(){
	$location.path("/app/tabs/bookings");
  };

  $scope.onClickWishlist = function(){
	$location.path("/app/tabs/wishlist");
  };

  $scope.onClickProvider = function(){
	$location.path("/app/become_provider");
  };

  $scope.onClickInvite = function(){
	$location.path("/app/invite_friends");
  };

  $scope.onClickSettings = function(){
	$location.path("/app/settings");
  };

  $scope.onClickHelp = function(){
	$location.path("/app/help");
  };
	
  $scope.onBack = function(){
	$ionicHistory.goBack();
  };
	
  $scope.onShare = function(){
	$ionicViewSwitcher.nextDirection("back");
	$state.go("share");
  };

  $scope.goProfile = function(){
	$location.path("/app/my_profile");
  };
	
 })

.controller('TabsCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	 
})

.controller('MapCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	 var clientPosition = new google.maps.LatLng(10, 10);
    
     var myOptions = {
        	center: clientPosition,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            callback: function () { }
        };

     map_element = document.getElementById("map_canvas");
     map = new google.maps.Map(map_element, myOptions);

	var mapheight = $(window).height() -35;
    $("#map_canvas").height(mapheight);

     google.maps.event.trigger(map, 'resize');
})

.controller('ShareCtrl', function($scope, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
  $scope.onBack = function(){
	$ionicViewSwitcher.nextDirection("back");
	$ionicHistory.goBack();
  };


})

.controller('EditProfileCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
})


.controller('MyProfileCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.goEditProfile = function(){
		$state.go("app.edit_profile");
	};
})

.controller('AboutCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
})

.controller('TermsCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
})

.controller('ChangePasswordCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.send_state = "send";
	$scope.onChangePassword = function(){
		$scope.send_state = "sending";
		$scope.$apply();
		$timeout(function(){
		  $scope.send_state = "sent";
		  $scope.$apply();
		  $timeout(function(){
			//$state.go("home");
		  }, 500);
		}, 1000);
	};
})

.controller('FAQCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.faqList = new Array();
	$scope.faqList.push({"title":"Can I cancel my booking?", "description":"Etiam porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta", "expend":false});
	$scope.faqList.push({"title":"How do i get a refund?", "description":"Etiam porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta", "expend":false});
	$scope.faqList.push({"title":"Can i book activities with locals?", "description":"Etiam porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta", "expend":false});
	$scope.faqList.push({"title":"Am I insured?", "description":"Etiam porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta porta", "expend":false});

	$scope.onClickItem = function(index){		
		$scope.faqList[index].expend = !$scope.faqList[index].expend;
	};
})

.controller('ContactUsCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.send_review_state = "send";
	
	$scope.onSubmit = function(){	
		$scope.send_review_state = "sending";
		$scope.$apply();
		$timeout(function(){
		  $scope.send_review_state = "sent";
		  $scope.$apply();
		}, 1000);
	};
})

.controller('HelpCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
})

.controller('SettingsCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
})

.controller('WriteReviewCtrl', function($scope, $ionicViewSwitcher, $state,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.rate = 0;
    $scope.max = 5;

	$scope.send_review_state = "send";
	
	$scope.onSubmit = function(){	
		$scope.send_review_state = "sending";
		$scope.$apply();
		$timeout(function(){
		  $scope.send_review_state = "sent";
		  $scope.$apply();
		  $timeout(function(){
			$ionicViewSwitcher.nextDirection("back");
			$state.go("app.explore");
		  }, 500);
		}, 1000);
	};

})

.controller('BecomeAProviderCtrl', function($scope, $ionicViewSwitcher,  $state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.goExplore = function(){
		$location.path("/app/explore");
	};
})

.controller('InviteFriendsCtrl', function($scope, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {

})

.controller('BookingInformationCtrl', function($scope, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {

})

.controller('YourDetailCtrl', function($scope, $ionicViewSwitcher,$state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.goBookingConfirmation = function(){
		$state.go("app.booking_information");
	}

	$scope.saveCredit = false;

	$scope.onClickSaveCredit = function(){
		$scope.saveCredit = !$scope.saveCredit;
	};
})

.controller('BookingDetailCtrl', function($scope, $ionicViewSwitcher,  $state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	var eventsInline = [{ "date": "1337594400000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1337677200000", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" },{ "date": "1338897600000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1338885237000", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" },{ "date": "1341750647000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1342614647000", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" },{ "date": "1344515447000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1345033847000", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" },{ "date": "1347712247000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1348230647000", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" },{ "date": "1349094647000", "type": "meeting", "title": "Project A meeting", "description": "Lorem Ipsum dolor set", "url": "http://www.event1.com/" },{ "date": "1351600247", "type": "demo", "title": "Project B demo", "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "url": "http://www.event2.com/" }];

	$("#eventCalendarInline").eventCalendar({
		jsonData: eventsInline
	});

	$scope.goYourDetail = function(){
		$state.go("app.your_detail");
	};

    $scope.participants = {"adults":0, "children":0};

	$scope.onPlusAdults = function(){
		$scope.participants.adults ++;
	};

	$scope.onMinusAdults = function(){
		if($scope.participants.adults != 0)
			$scope.participants.adults --;
	};

	$scope.onPlusChildren = function(){
		$scope.participants.children ++;
	};

	$scope.onMinusChildren = function(){
		if($scope.participants.children != 0)
			$scope.participants.children --;
	};
})

.controller('ExploreCtrl', function($scope, $ionicViewSwitcher, $state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.goActivities = function(){
		$state.go("app.tabs.activities");
	};
})

.controller('ActivityMoreDetailCtrl', function($scope, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
 
})

.controller('CompanyProfileCtrl', function($scope, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.rate = 3;
    $scope.max = 5;

	$scope.activityList = new Array();
    
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"5KM FROM YOU", "star":4, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"10KM FROM YOU", "star":3, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"15KM FROM YOU", "star":4, "count":6});
    
})

.controller('ReviewCtrl', function($scope, $ionicViewSwitcher, $state, $ionicHistory, $ionicViewSwitcher,  $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.rate = 3;
    $scope.max = 5;

	$scope.reviewList = new Array();
	$scope.reviewList.push({"image":"img/user_profile1.png", "date":"20TH FEB 2015", "name":"JOAN", "star":"5", "description":'\"Marvel, the best interactive prototyping tool i have ever tried, with no coding required and all for free!\"'});
	$scope.reviewList.push({"image":"img/user_profile1.png", "date":"20TH FEB 2015", "name":"JOAN", "star":"5", "description":'\"Marvel, the best interactive prototyping tool i have ever tried, with no coding required and all for free!\"'});
	$scope.reviewList.push({"image":"img/user_profile1.png", "date":"20TH FEB 2015", "name":"JOAN", "star":"5", "description":'\"Marvel, the best interactive prototyping tool i have ever tried, with no coding required and all for free!\"'});
	$scope.reviewList.push({"image":"img/user_profile1.png", "date":"20TH FEB 2015", "name":"JOAN", "star":"5", "description":'\"Marvel, the best interactive prototyping tool i have ever tried, with no coding required and all for free!\"'});
	$scope.reviewList.push({"image":"img/user_profile1.png", "date":"20TH FEB 2015", "name":"JOAN", "star":"5", "description":'\"Marvel, the best interactive prototyping tool i have ever tried, with no coding required and all for free!\"'});

	$scope.onBack = function(){
		$ionicHistory.goBack();
	};

	$scope.onClickBookingDetail = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.booking_detail");
	};
})

.controller('ActivityCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
    $scope.activityList = new Array();
    
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"5KM FROM YOU", "star":4, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"10KM FROM YOU", "star":3, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"15KM FROM YOU", "star":4, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"25KM FROM YOU", "star":5, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"35KM FROM YOU", "star":1, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"45KM FROM YOU", "star":2, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"55KM FROM YOU", "star":4, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"65KM FROM YOU", "star":3, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"75KM FROM YOU", "star":5, "count":6});
    $scope.activityList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"85KM FROM YOU", "star":5, "count":6});
    
	$scope.onActivityDetail = function(index){
		$location.path("/app/tabs/activities/"+1);
	};
    $scope.max = 5;
 })
 
 .controller('ActivityDetailCtrl', function($scope,$ionicViewSwitcher, $state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.rate = 3;
    $scope.max = 5;

	$scope.onClickMap = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.map");
	};

	$scope.onClickReview = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.review");
	};

	$scope.onClickCompanyProfile = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.company_profile");
	};

	$scope.onClickMoreDetail = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.activity_more_detail");
	};

	$scope.onClickBookingDetail = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.booking_detail");
	};

	$scope.onBack = function(){
		$state.go("app.tabs.activities");
	};
 })

 .controller('DiscoverCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
    $scope.discoverList = new Array();
    
    $scope.discoverList.push({"image":"img/activity_image_1.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
    $scope.discoverList.push({"image":"img/activity_image_1.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
	$scope.discoverList.push({"image":"img/activity_image_2.jpg", "title":"Port Stephens", "description":"NSW. SURFING. DIVING. BOATING"});
 })
 
 .controller('WishListCtrl', function($scope, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
    $scope.wishList = new Array();
    
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"5KM FROM YOU", "star":4, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"10KM FROM YOU", "star":3, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"15KM FROM YOU", "star":4, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"25KM FROM YOU", "star":5, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"35KM FROM YOU", "star":1, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"45KM FROM YOU", "star":2, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"55KM FROM YOU", "star":4, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"65KM FROM YOU", "star":3, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_1.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"75KM FROM YOU", "star":5, "count":6});
    $scope.wishList.push({"price":"50PP", "image":"img/activity_image_2.jpg", "title":"Surfing lessons for beginners", "time":"2 HOURS", "city":"Sydney, Bondi beach", "distance":"85KM FROM YOU", "star":5, "count":6});
   
	$scope.onActivityDetail = function(index){
		$location.path("/app/tabs/activities/"+1);
	}

    $scope.max = 5;

 })

 .controller('BookingsCtrl', function($scope, $ionicViewSwitcher, $state, $ionicLoading, Storage, $location, $timeout, $ionicHistory) {
	$scope.currentTab = "past";

    $scope.onPast = function(){
		$scope.currentTab = "past";
	}

	$scope.onComingUp = function(){
		$scope.currentTab = "coming";
	}

	$scope.goShare = function(){
		$ionicViewSwitcher.nextDirection("back");
	    $state.go("share");
	};

	$scope.goMap = function(){
		$ionicViewSwitcher.nextDirection("back");
	    $state.go("app.map");
	};

	$scope.goWriteReview = function(){
		$ionicViewSwitcher.nextDirection("back");
	    $state.go("write_review");
	};

	$scope.onClickBookingDetail = function(){
		$ionicViewSwitcher.nextDirection("back");
		$state.go("app.booking_detail");
	};
 })
 
;


