; (function () {
    angular.module('app')
        .controller('adminLabelCtrl', controller)
    controller.$inject = [
        '$scope',
        'model',
        'dict',
    ];

    function controller($scope, model, dict) {
        init()
        function init() {
            $scope.name = "";
            getLabelList()
        }
        function getLabelList() {
            model.getLabelList().then(function (res) {
                if (res.ok) {
                    $scope.list = res.ok
                } else {

                }
            })
        }
        $scope.addLabel = function () {
            if ($scope.name.trim == '') {
                console.log('标签名不能为空')
                return false;
            }
            var postData = {
                name: $scope.name.trim()
            };
            model.saveLabel(postData).then(function (res) {
                if (res.ok) {
                    $scope.list.push(res.ok[0]);
                    $scope.name = "";
                } else {

                }
            })
        }
        $scope.deleteLabel = function (item, index) {
            var postData = {
                id: item.id
            };
            model.deleteLabel(postData).then(function (res) {
                if (res.ok) {
                    $scope.list.splice(index, 1);
                } else {

                }
            })
        }
    }
}())