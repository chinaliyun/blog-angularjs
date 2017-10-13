;(function(){
	angular.module('app')
		.service('model', service)
	service.$inject = ['http'];
	function service(http){
		this.getArticleList = function(data){
			return http.post('获取文章列表', '/article/article_list', data)
		}
		this.saveArticle = function(data){
			return http.post('保存文章', '/article/save_article', data)
		}
		this.getArticleDetail = function(data){
			return http.post('获取文章详情', '/article/get_detail', data)
		}
		this.countArticle= function(data){
			return http.post('获取文章类别', '/article/count_article', data)
		}
		this.deleteArticle = function(data){
			return http.post('删除文章', '/article/delete', data)
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
		this.editpass = function(data){
			return http.post('重置密码', '/user/editpass', data)
		}
		this.login = function(data){
			return http.post('用户登录', '/user/login', data)
		}
		this.uploadImg = function(data){
			return http.file('上传图片', '/upload/index', data);
		}
		this.addComment = function(data){
			return http.post('添加评论', '/article/add_comment', data)
		}
		this.deleteComment = function(data){
			return http.post('删除评论', '/article/delete_comment', data)
		}
		this.getAllUser = function(data){
			return http.post('所有用户', '/user/all_user', data)
		}
		this.sendVcode = function(data){
			return http.post('发送验证码', '/user/send_email_code', data)
		}
	}
}())