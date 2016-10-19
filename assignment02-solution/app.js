(function() {
	'use strict';

	angular.module('LunchCheck', [])
		.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];


	function LunchCheckController($scope) {

		$scope.lunchDishes = "";
		$scope.bonustext = "Note: an empty item between commas is not counted as a dish.";


		$scope.checkDishes = function() {
			
			// split text input to array
			var items = $scope.lunchDishes.split(',');

			// erase all empty ones
			items = items.filter(function (n) {
				return n.trim() !== "";
			});
			
			$scope.lunchStyle = {color:'green', padding:'6px', border:'2px solid green'};

			if(items.length === 0) {
				$scope.lunchStyle = {color:'red', padding:'6px', border:'4px dashed red'};
				$scope.message = "Please enter data first";
			} 
			else if(items.length > 0 && items.length <= 3) $scope.message = "Enjoy!";
			
			else if(items.length > 3) $scope.message = "Too much!";
			
		};


	}



})();