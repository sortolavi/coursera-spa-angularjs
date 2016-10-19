(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
		.controller('ToBuyController', ToBuyController)
		.controller('AlreadyBoughtController', AlreadyBoughtController)
		.provider('ShoppingList', ShoppingListProvider)
		.config(Config);


	Config.$inject = ['ShoppingListProvider'];
	function Config(ShoppingListProvider) {

		ShoppingListProvider.defaults = [
			{name:"chocolate bar", quantity:"2"},
			{name:"beer", quantity:"1 sixpack"},
			{name:"apples", quantity:"1 kg"},
			{name:"ice cream", quantity:"2 packages"},
			{name:"red wine", quantity:"2 bottles"}
		];
	}


	ToBuyController.$inject = ['ShoppingList'];
	function ToBuyController(ShoppingList) {

		var list1 = this;
		list1.items = ShoppingList.getItems();
		
		list1.buyItem = function (itemIndex) {
		    ShoppingList.buyItem(itemIndex);
		};
	}



	AlreadyBoughtController.$inject = ['ShoppingList'];
	function AlreadyBoughtController (ShoppingList) {

		var list2 = this;
		list2.items = ShoppingList.getBoughtItems();
	}




	function ShoppingListCheckOffService (list) {
		
		var service = this;
		var items = list;
		var boughtItems = [];

		service.buyItem = function (itemIndex) {

			var item = items.splice(itemIndex, 1);
			boughtItems.push(item[0]);

			if (items.length === 0) {
				throw new Error("Max items (" + maxItems + ") reached.");
			}
			else {
				
			}

		};

		service.getItems = function () {
			return items;
		};

		service.getBoughtItems = function () {
			return boughtItems;
		};

	}





	function ShoppingListProvider() {
		var provider = this;

		// provider.defaults = [];

		provider.$get = function () {
			var shoppingList = new ShoppingListCheckOffService(provider.defaults);
			return shoppingList;
		};
	}



})();