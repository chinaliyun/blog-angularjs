;(function(){
    angular.module('app')
    .controller('homeLoginCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
		'model',
		'cache',
		'dict'
	];

    function controller($scope, $state, model, cache, dict){
        init() 
        function init(){
            $scope.phone = "";
            $scope.passwd = "";
        }
        $scope.login = function(){
            if($scope.phone.trim().length==0){
                dict.alert($scope,'手机号码不能为空')
                return false;
            }
            if($scope.passwd.trim().length==0){
                dict.alert($scope,'密码不能为空')
                return false;
            }
            var postData = {
                phone : $scope.phone,
                passwd : md5($scope.passwd)
            };
            model.login(postData).then(function(res){
                if(res.ok){
                    cache.put('phone', res.ok.phone)
					cache.put('usid', res.ok.usid)
					cache.put('token', res.ok.token)
					cache.put('u_name', res.ok.u_name)
					cache.put('group', res.ok.group)
                    if($state.params.id){
                        dict.alert($scope, '欢迎回来').then(function(){
                            dict.go($state.params.id)
                        })
                        
                    }else{
                        dict.go('home.list');
                    }
                }else{
                    dict.alert($scope, res.err.msg);
                }
            })
        }
    }
}())