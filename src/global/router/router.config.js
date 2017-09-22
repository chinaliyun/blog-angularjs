;(function(){

	angular
		.module('app')
		.config(configConfig)

	configConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>常规页面开始
			.state('login',{							//>>>>>>>>>>>>>主页
				url: '/login/',
				templateUrl: 'view/login.html',
				controller: 'loginCtrl'
			})
			.state('main',{						//>>>>>>>>>>>>>登录页
				url: '/main/:router',
				templateUrl: 'view/main.html',
				controller: 'mainCtrl'
			})
		$urlRouterProvider.otherwise('/main/')
	}

}());

