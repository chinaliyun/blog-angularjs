;(function(){
    angular.module('app')
    .controller('adminInfoCtrl', controller)
    controller.$inject =[
		'$scope',
        'model',
        'dict',
        'cache'
	];

    function controller($scope, model, dict, cache){
        init() 
        function init(){
            $scope.loading = false;
            $scope.user = {
                niName: ""
            };
            if(cache.get('ni_name')){
                $scope.user.niName = cache.get('ni_name')
            }
		}
        $scope.saveUserInfo = function(){
            var postData = {
                "ni_name" : $scope.user.niName
            };
            $scope.loading = true;
            model.saveUserInfo(postData).then(function(res){
				if(res.ok){
                    cache.put('ni_name', $scope.user.niName)
                    dict.alert('个人资料修改成功')
				}else{

				}
			})
        }
    }
}())