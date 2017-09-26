; (function () {
    angular.module('app')
        .controller('adminCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'model',
        'dict',
    ];

    function controller($scope, model, model, dict) {
        init()
        function init() {
           
            // getList();
        }
        
    }
}())