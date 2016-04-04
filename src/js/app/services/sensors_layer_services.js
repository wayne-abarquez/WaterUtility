(function () {
    'use strict';

    angular.module('demoApp')
        .factory('sensorsLayerServices', ['gmapServices', '$interval', 'webServices', sensorsLayerServices]);

    function sensorsLayerServices(gmapServices, $interval, webServices) {
        var service = {};

        var jsonUrl = 'layers/geojson/sensors.geojson';
        var iconUrl = 'http://maps.google.com/mapfiles/kml/pal4/icon24.png';
        var infowindowPixelOffset = new google.maps.Size(0, 10);

        service.sensors = [];
        service.pressure = 16.0;
        service.flowRate = 20.0;

        service.showLayer = showLayer;
        service.hideLayer = hideLayer;

        function showLayer() {
            webServices.loadJson(jsonUrl)
                .then(function (response) {
                    loadGeoJsonMarkers(response.data.features);
                });
        }

        function hideLayer() {
            service.sensors.forEach(function(marker, key) {
                if (service.sensors[key] && service.sensors[key].infowindow) {
                    gmapServices.hideMarker(service.sensors[key]);

                    $interval.cancel(service.sensors[key].infowindow.interval);

                    service.sensors[key].infowindow.close();
                    service.sensors[key].infowindow = null;
                }
            });

            service.sensors = [];
        }

        function loadGeoJsonMarkers (features) {
            features.forEach(function(feature){
                var coordsArray = feature.geometry.coordinates;
                var latLng = {lat: coordsArray[1], lng: coordsArray[0]};

                var marker = gmapServices.createCustomMarker(latLng, iconUrl);

                marker.sensorId = feature.properties['SENSOR_ID'];
                marker.infowindow = gmapServices.createInfoWindow('');
                marker.infowindow.setOptions({
                    pixelOffset: infowindowPixelOffset
                });

                marker.listener = gmapServices.addListener(marker, 'click', function() {
                    clickCallback(marker);
                });

                service.sensors.push(marker);
            });
        }


        function clickCallback (marker) {
            if(marker.infowindow) {

                if(!marker.infowindow.interval) {
                    generateContent(marker.sensorId, marker.infowindow);

                    marker.infowindow.interval = $interval(function () {
                        generateContent(marker.sensorId, marker.infowindow);
                    }, 5000);
                }

                gmapServices.showInfoWindow(marker.infowindow, marker);
            }
        }

        function generateContent (sensorId, infowindow) {
            if(!infowindow) return;

            service.pressure = getRandomArbitrary(16, 21).toFixed(2);
            service.flowRate = getRandomArbitrary(18, 25).toFixed(2);

            var date = new Date();
            date.setMinutes(date.getMinutes() - 2);

            var content = '<b>Sensor ID</b>: ' + sensorId + '<br/>';

            content += '<h3 class="margin-tp-5">Sensor Reading</h3>';
            content += '<div>' + date.toUTCString() + '</div><br/>';
            content += "<b>Pressure</b> : " + service.pressure + " PSI<br/>";
            content += "<b>Flow Rate</b> : " + service.flowRate + " m&sup3;/s<br/>";

            infowindow.setContent(content);
        }

        function getRandomArbitrary(min, max) {
            return parseFloat(Math.random() * (max - min) + min);
        }

        return service;
    }
}());