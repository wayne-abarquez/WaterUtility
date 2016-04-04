(function(){
'use strict';

angular.module('demoApp')
    .factory('tempLayerServices', ['gmapServices', tempLayerServices]);

    function tempLayerServices (gmapServices) {
        var service = {};

        service.layerName = 'Temperature';

        service.layer = null;

        // '1dJq-qVAiNMUCd3vbJD9dNf8yFuyACM3pvv0MN1Y'
        var fusionId = '1s7AAOQfzRp4C8nixB-s7bp20DWc_GF6AuRrxRsJW';

        service.dateArray = [];
        service.timeArray = [];

        service.legendData = {
            'title': service.layerName + ' Map',
            'data': [
                {
                  'label': 'Red',
                  'labelColor': '#ff0000',
                  'value': 'Above 33 C'
                },
                {
                    'label': 'Orange',
                    'labelColor': '#ffa500',
                    'value': '27 - 32 C'
                },
                {
                    'label': 'Purple',
                    'labelColor': '#800080',
                    'value': '22 - 26 C'
                },
                {
                    'label': 'Blue',
                    'labelColor': '#0000ff',
                    'value': 'Below 22 C'
                }
            ]
        };

        var layerStyles = [{
            polygonOptions: {
                fillColor: "#FFFFFF",
                fillOpacity: 0.35,
                strokeColor: "#999999",
                strokeWeight: "1"
            }
        }, {
            where: service.layerName + ' < 22',
            polygonOptions: {
                fillColor: "#0000ff"
            }
        }, {
            where: service.layerName + ' >= 22',
            polygonOptions: {
                fillColor: "#9900ff"
            }
        }, {
            where: service.layerName + ' >= 27',
            polygonOptions: {
                fillColor: "#ff9900"
            }
        }, {
            where: service.layerName + ' >= 33',
            polygonOptions: {
                fillColor: "#ff0000"
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
            var d = Math.ceil(col / 24) - 1;
            var t = (col - 1) % 24;

            // Clear Existing Layer
            hideLayer();

            service.layer = new google.maps.FusionTablesLayer({
                query: {
                    select: "location",
                    from: fusionId,
                    where: "Date = '" + service.dateArray[d] + "' AND Time = '" + service.timeArray[t] + "'"
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