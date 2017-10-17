; (function () {
    angular.module('app')
        .controller('homeLoginCtrl', controller)
    controller.$inject = [
        '$scope',
        '$state',
        'model',
        'cache',
        'dict'
    ];

    function controller($scope, $state, model, cache, dict) {
        init()
        function init() {
            
            $scope.email = "";
            $scope.passwd = "";
        }
        $scope.keyUp = function (event) {
            if (event.keyCode == 13) {
                $scope.login();
            }
        }
        $scope.login = function () {
            if($scope.loginLoading){
                return false;
            }
            if ($scope.email.trim().length == 0) {
                dict.alert('用户名不能为空')
                return false;
            }
            if ($scope.passwd.trim().length == 0) {
                dict.alert('密码不能为空')
                return false;
            }
            var postData = {
                email: $scope.email,
                passwd: md5($scope.passwd)
            };
            $scope.loginLoading = true;
            model.login(postData).then(function (res) {
                $scope.loginLoading = false;
                if (res.ok) {
                    cache.put('ni_name', res.ok.ni_name)
                    cache.put('usid', res.ok.usid)
                    cache.put('token', res.ok.token)
                    cache.put('group', res.ok.group)
                    dict.alert('欢迎回来').then(function () {
                        // if ($state.params.id) {
                        //     dict.go($state.params.id)
                        // } else {
                        //     dict.go('home.list');
                        // }
                       window.history.back();
                    })
                } else {
                    dict.alert(res.err.msg);
                }
            })
        }
    }
}())