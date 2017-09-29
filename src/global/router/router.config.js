;(function(){

	angular
		.module('app')
		.config(configConfig)

	configConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configConfig($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home',{	
				url: '/home',
				templateUrl: './static/view/home.html',
				controller: 'homeCtrl',
			})
			.state('home.login',{
				url: '/login/:id',
				templateUrl: './static/view/home_login.html',
				controller: 'homeLoginCtrl'
			})
			.state('home.register',{
				url: '/register',
				templateUrl: './static/view/home_register.html',
				controller: 'homeRegisterCtrl'
			})
			.state('home.list',{
				url: '/list',
				templateUrl: './static/view/home_list.html',
				controller: 'homeListCtrl'
			})
			.state('home.article',{
				url: '/article/:id',
				templateUrl: './static/view/home_article.html',
				controller: 'homeArticleCtrl'
			})
			.state('admin',{	
				url: '/admin',
				templateUrl: './static/view/admin.html',
				controller: 'adminCtrl'
			})
			.state('admin.new',{	
				url: '/new',
				templateUrl: './static/view/admin_article.html',
				controller: 'adminArticleCtrl'
			})
			.state('admin.article',{	
				url: '/article/:id',
				templateUrl: './static/view/admin_article.html',
				controller: 'adminArticleCtrl'
			})
			.state('admin.list',{	
				url: '/list',
				templateUrl: './static/view/admin_list.html',
				controller: 'adminListCtrl'
			})
			.state('admin.label',{	
				url: '/label',
				templateUrl: './static/view/admin_label.html',
				controller: 'adminLabelCtrl'
			})
		$urlRouterProvider.otherwise('/home/list')
	}

}());

