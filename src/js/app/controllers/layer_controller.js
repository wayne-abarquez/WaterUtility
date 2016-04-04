(function () {
    'use strict';

    angular.module('demoApp')
        .controller('layerController', ['gmapServices',
            'labTestLayerServices', 'sensorsLayerServices', 'pumpsLayerServices',
            'waterMaintenanceLayerServices', 'pipeMapLayerServices', layerController]);

    function layerController(gmapServices,
                             labTestLayerServices, sensorsLayerServices,
                             pumpsLayerServices, waterMaintenanceLayerServices,
                             pipeMapLayerServices) {
        var vm = this;

        var fusionTableLayerOptions = {
            styleId: 2,
            templateId: 2
        };

        vm.layers = [
            {
                label: 'Business Areas',
                action: 'layerCtl.toggleBusinessAreasLayer()',
                selected: false
            },
            {
                label: 'Pipe Map',
                action: 'layerCtl.togglePipeMapLayer()',
                selected: false
            },
            {
                label: 'Lab Tests',
                action: 'layerCtl.toggleLabTestsLayer()',
                selected: false
            },
            {
                label: 'Sensors',
                action: 'layerCtl.toggleSensorsLayer()',
                selected: false
            },
            {
                label: 'Pumping Station',
                action: 'layerCtl.togglePumpingStationLayer()',
                selected: false
            },
            {
                label: 'Water Maintenance',
                action: 'layerCtl.toggleWaterMaintenanceLayer()',
                selected: false
            }
        ];

        vm.businessLayer = null;
        vm.pipeMapLayer = null;

        vm.toggleBusinessAreasLayer = toggleBusinessAreasLayer;
        vm.togglePipeMapLayer = togglePipeMapLayer;
        vm.toggleLabTestsLayer = toggleLabTestsLayer;
        vm.toggleSensorsLayer = toggleSensorsLayer;
        vm.togglePumpingStationLayer = togglePumpingStationLayer;
        vm.toggleWaterMaintenanceLayer = toggleWaterMaintenanceLayer;

        function toggleBusinessAreasLayer () {
            var layerId = '1_PMuOCQTdsdYUFulr-96yY3cf47Q_AVQctkqp4Or';

            if (vm.layers[0].selected) {
                vm.businessLayer = loadFusionLayer(layerId);
            } else {
                gmapServices.hideFusionTableLayer(vm.businessLayer);
            }
        }

        function togglePipeMapLayer () {
            if (vm.layers[1].selected) {
                pipeMapLayerServices.showLayer();
            } else {
                pipeMapLayerServices.hideLayer();
            }
        }

        function toggleLabTestsLayer() {
            if (vm.layers[2].selected) {
                labTestLayerServices.showLayer();
            } else {
                labTestLayerServices.hideLayer();
            }
        }

        function toggleSensorsLayer () {

            if (vm.layers[3].selected) {
                sensorsLayerServices.showLayer();
            } else {
                sensorsLayerServices.hideLayer();
            }
        }

        function togglePumpingStationLayer () {
            if (vm.layers[4].selected) {
                pumpsLayerServices.showLayer();
            } else {
                pumpsLayerServices.hideLayer();
            }
        }

        function toggleWaterMaintenanceLayer () {
            if (vm.layers[5].selected) {
                waterMaintenanceLayerServices.showLayer();
            } else {
                waterMaintenanceLayerServices.hideLayer();
            }
        }

        /* Non Scope Functions here */

        function loadFusionLayer(layerId) {
            return gmapServices.loadFusionTableLayer('geometry', layerId, fusionTableLayerOptions);
        }
    }
}());