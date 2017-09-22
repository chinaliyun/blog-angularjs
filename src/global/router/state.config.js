;(function () {

    angular
        .module('app')
        .run(runRun)

	runRun.$inject = ['dict','$rootScope', '$state'];

	function runRun(dict, $rootScope, $state){
		// 检测路由更新成功事件
		$rootScope.$on('$stateChangeSuccess', function(e){
			// 重置页面滚动条高度为
			// 取消弹出层
			$rootScope.alertVisibility = false;
			$rootScope.confirmVisibility = false;
			$rootScope.loading = false;
		})
	}

}());