;(function(){
    angular.module('app')
	.controller('adminArticleCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
            $scope.id = "";
			$scope.showPreview = true;
            $scope.title = "未定义标题";
            $scope.content = "";
            $scope.labelInput = [];
            $scope.labels = []
            getAllLabel()
		}
		function getAllLabel(){
            model.getLabelList().then(function(res){
                if(res.ok){
                    $scope.labels = res.ok
                }else{

                }
            })
        }
        $scope.togglePreview = function(){
            $scope.showPreview = !$scope.showPreview;
        }
        $scope.showDetail = function(item){
            $scope.content = item.content
            $scope.title = item.title
		}
		$scope.toggleLabel = function (item) {
            item.select = !item.select;
        }
        $scope.change = function () {
            // $scope.html = markdown.toHTML($scope.content, 'Gruber')
            
            // converter = new showdown.Converter(),
            // html = converter.makeHtml($scope.content);
            // $scope.html = html;
        }
        $scope.save = function () {
            var postData = {
                "title": $scope.title,
                "content": $scope.content,
                "labels" : []
            };
            $scope.labels.map(function (item, index){
                if(item.select){
                    postData.labels.push(item.code)
                }
            })
            model.saveArticle(postData).then(function(res){
                if(res.ok){

                }else{

                }
            })
        }
    }
}())