; (function () {
    angular.module('app')
        .controller('adminCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'cache',
        'dict',
    ];

    function controller($scope, model, cache, dict) {
        init()
        function init() {
            $scope.dict = dict;
            if (!dict.cache.ni_name) {
                dict.go('home.login', {
                    id: 'admin.new'
                })
            }
            if(cache.get('group')==0){
                $scope.labelControl = true;
            }
        }
        $scope.newArticle = function(){
            dict.go('admin.article');
            $scope.$broadcast("newArticle")
        }

    }
}())