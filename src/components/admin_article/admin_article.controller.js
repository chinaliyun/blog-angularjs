;(function(){
    angular.module('app')
	.controller('adminArticleCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
        'model',
        'dict'
	];

    function controller($scope, $state, model, dict){
        init() 
        function init(){
            $scope.id = "";
			$scope.showPreview = true;
            $scope.title = "";
            $scope.content = "";
            $scope.labels = []
            if($state.params.id){
                getArticleDetail();
            }else{
                getAllLabel()
            }
        }
        function getArticleDetail(){
            var postData = {
                id: $state.params.id
            };
            model.getArticleDetail(postData).then(function(res){
                if(res.ok){
                    $scope.id = res.ok.id;
                    $scope.title = res.ok.title;
                    $scope.content = res.ok.content;
                    $scope.labels = res.ok.labels;
                }else{

                }
            })
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
                "id": $scope.id,
                "title": $scope.title,
                "content": $scope.content,
                "labels" : []
            };
            $scope.labels.map(function (item, index){
                if(item.select){
                    postData.labels.push({
                        id: item.id,
                        name: item.name
                    })
                }
            })
            model.saveArticle(postData).then(function(res){
                if(res.ok){
                    if(!$scope.id){
                        // $scope.id = res.ok.id;
                        dict.go('admin.article', {
                            id: res.ok.id
                        })
                    }
                }else{
                    alert(res.err.msg)
                }
            })
        }
    }
}())