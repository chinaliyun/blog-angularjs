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