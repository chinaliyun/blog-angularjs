; (function () {
    angular.module('app')
        .controller('homeRegisterCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'dict'
    ];

    function controller($scope, model, dict) {
        init()
        function init() {
            $scope.email = "";
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.keyUp = function (event) {
            if (event.keyCode == 13) {
                $scope.register();
            }
        }
        $scope.sendVcode = function () {
            if (!$scope.sendLoading) {
                $scope.sendLoading = true;
            }else{
                return false;
            }
            if ($scope.email.trim().length == 0) {
                $scope.sendLoading = true;
                dict.alert('邮箱不能为空')
                return false;
            }
            if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test($scope.email.trim())) {
                $scope.sendLoading = true;
                dict.alert('邮箱格式错误')
                return false;
            }
            var postData = {
                action: 'register',
                email: $scope.email
            };
            model.sendVcode(postData).then(function (res) {
                $scope.sendLoading = false;
                if (res.ok) {
                    dict.alert('验证码已发送至您的邮箱，请前往查看')
                } else {
                    dict.alert(res.err.msg)
                }
            })
        }
        $scope.register = function () {
            if ($scope.registerLoading) {
                return false;
            }
            if ($scope.email.trim().length == 0) {
                dict.alert('邮箱不能为空')
                return false;
            }
            if (!/^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/i.test($scope.email.trim())) {
                dict.alert('邮箱格式错误')
                return false;
            }
            if ($scope.passwd.trim().length == 0) {
                dict.alert('密码不能为空')
                return false;
            }

            // 由于传递过去的是md5字符串，后台不断做密码复杂度判断，因此前端这里密码的检测不能删！！
            if ($scope.passwd.length < 6) {
                dict.alert('密码长度不能少于6位')
                return false;
            }
            if (/^\d{6,11}$/.test($scope.passwd) || !/[A-Z]/.test($scope.passwd)) {
                dict.alert('密码过于简单')
                return false;
            }
            // 验证码不能为空
            if ($scope.vcode.trim() == '') {
                dict.alert('验证码不能为空')
                return false;
            }
            // 验证码格式不对
            if ($scope.vcode.trim().length != 6) {
                dict.alert('验证码格式错误')
                return false;
            }
            var postData = {
                email: $scope.email,
                vcode: $scope.vcode,
                passwd: md5($scope.passwd)
            };
            $scope.registerLoading = true;
            model.register(postData).then(function (res) {
                $scope.registerLoading = false;
                if (res.ok) {
                    dict.alert('注册成功').then(function () {
                        dict.go('home.login')
                    })
                } else {
                    dict.alert(res.err.msg);
                }
            })
        }
    }
}())