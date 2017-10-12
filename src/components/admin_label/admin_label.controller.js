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
        $scope.keyUp = function(e){
            if(event.keyCode==13){
                $scope.addLabel();
            }
        }
        $scope.addLabel = function () {
            if ($scope.name.trim() == '') {
                dict.alert( '标签名称不能为空')
                return false;
            }
            var postData = {
                name: $scope.name.trim()
            };
            model.saveLabel(postData).then(function (res) {
                if (res.ok) {
                    $scope.list.push(res.ok[0]);
                    $scope.name = "";
                    document.querySelector('.addLabel').focus();
                    dict.alert( '标签添加成功')
                } else {
                    dict.alert( res.err.msg)
                }
            })
        }
        $scope.deleteLabel = function (item, index) {
            dict.alert('确定要删除这个标签吗?', true, '确定', '取消').then(function(res){
                if(res.ok){
                    var postData = {
                        id: item.id,
                        name: item.name
                    };
                    model.deleteLabel(postData).then(function (res) {
                        if (res.ok) {
                            $scope.list.splice(index, 1);
                            dict.alert( '标签删除成功');
                        } else {
                            dict.alert( res.err.msg);
                        }
                    })
                }else{

                }
            })
            
        }
    }
}())