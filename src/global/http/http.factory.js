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
                url: "{POST_PATH}" + url,
                // url: 'http://localhost:8888/index.php',
                method: "POST",
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: function () {
                    console.log(desc + ' Req: ', Object.assign({}, { realUrl: url }, data))
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
                    formData.append('usid', cache.get('usid'));
                    return formData;
                }
            }).then(function (res) {
                console.log(desc + ',' + url + ' Res ', res.data)
                if (loading) {
                    $timeout(function () {
                        dict.loading()
                    }, 300)
                }
                if (res.data.code === 1) {
                    dict.go('home.login', {
                        id: dict.url[0]
                    })
                    dict.clearToken();
                    return false;
                }
                if (res.data.code != 0 || res.data.data === undefined) {
                    def.resolve({ err: { code: res.data.code, msg: res.data.msg } })
                    console.log({ err: { code: res.data.code, msg: res.data.msg } })
                    return false;
                }
                def.resolve({ ok:  res.data.data != '' ? res.data.data : true});

            }, function (err) {
                if (loading) {
                    dict.loading()
                }
                console.log(desc + ' Err: ', err);
                def.resolve({ err: err });
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
                usid: cache.get('usid')
            };
            var baseConfig = {
                headers: {
                    "Content-Type": "text/plain, charset=utf-8",
                },
                responseType: "json"
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
            var realUrl = "{POST_PATH}" + url;
            // var realData = data ? serilaze(Object.assign({}, baseData, data)) : serilaze(baseData);
            var realData = data ? Object.assign({}, baseData, data) : baseData;
            var realConfig = config ? Object.assign({}, baseConfig, config) : baseConfig;
            console.log(desc + ' Req: ', Object.assign({}, { realUrl: realUrl }, realData))
            $http.post(realUrl, realData, realConfig)
                .then(function (res) {
                    console.log(desc + ' Res: ', res.data)
                    if (res.data.code === 1) {
                        dict.go('home.login', {
                            id: dict.url[0]
                        })
                        dict.clearToken();
                        return false;
                    }
                    if (res.data.code != 0 || res.data.data === undefined) {
                        def.resolve({ err: { code: res.data.code, msg: res.data.msg } })
                        console.log({ err: { code: res.data.code, msg: res.data.msg } })
                        return false;
                    }
                    console.log({ ok: res.data.data != '' ? res.data.data : true })
                    def.resolve({ ok: res.data.data != '' ? res.data.data : true });

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
