;(function(){
    angular.module('app')
    .controller('adminCtrl', controller)
    controller.$inject =[
        '$scope',
        'http'
    ];

    function controller($scope, http){
        init() 
        function init(){
        }
        $scope.change = function(){
            $scope.html = markdown.toHTML($scope.detail, 'Gruber')
        }
        $scope.save = function(){
            var postData = {
                "title" : $scope.title,
				"content" : $scope.detail,
				// "labels" : 
            };
            http.post('保存文章内容','/blog/save', postData).then(function(res){

            })
        }
    }
}())