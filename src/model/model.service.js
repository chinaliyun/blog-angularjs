;(function(){
	angular.module('app')
		.service('model', service)
	service.$inject = ['http'];
	function service(http){
		this.getArticleList = function(data){
			return http.post('获取文章列表', '/article/articleList', data)
		}
		this.saveArticle = function(data){
			return http.post('保存文章', '/article/saveArticle', data)
		}
		this.getArticleDetail = function(data){
			return http.post('获取文章详情', '/article/getDetail', data)
		}
		this.countArticle= function(data){
			return http.post('获取文章类别', '/article/countArticle', data)
		}
		this.deleteArticle = function(data){
			return http.post('删除文章', '/article/deleteArticle', data)
		}
		this.getLabelList = function(data){
			return http.post('获取标签列表', '/constant/getAllLabel', data)
		}
		this.saveLabel = function(data){
			return http.post('保存标签', '/constant/addLabel', data)
		}
		this.deleteLabel = function(data){
			return http.post('删除标签', '/constant/deleteLabel', data)
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
			return http.file('上传图片', '/user/upload', data);
		}
		this.addComment = function(data){
			return http.post('添加评论', '/article/AddComment', data)
		}
		this.deleteComment = function(data){
			return http.post('删除评论', '/article/DeletComment', data)
		}
		this.getAllUser = function(data){
			return http.post('所有用户', '/user/getAllUser', data)
		}
		this.sendVcode = function(data){
			return http.post('发送验证码', '/user/sendMailCode', data)
		}
		this.saveUserInfo = function(data){
			return http.post('修改用户信息', '/user/saveUserInfo', data)
		}
	}
}())