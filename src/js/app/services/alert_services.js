(function () {
'use strict';

angular.module('demoApp')
    .factory('alertServices', ['$mdToast', 'SweetAlert', 'LAYER_LIMIT', alertServices]);

    function alertServices($mdToast, SweetAlert, LAYER_LIMIT) {
        var service = {};

        service.showBottomLeftToast = showBottomLeftToast;
        service.showNoDataAvailablePrompt = showNoDataAvailablePrompt;
        service.showEntityNotFound = showEntityNotFound;
        service.showFilterSelectionEmpty = showFilterSelectionEmpty;
        service.showQueryIsEmpty = showQueryIsEmpty;
        service.showLayerLimitWarning = showLayerLimitWarning;

        function showBottomLeftToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom left')
                    .hideDelay(2000)
            );
        }

        function showNoDataAvailablePrompt (entityName) {
            service.showBottomLeftToast('No '+ entityName +' data available for this area.');
        }

        function showEntityNotFound(entityName) {
            SweetAlert.swal({
                title: entityName + ' not found.',
                type: 'warning'
            });
        }

        function showFilterSelectionEmpty() {
            SweetAlert.swal({
                title: 'Please select filter type.',
                type: 'warning'
            });
        }

        function showQueryIsEmpty () {
            SweetAlert.swal({
                title: 'Please fill in search query.',
                type: 'info'
            });
        }

        function showLayerLimitWarning () {
            SweetAlert.swal({
                title: "Layer Limit Exceeded",
                text: "You have exceeded the allowed number of layers opened. \n (Only " + LAYER_LIMIT + " Layers Allowed)",
                type: "warning",
                confirmButtonText: "Ok",
                closeOnConfirm: true
            });
        }

        return service;
    }
}());