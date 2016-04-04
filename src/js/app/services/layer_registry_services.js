(function(){
'use strict';

angular.module('demoApp')
    .factory('layerRegistry', ['LAYER_LIMIT', layerRegistry]);

    function layerRegistry (LAYER_LIMIT) {
        var service = {};

        service.numlayerLimit = LAYER_LIMIT;
        service.layersOpened = [];

        service.canAddLayer = canAddLayer;
        service.addToLayerRegistry = addToLayerRegistry;
        service.removeFromLayerRegistry = removeFromLayerRegistry;

        function canAddLayer() {
            return service.layersOpened.length < service.numlayerLimit;
        }

        function addToLayerRegistry(layerName) {
            if (service.canAddLayer()) {
                //  layer doesnt exist add to registry counter
                if (_.indexOf(service.layersOpened, layerName) === -1) {
                    service.layersOpened.push(layerName);
                }
            }
        }

        function removeFromLayerRegistry(layerName) {
            //  remove layer from registry if exist
            var itemIndex = _.indexOf(service.layersOpened, layerName);
            if (itemIndex > -1) {
                service.layersOpened.splice(itemIndex, 1);
            }
        }

        return service;
    }
}());