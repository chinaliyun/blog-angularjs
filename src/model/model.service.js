;(function(){
	angular.module('app')
		.service('model', service)
	service.$inject = ['http'];
	function service(http){
		this.getArticleList = function(data){
			return http.post('获取文章列表', '/article/article_list', data)
		}
		this.saveArticle = function(data){
			return http.post('保存文章', '/article/save', data)
		}
		this.getArticleDetail = function(data){
			return http.post('获取文章详情', '/article/get_detail', data)
		}
		this.getLabelList = function(data){
			return http.post('获取标签列表', '/constant/all_label', data)
		}
		this.saveLabel = function(data){
			return http.post('保存标签', '/constant/add_label', data)
		}
		this.deleteLabel = function(data){
			return http.post('删除标签', '/constant/delete_label', data)
		}
		this.register = function(data){
			return http.post('注册账号', '/user/register', data)
		}
		this.login = function(data){
			return http.post('用户登录', '/user/login', data)
		}
	}
}())