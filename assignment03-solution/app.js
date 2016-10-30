(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;

        // var promise = MenuSearchService.getMenuCategories();

        // promise.then(function (response) {
        //   menu.categories = response.data;
        // })
        // .catch(function (error) {
        //   console.log("Something went terribly wrong.");
        // });

        menu.getMatchedMenuItems = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        };

    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath'];

    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function(result) {
                var foundItems = [];
                var items = result.data.menu_items;
                
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

    }

})();
