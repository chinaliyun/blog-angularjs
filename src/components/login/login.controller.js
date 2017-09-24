;(function(){
    angular.module('app')
    .controller('loginCtrl', controller)
    controller.$inject =['$scope'];

    function controller($scope){
        init() 
        function init(){
            console.log(11)
        }
    }
}())