;(function(){
    angular.module('app')
    .controller('homeCtrl', controller)
    controller.$inject =['$scope'];

    function controller($scope){
        init() 
        function init(){
            console.log(11)
        }
    }
}())