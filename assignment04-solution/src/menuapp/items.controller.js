(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    // 'item' is injected through state's resolve
    ItemsController.$inject = ['menuitems'];

    function ItemsController(menuitems) {
        var itemList = this;
        itemList.category = menuitems.data.category;
        itemList.menuitems = menuitems.data.menu_items;

        // console.log(itemList.menuitems);

    }

})();
