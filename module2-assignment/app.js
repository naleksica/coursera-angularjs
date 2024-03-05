(function() {
    'use strict';

    angular.module('shoppingApp', [])
    .controller('toBuyController', toBuyController)
    .controller('alreadyBoughtController', alreadyBoughtController)
    .provider('shoppingList', shoppingListProvider);

    // BUY LIST ===========================================
    toBuyController.$inject = ['shoppingList', '$rootScope'];
    function toBuyController(shoppingList, $rootScope) {
        var buyList = this;

        buyList.items = shoppingList.getItems();

        buyList.markItem = function(index) {
            shoppingList.buyItem(index);

            buyList.allItemsBought = shoppingList.allItemsBought();

            $rootScope.$broadcast('itemMarkedAsBought');
        }
    }

    // BOUGHT LIST ==========================================
    alreadyBoughtController.$inject = ['shoppingList', '$scope'];
    function alreadyBoughtController(shoppingList, $scope) {
        var boughtList = this;

        boughtList.items = shoppingList.getItems();

        $scope.$on('itemMarkedAsBought', function() {
            boughtList.oneItemBought = shoppingList.oneItemBought();
        });
    }

    // SERVICE ===================================================
    function shoppingListService() {
        var service = this;
      
        var items = [
            {name: 'Bananas', quantity: 5, bought: false}, 
            {name: 'Carrots', quantity: 9, bought: false}, 
            {name: 'Pineapples', quantity: 2, bought: false}, 
            {name: 'Grapes', quantity: 7, bought: false}, 
            {name: 'Watermelon', quantity: 1, bought: false}
        ];

        service.getItems = function() {
            return items;
        }

        service.buyItem = function(index) {
            items[index].bought = true;
        }

        service.allItemsBought = function() {
            return items.every(item => item.bought === true);
        }

        service.oneItemBought = function() {
            return items.some(item => item.bought === true);
        }
    }

    // PROVIDER =================================================
    function shoppingListProvider() {
        var provider = this;

        provider.$get = function () {
            var shoppingList = new shoppingListService();
        
            return shoppingList;
        };
    }

})();