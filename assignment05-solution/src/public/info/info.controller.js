(function() {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);

    InfoController.$inject = ['MenuService'];

    function InfoController(MenuService) {
        var info = this;

        info.user = MenuService.user;
        
    }


})();
