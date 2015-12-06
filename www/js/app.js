var first = true;
/*
// result contains any message sent from the plugin call
function successHandler (result) {
    //window.plugins.toast.showLongBottom(result);
    //alert(result);
}

// result contains any error description text returned from the plugin call
function errorHandler (error) {
    //window.plugins.toast.showLongBottom(error);
    console.log(error);
}

function tokenHandler (result) {
  // Your iOS push server needs to know the token before it can push to this device
  // here is where you might want to send it the token for later use.
  //window.plugins.toast.showLongBottom(result);

  sendRegid(result).then(function(data) {
    //window.plugins.toast.showLongBottom(e.msg);
  });
}

// iOS
function onNotificationAPN (event) {
  if ( event.alert )
  {
    window.plugins.toast.showLongBottom(event.alert);
  }

  if ( event.badge )
  {
      pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
  }
}

// Android and Amazon Fire OS
function onNotification(e) {

  switch( e.event )
  {
    case 'registered':
        if ( e.regid.length > 0 )
        {

          localStorage.setItem("regid", e.regid);

          sendRegid(e.regid).then(function(data) {
            //window.plugins.toast.showLongBottom("Get Registration ID for this device.");
          }, function(error){
            window.plugins.toast.showLongBottom(error);
          });

        }
    break;

    case 'message':
        var data = e.payload;

        if ( e.foreground )
        {
            // INLINE NOTIFICATION
            window.plugins.toast.showLongBottom(data.message);
        }
        else
        {  // otherwise we were launched because the user touched a notification in the notification tray.
            
        }

    break;

    case 'error':
        // ERROR
        window.plugins.toast.showLongBottom(e.msg);
    break;

    default:
        // UNKNOWN EVENT
        window.plugins.toast.showLongBottom("Unknown, an event was received and we do not know what it is");
    break;
  }
}

function sendRegid(regid){
  var promise;
    
  var user = JSON.parse(localStorage.getItem("user"));
  
   promise = $.ajax({
           url:url + 'users/user/'+user.userid+'/deviceid/'+regid+'?usertoken='+user.token,
           type:"PUT",
           contentType:"application/json;charset=utf-8",
           dataType:"json",
           data:{},
           success:function(data){
            console.log(data);
           }
    });

  return promise;
}
*/
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.rating'])

.run(function($ionicPlatform, $location, Storage, $rootScope) {
  $ionicPlatform.ready(function() {
    //$rootScope.regidDevice();
  });
  /*
  $rootScope.regidDevice = function(){
    if(true){//regid == null && token != null){
      var pushNotification = window.plugins.pushNotification;

      if ( device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos" ){

        pushNotification.register(
        successHandler,
        errorHandler,
        {
            "senderID":"763325109020",
            "ecb":"onNotification"
        });

      } else {

        pushNotification.register(
        tokenHandler,
        errorHandler,
        {
            "badge":"true",
            "sound":"true",
            "alert":"true",
            "ecb":"onNotificationAPN"
        });
      }
    }
  };
  */
  $rootScope.$on('$stateChangeStart', function (event, next) {
    
    if(first){
      first = false;
      var mUser = Storage.getObject("user");
      if (mUser.userid != null && mUser.userid != "") {
        //$location.path("/collect");
        //return;
      }
      console.log(mUser);
    }  
	var nextPath = next.url;

	//var currentPath = $location.path();
    currentPath = "/app/tabs" + nextPath;
	$rootScope.currentPath = currentPath;

  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
  $ionicConfigProvider.tabs.position("bottom");
  $ionicConfigProvider.tabs.style("standard");

  $stateProvider  
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  })
  
  .state('signin', {
    url: "/signin",
    templateUrl: "templates/signin.html",
    controller: 'SigninCtrl',
    cache:false
  })
  
  .state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl',
    cache:false
  })
  
  .state('resetPassword', {
    url: "/resetPassword",
    templateUrl: "templates/resetPassword.html",
    controller: 'ResetPasswordCtrl',
    cache:false
  })
  
  .state('share', {
    url: "/share",
    templateUrl: "templates/share.html",
    controller: 'ShareCtrl',
    cache:false
  })

  .state('write_review', {
    url: "/write_review",
    templateUrl: "templates/write_review.html",
    controller: 'WriteReviewCtrl',
    cache:false
  })

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.tabs', {
    url: "/tabs",
    abstract: true,
    views: {
      'menuContent': {
         templateUrl: "templates/tabs.html",
         controller: 'TabsCtrl'
	  }
    }
  })
  
  .state('app.settings', {
    url: "/settings",
    views: {
       'menuContent': {
          templateUrl: "templates/settings.html",
          controller: 'SettingsCtrl'
       }
    },
	cache:false
  })
	
  .state('app.change_password', {
    url: "/change_password",
    views: {
       'menuContent': {
          templateUrl: "templates/change_password.html",
          controller: 'ChangePasswordCtrl'
       }
    },
	cache:false
  })
  
  .state('app.terms', {
    url: "/terms",
    views: {
       'menuContent': {
          templateUrl: "templates/terms.html",
          controller: 'TermsCtrl'
       }
    },
	cache:false
  })

  .state('app.about', {
    url: "/about",
    views: {
       'menuContent': {
          templateUrl: "templates/about.html",
          controller: 'AboutCtrl'
       }
    },
	cache:false
  })

  .state('app.help', {
    url: "/help",
    views: {
       'menuContent': {
          templateUrl: "templates/help.html",
          controller: 'HelpCtrl'
       }
    },
	cache:false
  })

  .state('app.faq', {
    url: "/faq",
    views: {
       'menuContent': {
          templateUrl: "templates/faq.html",
          controller: 'FAQCtrl'
       }
    },
	cache:false
  })

  .state('app.contact_us', {
    url: "/contact_us",
    views: {
       'menuContent': {
          templateUrl: "templates/contact_us.html",
          controller: 'ContactUsCtrl'
       }
    },
	cache:false
  })

  .state('app.my_profile', {
    url: "/my_profile",
    views: {
       'menuContent': {
          templateUrl: "templates/my_profile.html",
          controller: 'MyProfileCtrl'
       }
    },
	cache:false
  })

  .state('app.edit_profile', {
    url: "/edit_profile",
    views: {
       'menuContent': {
          templateUrl: "templates/edit_profile.html",
          controller: 'EditProfileCtrl'
       }
    },
	cache:false
  })

  .state('app.tabs.activities', {
    url: "/activities",
    views: {
       'activitiesTabContent': {
          templateUrl: "templates/activity.html",
          controller: 'ActivityCtrl'
       }
    },
	cache:false
  })
  .state('app.tabs.activity_detail', {
    url: "/activities/:activityId",
    views: {
       'activitiesTabContent': {
          templateUrl: "templates/activity_detail.html",
          controller: 'ActivityDetailCtrl'
       }
    },
	cache:false
  })
  
   .state('app.map', {
    url: "/map",
    views: {
       'menuContent': {
          templateUrl: "templates/map.html",
          controller: 'MapCtrl'
       }
    },
	cache:false
  })
  
  .state('app.explore', {
    url: "/explore",
    views: {
       'menuContent': {
          templateUrl: "templates/explore.html",
          controller: 'ExploreCtrl'
       }
    },
	cache:false
  })

  .state('app.review', {
    url: "/review",
    views: {
       'menuContent': {
          templateUrl: "templates/review.html",
          controller: 'ReviewCtrl'
       }
    },
	cache:false
  })

  .state('app.booking_detail', {
    url: "/booking_detail",
    views: {
       'menuContent': {
          templateUrl: "templates/booking_detail.html",
          controller: 'BookingDetailCtrl'
       }
    },
  })

  .state('app.your_detail', {
    url: "/your_detail",
    views: {
       'menuContent': {
          templateUrl: "templates/your_detail.html",
          controller: 'YourDetailCtrl'
       }
    },
	cache:false
  })
  
  .state('app.booking_information', {
    url: "/booking_information",
    views: {
       'menuContent': {
          templateUrl: "templates/booking_information.html",
          controller: 'BookingInformationCtrl'
       }
    },
	cache:false
  })
		
  .state('app.invite_friends', {
    url: "/invite_friends",
    views: {
       'menuContent': {
          templateUrl: "templates/invite_friends.html",
          controller: 'InviteFriendsCtrl'
       }
    },
	cache:false
  })

  .state('app.become_provider', {
    url: "/become_provider",
    views: {
       'menuContent': {
          templateUrl: "templates/become_provider.html",
          controller: 'BecomeAProviderCtrl'
       }
    },
	cache:false
  })

  .state('app.company_profile', {
    url: "/company_profile",
    views: {
       'menuContent': {
          templateUrl: "templates/company_profile.html",
          controller: 'CompanyProfileCtrl'
       }
    },
	cache:false
  })
	
  .state('app.activity_more_detail', {
    url: "/activity_more_detail",
    views: {
       'menuContent': {
          templateUrl: "templates/activity_more_detail.html",
          controller: 'ActivityMoreDetailCtrl'
       }
    },
	cache:false
  })

  .state('app.tabs.discover', {
    url: "/discover",
    views: {
       'discoverTabContent': {
          templateUrl: "templates/discover.html",
          controller: 'DiscoverCtrl'
       }
    }
  })

  .state('app.tabs.wishlist', {
    url: "/wishlist",
    views: {
       'wishlistTabContent': {
          templateUrl: "templates/wishlist.html",
          controller: 'WishListCtrl'
       }
    }
  })

  .state('app.tabs.bookings', {
    url: "/bookings",
    views: {
       'bookingsTabContent': {
          templateUrl: "templates/bookings.html",
          controller: 'BookingsCtrl'
       }
    }
  })
  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/tabs/activities');
})
.directive('hideTabs', function ($rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $el) {
                $rootScope.hideTabs = true;
                $scope.$on('$destroy', function () {
                    $rootScope.hideTabs = false;
                });
            }
        };
})
;
