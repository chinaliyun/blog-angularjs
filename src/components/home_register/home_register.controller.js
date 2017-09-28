;(function(){
    angular.module('app')
    .controller('homeRegisterCtrl', controller)
    controller.$inject =[
		'$scope',
        'model',
        'dict'
	];

    function controller($scope, model, dict){
        init() 
        function init(){
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.register = function(){
            if($scope.phone.trim().length==0){
                dict.alert($scope,'手机号码不能为空')
                return false;
            }
            if($scope.passwd.trim().length==0){
                dict.alert($scope,'密码不能为空')
                return false;
            }
			if($scope.passwd.length < 6){
                dict.alert($scope,'密码长度不能少于6位')
                return false;
			}
			if(/^\d{6,11}$/.test($scope.passwd) || !/[A-Z]/.test($scope.passwd)){
                dict.alert($scope,'密码过于简单')
                return false;
			}
            var postData = {
                phone : $scope.phone,
                passwd : md5($scope.passwd)
            };
            model.register(postData).then(function(res){
                if(res.ok){
                    dict.go('home.login')
                }else{
                    dict.alert($scope, res.err.msg);
                }
            })
        }
    }
}())