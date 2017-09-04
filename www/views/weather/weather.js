angular.module('App')
.controller('WeatherController',function($scope,$http,$ionicLoading){
var directions=['N','NE','E','SE','S','SW','W','NW'];


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
})
;