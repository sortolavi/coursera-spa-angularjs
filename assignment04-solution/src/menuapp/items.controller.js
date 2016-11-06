(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    // 'item' is injected through state's resolve
    ItemsController.$inject = ['menuitems'];

    function ItemsController(menuitems) {
        // var itemList = this;
        // itemDetail.id = item.id;
        // itemDetail.name = item.name;
        // itemDetail.short_name = item.short_name;
        // itemDetail.url = item.url;

       
        var itemList = this;
        itemList.category = menuitems.category;
        itemList.menuitems = menuitems.menu_items;

        // console.log("ItemsController: " + itemList.menuitems);

    }

})();
