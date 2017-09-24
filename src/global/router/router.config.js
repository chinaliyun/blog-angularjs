;(function(){

	angular
		.module('app')
		.config(configConfig)

	configConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>常规页面开始
			.state('home',{						
				url: '/home',
				templateUrl: './static/view/home.html',
				controller: 'homeCtrl'
			})
			.state('article',{						
				url: '/article/:id',
				templateUrl: './static/view/article.html',
				controller: 'articleCtrl'
			})
			.state('login',{				
				url: '/login',
				templateUrl: './static/view/login.html',
				controller: 'loginCtrl'
			})
			.state('admin',{						
				url: '/admin/label',
				templateUrl: './static/view/admin.html',
				controller: 'adminCtrl'
			})
		$urlRouterProvider.otherwise('/home')
	}

}());

