angular.module('App')
.controller('HelpController',function($scope){
	$scope.help = {
		date :new Date(),
		info:'a help~~~~~~~~~~~~~~~~~~'
	};
})