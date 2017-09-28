;(function(){
	angular.module('app')
		.directive('appAlert', directive)
	directive.$inject = [
		'$timeout'
	];
	function directive($timeout){
		var directive = {
            link: link,
            restrict: 'EA',
            templateUrl: './static/view/app_alert.html',
        };
        return directive;

        function link($scope, element, attrs) {
            
        }
	}
}())