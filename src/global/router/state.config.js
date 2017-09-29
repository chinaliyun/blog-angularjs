;(function () {

    angular
        .module('app')
        .run(runRun)

	runRun.$inject = [
		'dict',
		'$rootScope', 
		'$state',
		'cache'
	];

	function runRun(dict, $rootScope, $state, cache){
		// 检测路由更新成功事件
		$rootScope.$on('$stateChangeSuccess', function(e){
			dict.url.unshift($state.current.name)
			if(dict.url.length>3){
				dict.url.splice(-1, 1);
			}
			// 重置页面滚动条高度为
			// 取消弹出层
			if(cache.get('phone')){
				dict.isLogin = true;
				dict.cache.user_phone = cache.get('phone');
			}else{
				dict.isLogin = false;
			}
		})
	}

}());