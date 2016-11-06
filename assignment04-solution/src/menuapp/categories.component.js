(function() {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'src/menuapp/templates/list.template.html',
            bindings: {
                items: '<'
            }
        });

})();
