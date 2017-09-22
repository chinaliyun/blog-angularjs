;
(function() {

    angular.module('app')
        .factory('cache', factory);

    factory.$inject = ['$cookies'];

    function factory($cookies) {
        return {
        	get: get,
            put: put,
            remove: remove,
        }
        function get(key){
            return $cookies.get(md5(key));
        }
        function put(key,value){
            $cookies.put(md5(key),value);
        }
        function remove(key){
            $cookies.remove(md5(key));
        }

    }
}())
