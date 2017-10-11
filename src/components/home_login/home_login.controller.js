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
            $scope.uname = "";
            $scope.passwd = "";
        }
        $scope.keyUp = function(event){
            if(event.keyCode==13){
                $scope.login();
            }
        }
        $scope.login = function(){
            if($state.params.id){
                dict.alert($scope, '欢迎回来').then(function(){
                    dict.go($state.params.id)
                })
            }else{
                dict.go('home.list');
            }
            if($scope.uname.trim().length==0){
                dict.alert($scope,'用户名不能为空')
                return false;
            }
            if($scope.passwd.trim().length==0){
                dict.alert($scope,'密码不能为空')
                return false;
            }
            var postData = {
                uname : $scope.uname,
                passwd : md5($scope.passwd)
            };
            model.login(postData).then(function(res){
                if(res.ok){
                    cache.put('ni_name', res.ok.ni_name)
					cache.put('usid', res.ok.usid)
					cache.put('token', res.ok.token)
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