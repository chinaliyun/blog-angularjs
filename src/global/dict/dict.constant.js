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