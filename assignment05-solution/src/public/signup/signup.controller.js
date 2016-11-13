(function() {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['MenuService'];

    function SignupController(MenuService) {
        var reg = this;

        reg.submit = function() {
            reg.menuerror = "";
            reg.saved = "";
            reg.completed = true;

            MenuService.getMenuItem(reg.user.favitem.toUpperCase()).then(
                function success(response) {
                    reg.user.favorite = response;
                    MenuService.signup(reg.user);
                    reg.saved = "Your information has been saved.";
                },
                function error(response) {
                    reg.menuerror = "No such menu number exists.";
                });
        };

    }


})();
