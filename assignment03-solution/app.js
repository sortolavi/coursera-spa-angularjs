(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'founditems.html',
            scope: {
                found: '<',
                notice: '@',
                // myTitle: '@title',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };

        return ddo;
    }


    function FoundItemsDirectiveController() {
        var menu = this;
       
    }



    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.notice = "";
        
        menu.getMatchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            
            promise.then(function (response) {
                menu.found = response;
                menu.notice = (menu.found.length === 0 )? "Nothing found!" : "";
            })
            .catch(function (error) {
                console.log(error);
            });
        };

        menu.removeItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
        };


    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var items = [];
        var foundItems = [];

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                
                items = result.data.menu_items;

                foundItems = items.filter(function(item) { 
                    var desc = item.description.toLowerCase();
                    var s = (undefined != searchTerm)?searchTerm.toLowerCase() : undefined;
                    return desc.indexOf(s) > -1;
                });

                if(searchTerm == '') foundItems = [];
                return foundItems;
            });
        };


    }

})();
