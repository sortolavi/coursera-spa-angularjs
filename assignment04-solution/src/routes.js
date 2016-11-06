(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
        .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })


        // Premade list page
        .state('mainList', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/categories.template.html',
            controller: 'MainCategoriesController as mainList',
            resolve: {
                items: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        .state('itemList', {
            // url: '/item-detail/{itemId}',
            url: '/categories/{itemId}',
            templateUrl: 'src/menuapp/templates/items.template.html',
            controller: 'ItemsController as itemList',
            resolve: {
                // menuitems: ['$stateParams', 'MenuDataService',
                //     function($stateParams, MenuDataService) {
                //         return MenuDataService.getItemsForCategory($stateParams.itemId).then(function (items) {
                //             return items.data;
                //         });
                //     }
                // ]
                menuitems: ['$stateParams', 'MenuDataService',
                    function($stateParams, MenuDataService) {
                        return MenuDataService.getItemsForCategory($stateParams.itemId);
                    }
                ]
            }
        });
    }

})();
