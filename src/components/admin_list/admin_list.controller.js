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
			getList();
		}
		
        function getList(){
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
                        console.log(item)
                    })
                    $scope.articleCount = count;
				}else{

				}
			})
        }
    }
}())