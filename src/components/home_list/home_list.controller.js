; (function () {
	angular.module('app')
		.controller('homeListCtrl', controller)
	controller.$inject = [
		'$scope',
		'model',
	];

	function controller($scope, model) {
		init()
		function init() {
			$scope.search = {
				pageNo: 0,
				type: '',
			}
			$scope.labelCount = 0;
			getList();
		}
		$scope.$on('searchInputChange', function () {
			$scope.search.pageNo = 0
			$scope.search.like = $scope.searchInput;
			$scope.search.type = ""
			getList();
		})
		$scope.selectType = function (id) {
			$scope.search.pageNo = 0
			if (id) {
				$scope.search.type = id
			} else {
				$scope.search.type = ""
			}
			getList();
		}
		function getList() {
			var postData = {
				pageNo: $scope.search.pageNo,
				type: $scope.search.type,
				like: $scope.search.like,
				action: 'home'
			};
			model.getArticleList(postData).then(function (res) {
				if (res.ok) {
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
					var count = 0;
					res.ok.category.map(function (item, index) {
						count += parseInt(item.sum);
					})
					$scope.labelCount = count;
					if(res.ok.list.length>0){
						$scope.search.pageNo = res.ok.list[res.ok.list.length-1]['id']
					}
				} else {
					$scope.list = []
				}
			})
		}
	}
}())