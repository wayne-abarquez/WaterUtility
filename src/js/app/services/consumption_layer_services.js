(function(){
'use strict';

angular.module('demoApp')
    .factory('consumptionLayerServices', ['gmapServices', consumptionLayerServices]);

    function consumptionLayerServices (gmapServices) {
        var service = {};

        service.layerName = 'Consumption';

        service.layer = null;

        var fusionId = '1U55rOVx6WikYfpBz_wiU2c1iBLicag563Xfp8QD1';

        service.dateArray = [];
        service.timeArray = [];

        service.legendData = {
            'title': service.layerName + ' Map (Liters/Capita/Day)',
            'data': [
                {
                  'label': 'Violet',
                  'labelColor': '#c879c1',
                  'value': '150 & Below'
                },
                {
                    'label': 'Green',
                    'labelColor': '#00ff00',
                    'value': '151 - 200'
                },
                {
                    'label': 'Cyan',
                    'labelColor': '#00ffff',
                    'value': 'Above 200'
                }
            ]
        };

        var layerStyles = [{
            polygonOptions: {
                fillColor: "#ff00ff",
                fillOpacity: 0.3,
                strokeColor: "#999999",
                strokeWeight: "1"
            }
        }, {
            where: "Consumption > 150",
            polygonOptions: {
                fillColor: "#00ff00"
            }
        }, {
            where: "Consumption > 200",
            polygonOptions: {
                fillColor: "#00ffff"
            }
        }];

        service.initializeLayer = initializeLayer;
        service.showLayer = showLayer;
        service.hideLayer = hideLayer;

        function initializeLayer (dateArray, timeArray) {
            service.dateArray = dateArray;
            service.timeArray = timeArray;
        }

        function showLayer (col) {
            // Clear Existing Layer
            hideLayer();

            service.layer = new google.maps.FusionTablesLayer({
                query: {
                    from: fusionId,
                    where: "Date = '" + service.dateArray[col - 1] + "'"
                },
                map: gmapServices.map,
                styles: layerStyles
            });
        }

        function hideLayer () {
            if (service.layer && service.layer.getMap())
                service.layer.setMap(null);
            service.layer = null;
        }

        return service;
    }
}());