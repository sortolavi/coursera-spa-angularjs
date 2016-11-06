(function () {
'use strict';

angular.module('ShoppingList')
.service('ShoppingListService', ShoppingListService);


ShoppingListService.$inject = ['$q', '$timeout'];
function ShoppingListService($q, $timeout) {
  var service = this;

  // List of shopping items
  var items = [];

  // Pre-populate a no cookie list
  items.push({
    id: "81",
    short_name: "L",
    name: "Lunch",
    special_instructions: "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice ",
    url: "https://davids-restaurant.herokuapp.com/categories/81.json"
  });
  items.push({
    id: "82",
    short_name: "A",
    name: "Soup",
    special_instructions: "None",
    url: "https://davids-restaurant.herokuapp.com/categories/82.json"
  });
  items.push({
    id: "83",
    short_name: "B",
    name: "Appetizers",
    special_instructions: "None",
    url: "https://davids-restaurant.herokuapp.com/categories/83.json"
  });

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getItems = function () {
    var deferred = $q.defer();

    // Wait 2 seconds before returning
    $timeout(function () {
      // deferred.reject(items);
      deferred.resolve(items);
    }, 800);

    return deferred.promise;
  };
}

})();
