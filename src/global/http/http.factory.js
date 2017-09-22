;
(function() {

    angular.module('app')
        .factory('http', factory);

    factory.$inject = ['$http', '$q', '$timeout', 'cache', 'dict', '$rootScope'];

    function factory($http, $q, $timeout, cache, dict, $rootScope) {
        return {
            get: get,
            post: post,
            file: file
        }
        function post(desc, url, data, config) {
            var httpIndex = dict.httpQueue.length;
            var  httpTimeout = {
                def: null,
                timeout: function(){
                    this.def = $q.defer();

                    return this.def.promise
                }
            };
            dict.httpQueue[httpIndex] = Object.assign({}, httpTimeout);
            $rootScope.loading = true;
            $rootScope.loadingText = desc;
            var def = $q.defer();
            var baseData = {
                tokenId: cache.get('tokenId'),
                userId: cache.get('userId')
            };
            var baseConfig = {
                headers: {
                    "Content-Type": "text/plain",
                },
                timeout: dict.httpQueue[httpIndex].timeout(),
            };

            function serilaze(obj) {
                var str = '';
                angular.forEach(obj, function(item, index) {
                    str += index;
                    str += '=';
                    str += item;
                    str += '&';
                })
                console.log(str.slice(0, -1))
                return str.slice(0, -1);
            }
            var realUrl = dict.serverUrl + url;
            // var realData = data ? serilaze(Object.assign({}, baseData, data)) : serilaze(baseData);
            var realData = data ? Object.assign({}, baseData, data) : baseData;
            var realConfig = config ? Object.assign({}, baseConfig, config) : baseConfig;
            console.log(desc+' , ' + realUrl +  ' Req: ', realData)
            $http.post(realUrl, realData, realConfig)
                .then(function(res) {
                    $timeout(function() {
                        $rootScope.loading = false;
                    }, 500)
                    if (res.data.code == '901019') {
                        dict.go('login');
                    }
                    console.log(desc + ' Res: ', res.data)
                    def.resolve(res.data);
                    def.reject();
                }, function(err) {
                    $timeout(function() {
                        $rootScope.loading = false;
                    }, 500)
                    console.log(desc + ', 请求失败, err: ', err);
                    // dict.alert('网络异常：' + desc +'获取失败', true)
                    def.reject(err);
                });

            return def.promise;
        }
        function file(desc, url, data) {
            var def = $q.defer();
            $http({
                url: dict.serverUrl + url,
                method: "POST",
                headers: {
                    "Content-Type": undefined,
                },
                transformRequest: function() {
                    var formData = new FormData();
                    angular.forEach(data, function(item, index) {
                        if (item && index != 'extFields') {
                            if (angular.isArray(item)) {
                                angular.forEach(item, function(value, key) {
                                    formData.append(index, value)
                                })
                            } else {
                                formData.append(index, item);
                            }
                        }
                    })
                    formData.append('tokenId', cache.get('tokenId'))
                    formData.append('userId', cache.get('userId'))
                    return formData;
                }
            }).then(function(res) {
                if (res.data) {
                    console.log(desc+' , ' + url + ',' + url + ' Res: ', res.data)
                    def.resolve(res.data);

                } else {
                    console.log(desc + ',' + url + ', res.data不存在, err: ')
                    def.reject();
                }
            }, function(err) {
                console.log(desc + ',' + url + ', 请求失败, err: ')
                console.log(err)
                def.reject(err);
            })
            return def.promise;
        }

        function get(desc, url, data, config) {
            var def = $q.defer();
            $http.get(url)
                .then(function(res) {
                    if (res.data.code == '901019') {
                        dict.go('login');
                    }
                    if (res.data) {
                        console.log(desc + ',' + url + ' Res: ', res.data)
                        def.resolve(res.data);
                    } else {
                        console.log(desc + ',' + url + ', res.data不存在, err: ')
                        def.reject();
                    }

                }, function(err) {
                    console.log(desc + ',' + url + ', 请求失败, err: ', err)
                    def.reject(err);
                })
            return def.promise;
        }

        
    }
}())