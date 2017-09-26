;(function(){
    angular.module('app')
    .controller('adminListCtrl', controller)
    controller.$inject =[
		'$scope',
		'model',
	];

    function controller($scope, model){
        init() 
        function init(){
			getList();
		}
		
        function getList(){
            model.getArticleList().then(function(res){
                if(res.ok){
                    $scope.list = res.ok.list
                }else{

                }
            })
        }
    }
}())