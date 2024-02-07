(function() {
    'use strict';

    angular.module('lunchChecker', [])
    .controller('lunchController', lunchController);

    lunchController.$inject = ['$scope'];
    function lunchController($scope) {
        $scope.lunches = '';
        $scope.message = '';

        $scope.checkLunch = function() {
            var lunches = $scope.lunches.split(',')

            if($scope.lunches !== '') {
                if(lunches.length>3) $scope.message = 'Too much!';
                else $scope.message = 'Enjoy!';
            } else $scope.message = 'Please enter data first';
        };
    };

})();