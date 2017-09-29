;(function(){
	angular.module('app')
		.directive('appConfirm', directive)
	directive.$inject = [
		'$timeout'
	];
	function directive($timeout){
		var directive = {
            link: link,
			restrict: 'EA',
			replace: true,
            templateUrl: './static/view/app_confirm.html',
        };
        return directive;

        function link($scope, element, attrs) {
			init()
			function init(){
				$scope.confirmInput = "";
			}
        }
	}
}())