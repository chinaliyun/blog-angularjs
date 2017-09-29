;(function(){
    angular.module('app')
    .controller('adminListCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
            $scope.list = [];
            $scope.categoryList = [];
            $scope.articleCount = 0;
            $scope.search = {
                pageNo: 0,
                type: '',
            }
            getList();
		}
        $scope.selectType = function(id){
            if(id){
                $scope.search.type=id
            }else{
                $scope.search.type=""
            }
            getList();
            
        }
        function getList(){
            var postData = {
                action: 'admin',
                pageNo: $scope.search.pageNo,
                type: $scope.search.type
            };
            model.getArticleList($scope.search).then(function(res){
				if(res.ok){
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
					var count = 0;
					res.ok.category.map(function(item, index){
						count+=parseInt(item.sum);
					})
                    $scope.labelCount = count;
                    var count = 0;
                    res.ok.category.map(function(item, index){
                        count+=parseInt(item.sum)
                    })
                    $scope.articleCount = count;
				}else{

				}
			})
        }
    }
}())