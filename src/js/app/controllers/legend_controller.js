(function(){
'use strict';

angular.module('demoApp')
    .controller('legendController', ['$rootScope', legendController]);

    function legendController ($rootScope) {
        var vm = this;

        vm.legendData = {
            'title': '',
            'data': []
        };

        vm.legendPipeMapData = {
            'title': '',
            'data': []
        };

        vm.initialize = initialize;

        vm.initialize();

        /* Controller Functions here */

        function initialize () {
            $rootScope.$on('show-legend', function (event, args) {
                showLegend(args.legendData);
            });

            $rootScope.$on('hide-legend', hideLegend);

            $rootScope.$on('show-pipe-map-legend', function (event, args) {
                vm.legendPipeMapData = args.legendPipeMapData;
            });

            $rootScope.$on('hide-pipe-map-legend', hidePipeMapLegend);
        }


        /* Non Scope Functions here */

        function showLegend (legendData) {
            vm.legendData = legendData;
        }

        function hideLegend () {
            clearLegendData();
        }

        function clearLegendData () {
            vm.legendData = {
                'title': '',
                'data': []
            };
        }

        function hidePipeMapLegend () {
            vm.legendPipeMapData = {
                'title': '',
                'data': []
            };
        }

    }
}());