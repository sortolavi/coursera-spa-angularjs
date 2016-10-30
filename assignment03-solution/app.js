(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'founditems.html',
            scope: {
                found: '<',
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

        // list.itemsInList = function() {
        //     for (var i = 0; i < list.items.length; i++) {
        //         var name = list.items[i].name;
        //         if (name.toLowerCase().indexOf("cookie") !== -1) {
        //             return true;
        //         }
        //     }

        //     return false;
        // };
    }



    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.found = [];
        // menu.found = [
        //     {name:"aku ankka"},
        //     {name:"roope ankka"}
        // ];

        menu.getMatchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            // console.log(promise);
            promise.then(function (response) {
              console.log(response);
              menu.found = response;
            })
            .catch(function (error) {
              console.log(error);
            });
        };

        menu.removeItem = function(itemIndex) {
            // console.log("'this' is: ", this);
            // MenuSearchService.removeItem(itemIndex);
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
                
                // for(var i = 0; i < items.length; i++) {
                //     if(items[i].description.indexOf(searchTerm) > -1) {
                //         // console.log('found '+searchTerm+' in ' + items[i].name);
                //         foundItems.push(items[i]);
                //     }
                // }

                foundItems = items.filter(function(item) { return item.description.indexOf(searchTerm) > -1; });
                
                // result.data.menu_items is an array of objects
                /*    
                {
                  description: "chicken broth with egg drop"
                  id: 878
                  large_portion_name: "quart"
                  name: "Egg Drop Soup"
                  price_large: 4.5
                  price_small: 2.25
                  short_name: "A2"
                  small_portion_name: "pint"
                }
                */

                return foundItems;
            });
        };

        // service.removeItem = function(itemIndex) {
        //     foundItems.splice(itemIndex, 1);
        // };


    }

})();
