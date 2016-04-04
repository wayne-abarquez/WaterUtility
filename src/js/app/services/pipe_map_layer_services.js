(function () {
    'use strict';

    angular.module('demoApp')
        .factory('pipeMapLayerServices', ['$rootScope', 'gmapServices', 'webServices', pipeMapLayerServices]);

    function pipeMapLayerServices($rootScope, gmapServices, webServices) {
        var service = {};

        service.layerName = 'Pipe';

        var features = null;
        var jsonUrl = 'layers/geojson/pipes.geojson';

        service.showLayer = showLayer;
        service.hideLayer = hideLayer;
        var opts = {
            pixelOffset: new google.maps.Size(0, 0)
        };

        var categoryProperties = {
            'Main': {'strokeColor': '#800080', 'strokeWeight': 3},
            'Secondary': {'strokeColor': '#0000ff', 'strokeWeight': 2},
            'Tertiary': {'strokeColor': '#00ffff', 'strokeWeight': 2}
        };

        service.legendData = {
            'title': service.layerName + ' Map',
            'data': [
                {
                    'label': 'Purple',
                    'labelColor': '#800080',
                    'value': 'Main Lines'
                },
                {
                    'label': 'Blue',
                    'labelColor': '#0000ff',
                    'value': 'Secondary Lines'
                },
                {
                    'label': 'Cyan',
                    'labelColor': '#00ffff',
                    'value': 'Tertiary Lines'
                }
            ]
        };

        function showLayer() {
            webServices.loadJson(jsonUrl)
                .then(function (response) {
                    features = gmapServices.loadGeoJson(response.data, opts);
                    applyStyles();
                    showLegend(service.legendData);
                });
        }

        function hideLayer() {
            gmapServices.removeGeoJson(features);
            hideLegend();
        }

        function applyStyles () {
            if(features.length) {
                features.forEach(function (feature) {
                    var category = feature.getProperty('CATEGORY');

                    gmapServices.map.data.overrideStyle(feature, {
                        strokeColor: categoryProperties[category].strokeColor,
                        strokeWeight: categoryProperties[category].strokeWeight
                    });
                });
            }
        }

        function showLegend(legendData) {
            $rootScope.showPipeMapLegend = true;
            $rootScope.$broadcast('show-pipe-map-legend', {legendPipeMapData: legendData});
        }

        function hideLegend() {
            $rootScope.$broadcast('hide-pipe-map-legend');

            $rootScope.showPipeMapLegend = false;
        }

        return service;
    }
}());