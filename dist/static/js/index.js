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
;(function(){
    angular.module('app')
    .controller('adminCtrl', controller)
    controller.$inject =[
        '$scope',
        'http'
    ];

    function controller($scope, http){
        init() 
        function init(){
        }
        $scope.change = function(){
            $scope.html = markdown.toHTML($scope.detail, 'Gruber')
        }
        $scope.save = function(){
            var postData = {
                "title" : $scope.title,
				"content" : $scope.detail,
				// "labels" : 
            };
            http.post('保存文章内容','/blog/save', postData).then(function(res){

            })
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('articleCtrl', controller)
    controller.$inject =['$scope'];

    function controller($scope){
        init() 
        function init(){
            // console.log(11)
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('homeCtrl', controller)
    controller.$inject =['$scope'];

    function controller($scope){
        init() 
        function init(){
            console.log(11)
        }
    }
}())
;(function(){
    angular.module('app')
    .controller('loginCtrl', controller)
    controller.$inject =['$scope'];

    function controller($scope){
        init() 
        function init(){
            console.log(11)
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
            return $cookies.get(md5(key));
        }
        function put(key,value){
            $cookies.put(md5(key),value);
        }
        function remove(key){
            $cookies.remove(md5(key));
        }

    }
}())

;(function(){
    angular.module('app')
        .filter('html', filter);
    
        filter.$inject = [
            '$sce'
        ]
        function filter($sce){
            return function(data){
                return $sce.trustAsHtml(data)
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
        '$rootScope',
        'dict'
    ];

    function runRun(cache, $q, http, $state, $rootScope, dict) {
        dict.serverUrl = 'http://101.37.21.176:70';
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
        dict.alert = function (text, showBtn, okText, cancelText) {
            var def = $q.defer();
            $rootScope.alertVisibility = true;
            $rootScope.alertShowBtn = showBtn || false;
            $rootScope.alertOkText = okText || '确定';
            $rootScope.alertCancelText = cancelText || '';
            $rootScope.alertContext = text || '没有可以显示的内容';
            $rootScope.alertOk = function () {
                $rootScope.alertVisibility = false;
                $rootScope.alertShowBtn =  false;
                def.resolve()
            };
            $rootScope.alertCancel = function () {
                $rootScope.alertVisibility = false;
                $rootScope.alertShowBtn =  false;
                def.reject();
            };

            return def.promise;
        }
        dict.confirm = function (text, showBtn, okText, cancelText) {
            var def = $q.defer();
            $rootScope.confirmVisibility = true;
            $rootScope.confirmContext = text || '没有内容';
            $rootScope.confirmOkText = okText || '确定';
            $rootScope.confirmCancelText = cancelText || '取消';
            $rootScope.confirmOk = function (data) {
                $rootScope.confirmVisibility = false;
                def.resolve(data)
            };
            $rootScope.confirmCancel = function () {
                $rootScope.confirmVisibility = false;
                def.reject();
            };
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
                url: "http://blogapi.com"+ url,
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
            var realUrl = "http://blogapi.com"+ url;
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
                    // if (res.data.code != 0 || !res.data.data) {
                    //     def.resolve({ err: { code: res.data.code, msg: res.data.msg } })
                    //     return false;
                    // }
                    console.log(desc + ' Res: ', res.data)
                    console.log(desc + ' Data: ', res.data.data)
                    def.resolve({ ok: res.data.data });

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