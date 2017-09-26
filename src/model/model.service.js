;(function(){
	angular.module('app')
		.service('model', service)
	service.$inject = ['http'];
	function service(http){
		this.getArticleList = function(data){
			return http.post('获取文章列表', '/blog/article_list', data)
		}
		this.saveArticle = function(data){
			return http.post('保存文章', '/blog/save', data)
		}
		this.getArticleDetail = function(data){
			return http.post('获取文章详情', '/blog/get_detail', data)
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
	}
}())