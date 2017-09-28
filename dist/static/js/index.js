if (typeof Object.assign != 'function') {
	Object.assign = function (target) {
		'use strict';
		if (target == null) {
			throw new TypeError('Cannot convert undefined or null to object');
		}

		target = Object(target);
		for (var index = 1; index < arguments.length; index++) {
			var source = arguments[index];
			if (source != null) {
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
		}
		return target;
	};
}

function isMobile() {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		return true;
	} else {
		return false
	}
}
window.onload = function () {
	if(!isMobile()){
		document.querySelector('html').className='pc'
	}
	// document.getElementsByTagName('html')[0].style.fontSize = window.getComputedStyle(document.getElementsByTagName('body')[0]).width.slice(0,-2)/10+'px';
	
}
;(function(){
	angular.module('app',[
		'ngCookies',
		'ui.router'
	])
}())
; (function () {
    angular.module('app')
        .controller('adminCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'model',
        'dict',
    ];

    function controller($scope, model, model, dict) {
        init()
        function init() {
           
            // getList();
        }
        
    }
}())
;(function(){
    angular.module('app')
	.controller('adminArticleCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
        'model',
        'dict'
	];

    function controller($scope, $state, model, dict){
        init() 
        function init(){
            $scope.id = "";
			$scope.showPreview = true;
            $scope.title = "";
            $scope.content = "";
            $scope.labels = []
            if($state.params.id){
                getArticleDetail();
            }else{
                getAllLabel()
            }
        }
        function getArticleDetail(){
            var postData = {
                id: $state.params.id
            };
            model.getArticleDetail(postData).then(function(res){
                if(res.ok){
                    $scope.id = res.ok.id;
                    $scope.title = res.ok.title;
                    $scope.content = res.ok.content;
                    $scope.labels = res.ok.labels;
                }else{

                }
            })
        }
		function getAllLabel(){
            model.getLabelList().then(function(res){
                if(res.ok){
                    $scope.labels = res.ok
                }else{

                }
            })
        }
        $scope.togglePreview = function(){
            $scope.showPreview = !$scope.showPreview;
        }
        $scope.showDetail = function(item){
            $scope.content = item.content
            $scope.title = item.title
		}
		$scope.toggleLabel = function (item) {
            item.select = !item.select;
        }
        $scope.change = function () {
            // $scope.html = markdown.toHTML($scope.content, 'Gruber')
            
            // converter = new showdown.Converter(),
            // html = converter.makeHtml($scope.content);
            // $scope.html = html;
        }
        $scope.save = function () {
            var postData = {
                "id": $scope.id,
                "title": $scope.title,
                "content": $scope.content,
                "labels" : []
            };
            $scope.labels.map(function (item, index){
                if(item.select){
                    postData.labels.push({
                        id: item.id,
                        name: item.name
                    })
                }
            })
            model.saveArticle(postData).then(function(res){
                if(res.ok){
                    if(!$scope.id){
                        // $scope.id = res.ok.id;
                        dict.go('admin.article', {
                            id: res.ok.id
                        })
                    }
                }else{
                    alert(res.err.msg)
                }
            })
        }
    }
}())
; (function () {
    angular.module('app')
        .controller('adminLabelCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'dict',
    ];

    function controller($scope, model, dict) {
        init()
        function init() {
            $scope.name = "";
            getLabelList()
        }
        function getLabelList() {
            model.getLabelList().then(function (res) {
                if (res.ok) {
                    $scope.list = res.ok
                } else {

                }
            })
        }
        $scope.addLabel = function () {
            if ($scope.name.trim == '') {
                console.log('标签名不能为空')
                return false;
            }
            var postData = {
                name: $scope.name.trim()
            };
            model.saveLabel(postData).then(function (res) {
                if (res.ok) {
                    $scope.list.push(res.ok[0]);
                    $scope.name = "";
                    document.querySelector('.addLabel').focus();
                } else {

                }
            })
        }
        $scope.deleteLabel = function (item, index) {
            var postData = {
                id: item.id
            };
            model.deleteLabel(postData).then(function (res) {
                if (res.ok) {
                    $scope.list.splice(index, 1);
                } else {

                }
            })
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('adminListCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
            $scope.list = [];
            $scope.categoryList = [];
            $scope.articleCount = 0;
			getList();
		}
		
        function getList(){
            model.getArticleList($scope.search).then(function(res){
				if(res.ok){
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
					var count = 0;
					res.ok.category.map(function(item, index){
						count+=parseInt(item.sum);
					})
                    $scope.labelCount = count;
                    var count = 0;
                    res.ok.category.map(function(item, index){
                        count+=parseInt(item.sum)
                        console.log(item)
                    })
                    $scope.articleCount = count;
				}else{

				}
			})
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('homeCtrl', controller)
    controller.$inject =[
        '$scope',
        'dict',
    ];

    function controller($scope, dict){
        init() 
        function init(){
            
        }
        
    }
}())

;(function(){
    angular.module('app')
    .controller('homeLoginCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
		'cache',
		'dict'
	];

    function controller($scope, model, cache, dict){
        init() 
        function init(){
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.login = function(){
            if($scope.phone.trim().length==0){
                dict.alert($scope,'手机号码不能为空')
                return false;
            }
            if($scope.passwd.trim().length==0){
                dict.alert($scope,'密码不能为空')
                return false;
            }
            var postData = {
                phone : $scope.phone,
                passwd : md5($scope.passwd)
            };
            model.login(postData).then(function(res){
                if(res.ok){
                    cache.put('phone', res.ok.phone)
					cache.put('usid', res.ok.usid)
					cache.put('token', res.ok.token)
					dict.go('home.list');
                }else{
                    dict.alert($scope, res.err.msg);
                }
            })
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('homeArticleCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
        'model',
        'dict'
    ];

    function controller($scope, $state, model, dict){
        init() 
        function init(){
            if($state.params.id){
                getArticleDetail()
            }else{
                dict.go('home.list')
            }
        }
        function getArticleDetail(){
            var postData = {
                id: $state.params.id
            };
            model.getArticleDetail(postData).then(function(res){
                if(res.ok){
                    $scope.detail = res.ok
                }else{

                }
            })
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('homeListCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
			$scope.search = {
				pageNo: 0,
				type : '',
			}
			$scope.labelCount = 0;
            getList();
		}
		function getList(){
			model.getArticleList($scope.search).then(function(res){
				if(res.ok){
					$scope.list = res.ok.list;
					$scope.categoryList = res.ok.category;
					var count = 0;
					res.ok.category.map(function(item, index){
						count+=parseInt(item.sum);
					})
					$scope.labelCount = count;
				}else{

				}
			})
		}
    }
}())
;(function(){
    angular.module('app')
    .controller('homeRegisterCtrl', controller)
    controller.$inject =[
		'$scope',
        'model',
        'dict'
	];

    function controller($scope, model, dict){
        init() 
        function init(){
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.register = function(){
            if($scope.phone.trim().length==0){
                dict.alert($scope,'手机号码不能为空')
                return false;
            }
            if($scope.passwd.trim().length==0){
                dict.alert($scope,'密码不能为空')
                return false;
            }
			if($scope.passwd.length < 6){
                dict.alert($scope,'密码长度不能少于6位')
                return false;
			}
			if(/^\d{6,11}$/.test($scope.passwd) || !/[A-Z]/.test($scope.passwd)){
                dict.alert($scope,'密码过于简单')
                return false;
			}
            var postData = {
                phone : $scope.phone,
                passwd : md5($scope.passwd)
            };
            model.register(postData).then(function(res){
                if(res.ok){
                    dict.go('home.login')
                }else{
                    dict.alert($scope, res.err.msg);
                }
            })
        }
    }
}())
;(function(){
	angular.module('app')
		.directive('appAlert', directive)
	directive.$inject = [
		'$timeout'
	];
	function directive($timeout){
		var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: './static/view/app_alert.html',
        };
        return directive;

        function link($scope, element, attrs) {
            
        }
	}
}())
;
(function() {

    angular.module('app')
        .factory('cache', factory);

    factory.$inject = ['$cookies'];

    function factory($cookies) {
        return {
        	get: get,
            put: put,
            remove: remove,
        }
        function get(key){
            return $cookies.get(key);
            // return $cookies.get(md5(key));
        }
        function put(key,value){
            $cookies.put(key,value);
            // $cookies.put(md5(key),value);
        }
        function remove(key){
            $cookies.remove(key);
            // $cookies.remove(md5(key));
        }

    }
}())

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
				url: '/login',
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
			.state('login',{				
				url: '/login',
				templateUrl: './static/view/login.html',
				controller: 'loginCtrl'
			})
			.state('admin',{	
				url: '/admin',
				templateUrl: './static/view/admin.html',
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
		})
	}

}());
;(function(){
    angular.module('app')
        .filter('html', filter);
    
        filter.$inject = [
            '$sce'
        ]
        function filter($sce){
            return function(data){
                converter = new showdown.Converter(),
                html = converter.makeHtml(data);
                return $sce.trustAsHtml(html)
            }
        }
}())
;
(function () {

    angular.module('app')
        .constant('dict', {})
        .run(runRun);
    runRun.$inject = ['cache',
        '$q',
        'http',
        '$state',
        '$timeout',
        'dict'
    ];

    function runRun(cache, $q, http, $state, $timeout, dict) {
        dict.httpQueue = [];
        dict.cache = {}
        dict.pageSize = ["10", "20", "30"]
        dict.checkToken = function () {
            var def = $q.defer();
            if (cache.get('tokenId')) {
                console.log('token存在')
                def.resolve();
            } else {
                console.log('token不存在')
                def.reject()
            }
            return def.promise;
        }
        dict.go = function (route, params) {
            if (params) {
                $state.go(route, params)
            } else {
                $state.go(route)
            }
        }
        dict.alert = function(scope, text, showBtn, okText, cancelText){
            scope.alertVisiable = true;
            var def = $q.defer();
            scope.alertVisiable = true;
            scope.alertShowBtn = showBtn || false;
            scope.alertOkText = okText || '确定';
            scope.alertCancelText = cancelText || '';
            scope.alertContext = text || '没有可以显示的内容';
            scope.alertOk = function () {
                scope.alertVisiable = false;
                scope.alertShowBtn =  false;
                def.resolve()
            };
            scope.alertCancel = function () {
                scope.alertVisiable = false;
                scope.alertShowBtn =  false;
                def.reject();
            };
            if(!scope.alertShowBtn){
                $timeout(function(){
                    scope.alertOk();
                }, 1000)
            }
            return def.promise;
        }
        dict.loading = function (context) {
            if (context) {
                $rootScope.loadingText = context;
                $rootScope.loading = true;
            } else {
                $rootScope.loadingText = '';
                $rootScope.loading = false;
            }

        }
        // 表单验证
        dict.verify = {
            mobile: function (data) {
                return /^1\d{10}$/.test(data)
            },
            email: function (data) {
                return /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(data)
            },
            url: function (data) {
                return /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(data)
            }
        }
        dict.pre = {
        }
    }
})()
; (function () {
    'use strict';

    angular.module('app')
        .factory('http', factory);

    factory.$inject = ['$http', '$q', '$timeout', 'cache', 'dict', '$rootScope'];

    function factory($http, $q, $timeout, cache, dict, $rootScope) {
        return {
            get: get,
            post: post,
            file: file
        }
        function get(desc, url, data, config, loading) {
            // desc:         接口说明
            // url：         接口地址
            // data    表单参数
            // config：      配置信息
            // loading：     true   显示loading 
            // loading：     false  不显示loading(默认) 
            if (loading) {
                dict.loading(1)
            }
            var def = $q.defer();
            $http.get(url)
                .then(function (res) {
                    if (loading) {
                        $timeout(function () {
                            dict.loading()
                        }, 300)
                    }
                    console.log(desc + ',' + url + ' Res ', res.data)
                    def.resolve(res.data);

                }, function (err) {
                    if (loading) {
                        $timeout(function () {
                            dict.loading()
                        }, 300)
                    }
                    console.log(desc + ',' + url + ', 请求失败, err: ', err)
                    def.reject(err);
                })
            return def.promise;
        }
        function file(desc, url, data, config, loading) {
            // desc:         接口说明
            // url：         接口地址
            // data：        表单参数
            // config：      配置信息
            // loading：     true   显示loading 
            // loading：     false  不显示loading(默认) 
            if (loading) {
                dict.loading(1)
            }
            var def = $q.defer();
            $http({
                url: "http://127.0.0.1:8888"+ url,
                // url: 'http://localhost:8888/index.php',
                method: "POST",
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: function () {
                    var formData = new FormData();
                    angular.forEach(data, function (item, index) {
                        if (angular.isArray(item)) {
                            angular.forEach(item, function (value, key) {
                                formData.append(index, value)
                            })
                        } else {
                            formData.append(index, item);
                        }
                    })
                    formData.append('token', cache.get('token'));
                    formData.append('appid', cache.get('appid'));
                    formData.append('userId', cache.get('userId'));
                    return formData;
                }
            }).then(function (res) {
                if (loading) {
                    $timeout(function () {
                        dict.loading()
                    }, 300)
                }

                if (res.data.code === 101) {
                    dict.go('login')
                    dict.clearCache();
                    def.reject();
                } else {
                    console.log(desc + ',' + url + ' Res ', res.data)
                    def.resolve(res.data);
                }

            }, function (err) {
                if (loading) {
                    $timeout(function () {
                        dict.loading()
                    }, 300)
                }
                console.log(desc + ',' + url + ', 请求失败, err: ', err)
                def.reject(err);
            })
            return def.promise;
        }
        function post(desc, url, data, config, loading) {
            // desc:         接口说明
            // url：         接口地址
            // data    表单参数
            // config：      配置信息
            // loading：     true   显示loading 
            // loading：     false  不显示loading(默认)
            if (loading) {
                // 打开loading层层
                dict.loading(1)
                dict.listEmpty()
            }
            var def = $q.defer();
            var baseData = {
                token: cache.get('token'),
                uid: cache.get('userId'),
                appid: cache.get('appid'),
            };
            var baseConfig = {
                headers: {
                    "Content-Type":"text/plain",
                },
                // timeout: 3000,
            };
            function serilaze(obj) {
                var str = '';
                angular.forEach(obj, function (item, index) {
                    str += index;
                    str += '=';
                    str += item;
                    str += '&';
                })
                console.log(str.slice(0, -1))
                return str.slice(0, -1);
            }
            var realUrl = "http://127.0.0.1:8888"+ url;
            // var realData = data ? serilaze(Object.assign({}, baseData, data)) : serilaze(baseData);
            var realData = data ? Object.assign({}, baseData, data) : baseData;
            var realConfig = config ? Object.assign({}, baseConfig, config) : baseConfig;
            console.log(desc + ' Req: ', Object.assign({}, { realUrl: realUrl }, realData))
            $http.post(realUrl, realData, realConfig)
                .then(function (res) {
                    if (loading) {
                        dict.loading()
                    }
                    // if (res.data.code === 101) {
                    //     dict.go('login')
                    //     dict.clearCache();
                    //     def.resolve({ err: { code: res.data.code, msg: res.data.msg } })
                    //     return false;
                    // }
                    if (res.data.code != 0 || res.data.data===undefined) {
                        def.resolve({ err: { code: res.data.code, msg: res.data.msg } })
                       console.log({ err: { code: res.data.code, msg: res.data.msg } })
                        return false;
                    }
                    console.log(desc + ' Res: ', res.data)
                    console.log({ ok: res.data.data!='' ? res.data.data : true })
                    def.resolve({ ok: res.data.data!='' ? res.data.data : true });

                }, function (err) {
                    if (loading) {
                        dict.loading()
                    }
                    console.log(desc + ' Err: ', err);
                    def.resolve({ err: err });
                });

            return def.promise;
        }
    }
}())

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