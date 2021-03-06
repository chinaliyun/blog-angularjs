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
        $scope.selectType = function(id, index){
            if(id){
                $scope.search.type=id
                $scope.searchTypeIndex = index
            }else{
                $scope.search.type=""
            }
            getList();
            
        }
        function countArticle(){
            $scope.showLoading1 = true;
            $scope.showLoading2 = true;
            // 先获取文章数目
            model.countArticle().then(function(res){
                $scope.showLoading1 = false;
                if(res.ok){
                    $scope.categoryList = res.ok;
                    if(res.ok.length==0){
                        dict.alert('您还没有文章，快去创建吧!').then(function(res){
                            dict.go('admin.article')
                        })
                        return false;
                    }
                    var count = 0;
                    res.ok.map(function(item, index){
                        count+=parseInt(item.count)
                    })
                    $scope.articleCount = count;
                    $scope.search.type = res.ok[0].code;
                    $scope.searchTypeIndex = 0;
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
                            dict.alert('删除文章成功')
                            $scope.categoryList[$scope.searchTypeIndex].count -=1;
                            countArticleSum();
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
            $scope.showLoading2 = true;
            model.getArticleList(postData).then(function(res){
                $scope.showLoading2 = false;
				if(res.ok){
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
                    countArticleSum();
				}else{

				}
			})
        }
        function countArticleSum(){
            // 计算文章总数
            var count = 0;
            $scope.categoryList.map(function(item, index){
                count+=parseInt(item.count)
            })
            $scope.articleCount = count;
        }
    }
}())