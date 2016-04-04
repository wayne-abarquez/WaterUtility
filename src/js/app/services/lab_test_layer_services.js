(function(){
'use strict';

angular.module('demoApp')
    .factory('labTestLayerServices', ['gmapServices', 'webServices', labTestLayerServices]);

    function labTestLayerServices (gmapServices, webServices) {
        var service = {};

        var feature = null;
        var jsonUrl = 'layers/geojson/lab_test.geojson';
        var iconUrl = 'http://maps.google.com/mapfiles/kml/shapes/placemark_circle_highlight.png';
        var opts = {
            icon: iconUrl
        };

        service.showLayer = showLayer;
        service.hideLayer = hideLayer;

        function showLayer () {
            webServices.loadJson(jsonUrl)
                .then(function(response){
                    feature = gmapServices.loadGeoJson(response.data, opts);
                });
        }

        function hideLayer () {
            gmapServices.removeGeoJson(feature);
        }

        return service;
    }
}());