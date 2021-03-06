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
        $scope.keyUp = function (event) {
            if (event.keyCode == 13) {
                $scope.saveUserInfo();
            }
        }
        $scope.saveUserInfo = function(){
            var postData = {
                "ni_name" : $scope.user.niName
            };
            $scope.loading = true;
            model.saveUserInfo(postData).then(function(res){
                $scope.loading = false;
				if(res.ok){
                    cache.put('ni_name', $scope.user.niName)
                    dict.alert('个人资料修改成功')
				}else{

				}
			})
        }
    }
}())