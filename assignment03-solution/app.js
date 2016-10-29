(function () {
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

  menu.getMatchedMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  // service.getMenuCategories = function () {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/categories.json")
  //   });

  //   return response;
  // };


  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: searchTerm
      }
    });

    return response;
  };

}

})();
