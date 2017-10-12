;(function(){
    angular.module('app')
    .controller('adminListCtrl', controller)
    controller.$inject =[
		'$scope',
        'model',
        'dict'
	];

    function controller($scope, model, dict){
        init() 
        function init(){
            $scope.list = [];
            $scope.categoryList = [];
            $scope.articleCount = 0;
            $scope.search = {
                pageNo: 0,
                type: '',
            }
            countArticle();
		}
        $scope.selectType = function(id){
            if(id){
                $scope.search.type=id
            }else{
                $scope.search.type=""
            }
            getList();
            
        }
        function countArticle(){
            // 先获取文章数目
            model.countArticle().then(function(res){
                if(res.ok){
                    $scope.categoryList = res.ok;
                    var count = 0;
                    res.ok.map(function(item, index){
                        count+=parseInt(item.count)
                    })
                    $scope.articleCount = count;
                    $scope.search.type = res.ok[0].code;
                    getList();
                }else{
                    dict.alert( '获取列表失败，请稍后重试');
                }
            })
        }
        $scope.delete = function(item, index){
            dict.alert( '确定要删除该文章吗？', true, '确定', '取消').then(function(res){
                if(res.ok){
                    var postData = {
                        id: item.id
                    }; 
                    model.deleteArticle(postData).then(function(res){
                        if(res.ok){
                            $scope.list.splice(index, 1);
                        }else{
                            dict.alert( '删除失败，请稍后重试')
                        }
                    })
                }
            })
            
        }
        function getList(){
            var postData = {
                action: 'admin',
                pageNo: $scope.search.pageNo,
                type: $scope.search.type
            };
            model.getArticleList(postData).then(function(res){
				if(res.ok){
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
                    var count = 0;
                    res.ok.category.map(function(item, index){
                        count+=parseInt(item.count)
                    })
                    $scope.articleCount = count;
				}else{

				}
			})
        }
    }
}())