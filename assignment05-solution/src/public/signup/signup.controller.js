(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];

function SignupController(MenuService) {
  var reg = this;

  reg.submit = function () {
  	reg.menuerror = "";
  	reg.saved = "";
    reg.completed = true;

    // console.log(reg); //reg.user.menunumber 

    MenuService.getMenuItem(reg.user.favorite).then(
    	function success (response) {
    		// console.log("success.");
    		// console.log(response);
    		reg.user.favorite = response;
    		MenuService.signup(reg.user);
    		reg.saved = "Your information has been saved.";
    	},
    	function error (response) {
    		// console.log("error.");
    		// console.log(response);
    		reg.menuerror = "No such menu number exists.";
    	});
  };
  
}


})();