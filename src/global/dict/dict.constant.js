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
        dict.menuList = [{
            "id": "1",
            "name": "产品管理",
            "menus": [{
                "id": "11",
                "name": "首页产品位置",
                "reload": "",
                "title": "index-products-position"
            }, {
                "id": "13",
                "name": "基金列表管理",
                "reload": "",
                "title": "funds-control"
            }, {
                "id": "14",
                "name": "组合列表管理",
                "reload": "",
                "title": "group-list-control"
            }, {
                "id": "15",
                "name": "网贷列表管理",
                "reload": "",
                "title": "net-loans-list"
            }]
        }, {
            "id": "2",
            "name": "理财运营管理",
            "menus": [/*{
                "id": "21",
                "name": "公告管理",
                "reload": "",
                "title": "notice-control"
            }, */{
                "id": "22",
                "name": "广告位管理",
                "reload": "",
                "title": "banner-control"
            }, /*{
                "id": "23",
                "name": "麦田管理",
                "reload": "",
                "title": "wheat-control"
            }, {
                "id": "24",
                "name": "兑换管理",
                "reload": "",
                "title": "conversion-control"
            },*/ {
                "id": "26",
                "name": "首页公告管理",
                "reload": "",
                "title": "index-message"
            }]
        }]
        dict.fundsTypeList = [{
            "type": "4",
            "name": "货币型基金"
        }, {
            "type": "1",
            "name": "股票型基金"
        }, {
            "type": "2",
            "name": "债券型基金"
        }, {
            "type": "3",
            "name": "混合型基金"
        }, {
            "type": "5",
            "name": "保本型基金"
        }, {
            "type": "6",
            "name": "指数型基金"
        }, {
            "type": "7",
            "name": "QDII型基金"
        }, {
            "type": "8",
            "name": "商品型基金"
        }, {
            "type": "9",
            "name": "短期理财"
        }];
        dict.pre = {
            stateList: [{
                "code": "all",
                "name": "全部"
            }, {
                "code": "1",
                "name": "上架"
            }, {
                "code": "2",
                "name": "下架"
            }],
            qudaoList: [{
                "code": "07",
                "name": "全部",
            }, {
                "code": "03",
                "name": "IOS",
            }, {
                "code": "04",
                "name": "Android",
            }],

            loansTypeList: [{
                "code": "all",
                "name": "不限"
            }, {
                "code": "1",
                "name": "7天"
            }, {
                "code": "2",
                "name": "14天"
            }, {
                "code": "3",
                "name": "28天"
            }, {
                "code": "4",
                "name": "3个月"
            }, {
                "code": "5",
                "name": "6个月"
            }, {
                "code": "6",
                "name": "9个月"
            }, {
                "code": "7",
                "name": "12个月"
            }, {
                "code": "8",
                "name": "18个月"
            }, {
                "code": "9",
                "name": "24个月"
            }]
        }
    }
})()