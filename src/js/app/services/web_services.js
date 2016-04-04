(function(){
'use strict';

angular.module('demoApp')
    .factory('webServices', ["$http", webServices]);

    function webServices($http) {
        var service = {};

        /*
        * Load JSON
        */
        service.loadJson = function (url) {
            return $http.get(url);
        };

        return service;
    }
}());