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
			{name:"white bread", quantity:"1"},
			{name:"camembert cheese", quantity:"350 g"},
			{name:"tomatoes", quantity:"some"},
			{name:"ice cream", quantity:"1 package"},
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
			boughtItems.push(item.pop());
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

		provider.defaults = [];

		provider.$get = function () {
			var shoppingList = new ShoppingListCheckOffService(provider.defaults);
			return shoppingList;
		};
	}



})();