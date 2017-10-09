
angular.module('App')

//新读取的天气信息不能返回！！！！
.service('weatherService',function($http,$ionicLoading){	
		$http.get('https://ionic-in-action-api.herokuapp.com/weather')
	.success(function(weather){
		localStorage.setItem("weatherBack",JSON.stringify(weather));//缓存数据
		var newTime =  new Date().getTime();
		localStorage.setItem("time",newTime);
		var weatherNew = JSON.stringify(weather);
		$ionicLoading.hide();
	})
	.error(function(err){
		$ionicLoading.show({
			template:'Couldn\'t load weather.Try again Later.',
			duration:3000
		});
	}); 
})
.controller('WeatherController',function($scope,$ionicLoading,$http,weatherService
	){
var directions=['N','NE','E','SE','S','SW','W','NW'];


var timeSaved = localStorage.getItem('time');
var timeSavedObj = JSON.parse(timeSaved);

$scope.timeSaved =timeSaved;
var newTime =  new Date().getTime();
var weather="";
if(newTime-timeSavedObj>60*1000){//1min刷新一次
$scope.weather = JSON.parse(localStorage.getItem('weatherBack'));
  console.log('new');
}else{
	$scope.weather = JSON.parse(localStorage.getItem('weatherBack'));
	  console.log('old');
}
$scope.getDirection = function(degree){
	if (degree>338) {degree = 360-degree;}
	var index = Math.floor((degree+22)/45);
	return directions[index];
};

})
//过滤器，接受角度值，返回方向字符串
.filter('dir',function(){
	var directions=['N','NE','E','SE','S','SW','W','NW'];
	return function(degree){
		if (degree>338) {degree = 360-degree;}
		var index = Math.floor((degree+22)/45);
		return directions[index];
	}
})

;

//****************************加service前
/*
angular.module('App')
.controller('WeatherController',function($scope,$http,$ionicLoading){
var directions=['N','NE','E','SE','S','SW','W','NW'];

// $scope.weather = weather;
var timeSaved = localStorage.getItem('time');
var timeSavedObj = JSON.parse(timeSaved);
var newTime =  new Date().getTime();
$scope.timeSaved =timeSaved;


if(newTime-timeSavedObj>60*1000){//1min刷新一次
  console.log('new');
$ionicLoading.show();
$http.get('https://ionic-in-action-api.herokuapp.com/weather')
.success(function(weather){
	$scope.weather = weather;
	localStorage.setItem("weather",JSON.stringify(weather));
	localStorage.setItem("time",newTime);
	$ionicLoading.hide();
})
.error(function(err){
	$ionicLoading.show({
		template:'Couldn\'t load weather.Try again Later.',
		duration:3000
	});

});	
}else{
	$scope.weather = JSON.parse(localStorage.getItem('weather'));
	  console.log('old');
}
$scope.getDirection = function(degree){
	if (degree>338) {degree = 360-degree;}
	var index = Math.floor((degree+22)/45);
	return directions[index];
};

})
//过滤器，接受角度值，返回方向字符串
.filter('dir',function(){
	var directions=['N','NE','E','SE','S','SW','W','NW'];
	return function(degree){
		if (degree>338) {degree = 360-degree;}
		var index = Math.floor((degree+22)/45);
		return directions[index];
	}
});

*/

//函数方式获取wether
//****************************加service前
// angular.module('App')
// .controller('WeatherController',function($scope,$http,$ionicLoading){
// var directions=['N','NE','E','SE','S','SW','W','NW'];

// // $scope.weather = weather;
// var timeSaved = localStorage.getItem('time');
// var timeSavedObj = JSON.parse(timeSaved);
// var newTime =  new Date().getTime();
// $scope.timeSaved =timeSaved;

// $scope.getWeather = function(){
// $http.get('https://ionic-in-action-api.herokuapp.com/weather')
// .success(function(weather){
// 	$scope.weather = weather;
// 	localStorage.setItem("weather",JSON.stringify(weather));
// 	localStorage.setItem("time",newTime);
// 	$ionicLoading.hide();
// })
// .error(function(err){
// 	$ionicLoading.show({
// 		template:'Couldn\'t load weather.Try again Later.',
// 		duration:3000
// 	});

// });	
// }


// if(newTime-timeSavedObj>60*1000){//1min刷新一次
//   console.log('new');
// $ionicLoading.show();
// $scope.getWeather();
// }else{
// 	$scope.weather = JSON.parse(localStorage.getItem('weather'));
// 	  console.log('old');
// }
// $scope.getDirection = function(degree){
// 	if (degree>338) {degree = 360-degree;}
// 	var index = Math.floor((degree+22)/45);
// 	return directions[index];
// };

// })
// //过滤器，接受角度值，返回方向字符串
// .filter('dir',function(){
// 	var directions=['N','NE','E','SE','S','SW','W','NW'];
// 	return function(degree){
// 		if (degree>338) {degree = 360-degree;}
// 		var index = Math.floor((degree+22)/45);
// 		return directions[index];
// 	}
// });