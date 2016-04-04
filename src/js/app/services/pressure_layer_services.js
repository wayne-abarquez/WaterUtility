(function(){
'use strict';

angular.module('demoApp')
    .factory('pressureLayerServices', ['gmapServices', pressureLayerServices]);

    function pressureLayerServices (gmapServices) {
        var service = {};

        service.layerName = 'Pressure';

        service.layer = null;

        //'1Jz4IyxOYy3A57hipz9FAjJyrck-tsNeaIb1JTQc',
        var fusionId = '1KyLGrYMODTI4xW-ys0_d3BVJYIVu3wbkSPE0ZO_K';

        service.dateArray = [];
        service.timeArray = [];

        service.legendData = {
            'title': service.layerName + ' Map (PSI)',
            'data': [
                {
                  'label': 'Red',
                  'labelColor': '#ff0000',
                  'value': '0 - 9'
                },
                {
                    'label': 'Orange',
                    'labelColor': '#ffa500',
                    'value': '10 - 15'
                },
                {
                    'label': 'Yellow',
                    'labelColor': '#ffff00',
                    'value': '16 - 21'
                },
                {
                    'label': 'Green',
                    'labelColor': '#00ff00',
                    'value': '21 - 30'
                },
                {
                    'label': 'Blue',
                    'labelColor': '#0000ff',
                    'value': '31 & Above'
                }
            ]
        };

        var layerStyles = [{
            polygonOptions: {
                fillColor: "#ff0000",
                fillOpacity: 0.3,
                strokeColor: "#999999",
                strokeWeight: "1"
            }
        }, {
            where: 'PSI > 9',
            polygonOptions: {
                fillColor: "#ff9900"
            }
        }, {
            where: 'PSI > 15',
            polygonOptions: {
                fillColor: "#ffff00"
            }
        }, {
            where: 'PSI > 21',
            polygonOptions: {
                fillColor: "#00ff00"
            }
        }, {
            where: 'PSI > 30',
            polygonOptions: {
                fillColor: "#0000ff"
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
                    where: "DATE = '" + service.dateArray[d] + "' AND TIME = '" + service.timeArray[t] + "'"
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