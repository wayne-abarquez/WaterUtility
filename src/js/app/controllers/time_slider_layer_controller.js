(function () {
    'use strict';

    angular.module('demoApp')
        .controller('timeSliderLayerController', ['$scope', '$rootScope', '$timeout', 'tempLayerServices', 'pressureLayerServices', 'consumptionLayerServices', timeSliderLayerController]);

    function timeSliderLayerController($scope, $rootScope, $timeout, tempLayerServices, pressureLayerServices, consumptionLayerServices) {
        var vm = this;

        var dateArr = ['6/14/2015', '6/15/2015', '6/16/2015', '6/17/2015', '6/18/2015', '6/19/2015', '6/20/2015'];
        var timeArr = ["00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00"];

        vm.timeSliderLayers = [
            {
                label: 'Temperature Map',
                sliderLabel: 'Temperature Data',
                selected: false,
                startAnimation: animateTemperature
            },
            {
                label: 'Pressure Map',
                sliderLabel: 'Pressure Data',
                selected: false,
                startAnimation: animatePressure
            },
            {
                label: 'Consumption Map',
                sliderLabel: 'Consumption Data',
                selected: false,
                startAnimation: animateConsumption
            }
        ];

        vm.sliderData = {
            'temperature': {
                'sliderValue': 1,
                'watcher': null
            },
            'pressure': {
                'sliderValue': 1,
                'watcher': null
            },
            'consumption': {
                'sliderValue': 1,
                'watcher': null
            }
        };

        vm.sliderDataLabel = '';
        vm.sliderDate = '9/14/2015 0:00:00';

        vm.isPlayingAnimation = false;
        vm.sliderAnimationCallback = null;

        vm.initialize = initialize;
        vm.updateTimeSliderSelection = updateTimeSliderSelection;
        vm.playSliderAnimation = playSliderAnimation;
        vm.stopSliderAnimation = stopSliderAnimation;

        vm.initialize();

        function initialize () {
            tempLayerServices.initializeLayer(dateArr, timeArr);
            pressureLayerServices.initializeLayer(dateArr, timeArr);
            consumptionLayerServices.initializeLayer(dateArr, timeArr);

            $scope.$watch(function(){
                return vm.timeSliderLayers[0].selected;
            }, function() {
                isSliderShown();
                toggleTempLayer();
            });

            $scope.$watch(function () {
                return vm.timeSliderLayers[1].selected;
            }, function(){
                isSliderShown();
                togglePressureLayer();
            });

            $scope.$watch(function () {
                return vm.timeSliderLayers[2].selected;
            }, function(){
                isSliderShown();
                toggleConsumptionLayer();
            });
        }

        function isSliderShown() {
            $rootScope.showTimeSlider = hasSelectedALayer();
            vm.stopSliderAnimation();
        }

        function toggleTempLayer () {
            var sliderLayer = vm.timeSliderLayers[0];

            if (sliderLayer.selected) {
                // be sure hide other layers
                pressureLayerServices.hideLayer();
                consumptionLayerServices.hideLayer();

                vm.sliderDataLabel = sliderLayer.sliderLabel;

                // Watch for slider Value
                vm.sliderData.temperature.watcher = $scope.$watch( function () {
                    return vm.sliderData.temperature.sliderValue;
                }, function (newValue) {
                    tempLayerServices.showLayer(newValue);
                    updateTimeData(newValue);
                });

                showLegend(tempLayerServices.legendData);
            } else {
                tempLayerServices.hideLayer();
                // Disable Watcher
                disableWatcher(vm.sliderData.temperature.watcher);
                vm.sliderData.temperature.sliderValue = 1;

                hideLegend();
            }
        }

        function togglePressureLayer () {
            var sliderLayer = vm.timeSliderLayers[1];

            if (sliderLayer.selected) {
                tempLayerServices.hideLayer();
                consumptionLayerServices.hideLayer();

                vm.sliderDataLabel = sliderLayer.sliderLabel;

                // Watch for slider Value
                vm.sliderData.pressure.watcher = $scope.$watch(function () {
                    return vm.sliderData.pressure.sliderValue;
                }, function (newValue) {
                    pressureLayerServices.showLayer(newValue);
                    updateTimeData(newValue);
                });

                showLegend(pressureLayerServices.legendData);
            } else {
                pressureLayerServices.hideLayer();
                //// Disable Watcher
                disableWatcher(vm.sliderData.pressure.watcher);
                vm.sliderData.pressure.sliderValue = 1;

                hideLegend();
            }
        }

        function toggleConsumptionLayer () {
            var sliderLayer = vm.timeSliderLayers[2];

            if (sliderLayer.selected) {
                tempLayerServices.hideLayer();
                pressureLayerServices.hideLayer();

                vm.sliderDataLabel = sliderLayer.sliderLabel;

                // Watch for slider Value
                vm.sliderData.consumption.watcher = $scope.$watch(function () {
                    return vm.sliderData.consumption.sliderValue;
                }, function (newValue) {
                    consumptionLayerServices.showLayer(newValue);
                    updateTimeData(newValue);
                });

                showLegend(consumptionLayerServices.legendData);
            } else {
                consumptionLayerServices.hideLayer();
                //// Disable Watcher
                disableWatcher(vm.sliderData.consumption.watcher);
                vm.sliderData.consumption.sliderValue = 1;

                hideLegend();
            }
        }

        function updateTimeSliderSelection (position, entities) {
            angular.forEach(entities, function (item, index) {
                if (position != index)
                    item.selected = false;
            });
        }

        function playSliderAnimation () {
            vm.timeSliderLayers.forEach( function(layer){
                if(layer.selected) {
                    vm.isPlayingAnimation = true;
                    vm.sliderAnimationCallback = layer.startAnimation;
                    vm.sliderAnimationCallback();
                }
            });
        }

        function stopSliderAnimation () {
            vm.sliderAnimationCallback = null;
            vm.isPlayingAnimation = false;
        }

        /* Non Scope Functions */

        function animateTemperature () {
            if(vm.sliderData.temperature.sliderValue > 168 || !vm.isPlayingAnimation) {
                // dont reset slider value if being stopped manually
                if(vm.isPlayingAnimation) vm.sliderData.temperature.sliderValue = 1;

                vm.stopSliderAnimation();
                return;
            }

            //vm.sliderData.temperature.sliderValue++;
            vm.sliderData.temperature.sliderValue += 5;

            $timeout(animateTemperature, 1500);
        }

        function animatePressure() {
            if (vm.sliderData.pressure.sliderValue > 168 || !vm.isPlayingAnimation) {
                // dont reset slider value if being stopped manually
                if (vm.isPlayingAnimation) vm.sliderData.pressure.sliderValue = 1;

                vm.stopSliderAnimation();
                return;
            }

            vm.sliderData.pressure.sliderValue += 5;

            $timeout(animatePressure, 1500);
        }

        function animateConsumption() {
            if (vm.sliderData.consumption.sliderValue > 7 || !vm.isPlayingAnimation) {
                // dont reset slider value if being stopped manually
                if (vm.isPlayingAnimation) vm.sliderData.consumption.sliderValue = 1;

                vm.stopSliderAnimation();
                return;
            }

            vm.sliderData.consumption.sliderValue++;

            $timeout(animateConsumption, 1000);
        }

        function hasSelectedALayer () {
            var hasSelected = false;
            vm.timeSliderLayers.forEach( function (layer) {
                if (layer.selected) {
                    hasSelected = true;
                    return hasSelected;
                }
            });
            return hasSelected;
        }

        function showLegend (_legendData) {
            $rootScope.showLegend = true;
            $rootScope.showTimeSliderLegend = true;
            $rootScope.$broadcast('show-legend', {legendData: _legendData});
        }

        function hideLegend () {
            if(hasSelectedALayer()) return;

            $rootScope.$broadcast('hide-legend');
            $rootScope.showTimeSliderLegend = false;
            $rootScope.showLegend = false;
        }

        function updateTimeData (value) {
            var d = Math.ceil(value / 24) - 1;
            var t = (value - 1) % 24;

            vm.sliderDate = dateArr[d] === undefined
                            ? ''
                            : dateArr[d] + ' ' + timeArr[t];
        }

        function disableWatcher (watcher) {
            if (watcher) {
                watcher();
                watcher = null;
            }
        }
    }
}());