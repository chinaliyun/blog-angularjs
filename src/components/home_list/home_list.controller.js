;(function(){
    angular.module('app')
    .controller('homeListCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
			$scope.search = {
				pageNo: 0,
				type : '',
			}
			$scope.labelCount = 0;
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
				}else{

				}
			})
		}
    }
}())