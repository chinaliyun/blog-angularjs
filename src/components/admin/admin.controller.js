; (function () {
    angular.module('app')
        .controller('adminCtrl', controller)
    controller.$inject = [
        '$scope',
        'http'
    ];

    function controller($scope, http) {
        init()
        function init() {
            $scope.title = "";
            $scope.content = "";
            $scope.labelInput = [];
            $scope.labels = [
                {
                    code: 1,
                    name: 'javascript'
                }, {
                    code: 2,
                    name: 'angular'
                }, {
                    code: 3,
                    name: 'apache'
                }, {
                    code: 4,
                    name: 'linux'
                }
            ]
        }
        $scope.change = function () {
            // $scope.html = markdown.toHTML($scope.content, 'Gruber')
            
            converter = new showdown.Converter(),
            html = converter.makeHtml($scope.content);
            $scope.html = html;
        }
        $scope.save = function () {
            var postData = {
                "title": $scope.title,
                "content": $scope.content,
                "labels" : []
            };
            $scope.labels.map(function (item, index){
                if(item.select){
                    postData.labels.push(item.code)
                }
            })
            http.post('保存文章内容', '/blog/save', postData).then(function (res) {

            })
        }
        $scope.addLabel = function (item) {
            item.select = !item.select;
            console.log(item)
        }
    }
}())