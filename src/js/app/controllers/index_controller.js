(function(){
'use strict';

angular.module('demoApp')
    .controller('indexController', ['$rootScope', '$mdSidenav', indexController]);

    function indexController ($rootScope, $mdSidenav) {
        var vm = this;

        // Show Treasure Overlay Spinner
        $rootScope.spinner = {
            active: false
        };

        $rootScope.showTimeSlider = false;

        vm.toggleLayerPanel = buildToggler('layerPanel');
        vm.toggleSearchPanel = buildToggler('searchPanel');
        vm.toggleTimeSliderPanel = buildToggler('timeSliderPanel');
        vm.closeSideNav = closeSideNav;

        vm.lastSideNavOpenId = '';

        function buildToggler(navID) {
            return function () {
                if (vm.lastSideNavOpenId && vm.lastSideNavOpenId !== navID) {
                    closeSideNav(vm.lastSideNavOpenId);
                }

                $mdSidenav(navID).toggle();

                vm.lastSideNavOpenId = navID;
            }
        }

        function closeSideNav(navID) {
            $mdSidenav(navID).close();
        }
    }
}());