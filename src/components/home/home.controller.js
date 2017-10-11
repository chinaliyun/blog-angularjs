;(function(){
    angular.module('app')
    .controller('homeCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
        'dict',
        'model'
    ];

    function controller($scope, $state, dict, model){
        init() 
        function init(){
            $scope.dict = dict;
            $scope.searchInput = "";
        }
        $scope.logout = function(){
            dict.clearToken();
            dict.cache.ni_name = '';
        }
        $scope.search = function(event){
            if(event.keyCode==13 && $scope.searchInput.trim()!=''){
                $scope.$broadcast('searchInputChange')
                event.target.blur();
            }
        }
        $scope.clearSearch= function(){
            $scope.searchInput = "";
            $scope.$broadcast('searchInputChange')
        }
        
    }
}())