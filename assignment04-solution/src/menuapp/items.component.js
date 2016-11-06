(function() {
    'use strict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'src/menuapp/templates/list2.template.html',
            bindings: {
                items: '<'
            }
        });

})();
