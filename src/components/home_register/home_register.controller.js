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
            $scope.uname = "";
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.keyUp = function(event){
            if(event.keyCode==13){
                $scope.register();
            }
        }
        $scope.register = function(){

            if($scope.uname.trim().length==0){
                dict.alert('用户名不能为空')
                return false;
            }
			// if($scope.uname.length > 10){
            //     dict.alert('用户名长度不能多余10位')
            //     return false;
			// }
            // if($scope.phone.trim().length==0){
            //     dict.alert('手机号码不能为空')
            //     return false;
            // }
            if($scope.passwd.trim().length==0){
                dict.alert('密码不能为空')
                return false;
            }
			// if($scope.passwd.length < 6){
            //     dict.alert('密码长度不能少于6位')
            //     return false;
			// }
			if(/^\d{6,11}$/.test($scope.passwd) || !/[A-Z]/.test($scope.passwd)){
                dict.alert('密码过于简单')
                return false;
			}
            var postData = {
                phone : $scope.phone,
                passwd : md5($scope.passwd),
                uname: $scope.uname
            };
            model.register(postData).then(function(res){
                if(res.ok){
                    dict.alert( '注册成功').then(function(){
                        dict.go('home.login')
                    })
                }else{
                    dict.alert( res.err.msg);
                }
            })
        }
    }
}())