(function () {
    'use strict';

    angular.module('demoApp')
        .factory('waterMaintenanceLayerServices', ['gmapServices', 'webServices', waterMaintenanceLayerServices]);

    function waterMaintenanceLayerServices(gmapServices, webServices) {
        var service = {};

        var feature = null;
        var jsonUrl = 'layers/geojson/water_maintenance.geojson';
        var iconUrl = 'http://maps.google.com/mapfiles/kml/pal3/icon41.png';
        var opts = {
            icon: iconUrl
        };


        service.showLayer = showLayer;
        service.hideLayer = hideLayer;

        function showLayer() {
            webServices.loadJson(jsonUrl)
                .then(function (response) {
                    feature = gmapServices.loadGeoJson(response.data, opts);
                });
        }

        function hideLayer() {
            gmapServices.removeGeoJson(feature);
        }

        return service;
    }
}());