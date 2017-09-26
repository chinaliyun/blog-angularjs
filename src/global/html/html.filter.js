;(function(){
    angular.module('app')
        .filter('html', filter);
    
        filter.$inject = [
            '$sce'
        ]
        function filter($sce){
            return function(data){
                converter = new showdown.Converter(),
                html = converter.makeHtml(data);
                return $sce.trustAsHtml(html)
            }
        }
}())