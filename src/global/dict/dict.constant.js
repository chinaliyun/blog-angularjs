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
        'cache',
        'dict'
    ];

    function runRun(cache, $q, http, $state, $timeout, cache, dict) {
        dict.httpQueue = [];
        dict.url = [];
        dict.cache = {}
        dict.clearToken = function(){
            cache.remove('phone')
            cache.remove('usid')
            cache.remove('token')
            cache.remove('u_name')
            cache.remove('group')
        }
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
            console.log(params);
            if (params) {
                $state.go(route, params)
            } else {
                $state.go(route)
            }
        }
        dict.reload = function(){
            $state.reload();
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
                def.resolve({ok: true})
            };
            scope.alertCancel = function () {
                scope.alertVisiable = false;
                scope.alertShowBtn =  false;
                def.resolve({cancel: true});
            };
            if(!scope.alertShowBtn){
                $timeout(function(){
                    scope.alertOk();
                }, 1000)
            }
            return def.promise;
        }

        dict.confirm = function(scope, header, placeholder, okText, cancelText){
            scope.confirmVisiable = true;
            var def = $q.defer();
            scope.confirmVisiable = true;
            scope.confirmHeader= header || '请输入： ';
            scope.confirmPlaceholder = placeholder || '';
            scope.confirmOkText = okText || '确定';
            scope.confirmCancelText = cancelText || '取消';
            scope.confirmOk = function () {
                scope.confirmVisiable = false;
                def.resolve({ok: scope.confirmInput})
            };
            scope.confirmCancel = function () {
                scope.confirmVisiable = false;
                def.resolve({cancel: true});
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