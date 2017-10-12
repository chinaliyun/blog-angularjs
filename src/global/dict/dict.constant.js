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
        '$timeout',
        'cache',
        'dict'
    ];

    function runRun(cache, $q, http, $state, $rootScope, $timeout, cache, dict) {
        dict.httpQueue = [];
        dict.url = [];
        dict.cache = {}
        dict.clearToken = function(){
            cache.remove('ni_name')
            cache.remove('usid')
            cache.remove('token')
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
            if (params) {
                $state.go(route, params)
            } else {
                $state.go(route)
            }
        }
        dict.reload = function(){
            $state.reload();
        }
        dict.alert = function(text, showBtn, okText, cancelText){
            $rootScope.alertVisiable = true;
            var def = $q.defer();
            $rootScope.alertVisiable = true;
            $rootScope.alertShowBtn = showBtn || false;
            $rootScope.alertOkText = okText || '确定';
            $rootScope.alertCancelText = cancelText || '';
            $rootScope.alertContext = text || '没有可以显示的内容';
            $rootScope.alertOk = function () {
                $rootScope.alertVisiable = false;
                $rootScope.alertShowBtn =  false;
                def.resolve({ok: true})
            };
            $rootScope.alertCancel = function () {
                $rootScope.alertVisiable = false;
                $rootScope.alertShowBtn =  false;
                def.resolve({cancel: true});
            };
            if(!$rootScope.alertShowBtn){
                $timeout(function(){
                    $rootScope.alertOk();
                }, 1000)
            }
            return def.promise;
        }

        dict.confirm = function(header, placeholder, okText, cancelText){
            $rootScope.confirmVisiable = true;
            var def = $q.defer();
            $rootScope.confirmVisiable = true;
            $rootScope.confirmHeader= header || '请输入： ';
            $rootScope.confirmPlaceholder = placeholder || '';
            $rootScope.confirmOkText = okText || '确定';
            $rootScope.confirmCancelText = cancelText || '取消';
            $rootScope.confirmOk = function () {
                $rootScope.confirmVisiable = false;
                def.resolve({ok: $rootScope.confirmInput})
            };
            $rootScope.confirmCancel = function () {
                $rootScope.confirmVisiable = false;
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