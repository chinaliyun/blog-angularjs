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
				pageNo: "",
				type: '',
			}
			$scope.countCurrentType = 0;
			$scope.labelCount = 0;
			$scope.firstGet = true;
			getList();
		}
		$scope.$on('searchInputChange', function () {
			$scope.search.pageNo = 0
			$scope.search.like = $scope.searchInput;
			$scope.search.type = ""
			getList();
		})
		$scope.selectType = function (item) {
			console.log(item)
			$scope.search.pageNo = 0
			if (item) {
				$scope.search.type = item.code;
				$scope.countCurrentType = item.count;
			} else {
				$scope.search.type = ""
				$scope.countCurrentType = $scope.labelCount;
			}
			getList();
		}
		function getList(push) {
			$scope.showLoading = true;
			var postData = {
				pageNo: $scope.search.pageNo,
				type: $scope.search.type,
				like: $scope.search.like,
				action: 'home'
			};
			model.getArticleList(postData).then(function (res) {
				$scope.showLoading = false;
				if (res.ok) {
					if(push){
						$scope.list = $scope.list.concat(res.ok.list);
					}else{
						$scope.list = res.ok.list;
					}
					$scope.categoryList = res.ok.category;
					var count = 0;
					res.ok.category.map(function (item, index) {
						count += parseInt(item.count);
					})
					$scope.labelCount = count;
					if($scope.firstGet){
						$scope.countCurrentType = count;
						$scope.firstGet = false;
					}
					if(res.ok.list.length>0){
						$scope.search.pageNo = res.ok.list[res.ok.list.length-1]['id']
					}
				} else {
					$scope.list = []
				}
			})
			var scrollT = [];
			window.onscroll = function(event){
				if($scope.list.length >= parseInt($scope.countCurrentType)){
					return false;
				}
				var ele = document.querySelector('.last_item');
				scrollT.unshift(document.querySelector('html').scrollTop);
				scrollT.splice(3,1);
				if(scrollT.length>2 && scrollT[0]>scrollT[1] && !$scope.showLoading){
					if(ele.getBoundingClientRect().top < window.innerHeight){
						// console.log(1)
						getList(true);
					}
				}
			}
		}
	}
}())