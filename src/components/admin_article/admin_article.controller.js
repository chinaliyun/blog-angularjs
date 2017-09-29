; (function () {
    angular.module('app')
        .controller('adminArticleCtrl', controller)
    controller.$inject = [
        '$scope',
        '$state',
        'model',
        'dict'
    ];

    function controller($scope, $state, model, dict) {
        init()
        function init() {
            $scope.id = "";
            $scope.showPreview = true;
            $scope.title = "";
            $scope.content = "";
            $scope.labels = []
            if ($state.params.id) {
                getArticleDetail();
            } else {
                getAllLabel()
            }
        }
        function getArticleDetail() {
            var postData = {
                id: $state.params.id
            };
            model.getArticleDetail(postData).then(function (res) {
                if (res.ok) {
                    $scope.id = res.ok.id;
                    $scope.title = res.ok.title;
                    $scope.content = res.ok.content;
                    $scope.labels = res.ok.labels;
                } else {

                }
            })
        }
        function getAllLabel() {
            model.getLabelList().then(function (res) {
                if (res.ok) {
                    $scope.labels = res.ok
                } else {

                }
            })
        }
        $scope.togglePreview = function () {
            $scope.showPreview = !$scope.showPreview;
        }
        $scope.showDetail = function (item) {
            $scope.content = item.content
            $scope.title = item.title
        }
        $scope.toggleLabel = function (item) {
            item.select = !item.select;
        }
        $scope.addLabel = function () {
            addLabel();
        }
        $scope.fileChange = function(ele){
            if(ele.value){
                var postData = {
                    action : 'article',
                    file: ele.files[0]
                };
                model.uploadImg(postData).then(function(res){

                })
            }
        }
        function addLabel(){
            dict.confirm($scope, '请输入标签名').then(function(res){
                // 点了确定，但是内容为空 
                // 点了取消
                // 点了确定内容不为空
                console.log(res)
                if(res.cancel){
                    return false;
                }
                if(res.ok==''){
                    dict.alert($scope, '请输入标签名').then(function(){
                        if(res.ok){
                            addLabel();
                        }
                    })
                }else{
                    var postData = {
                        name: res.ok.trim()
                    };
                    model.saveLabel(postData).then(function (res) {
                        if (res.ok) {
                            $scope.list.push(res.ok[0]);
                        } else {
                            dict.alert($scope, res.err.msg)
                        }
                    })
                }
            })
        }
        $scope.save = function () {
            var postData = {
                "id": $scope.id,
                "title": $scope.title,
                "content": $scope.content,
                "labels": [],
                "action": 'admin'
            };
            $scope.labels.map(function (item, index) {
                if (item.select) {
                    postData.labels.push({
                        id: item.id,
                        name: item.name
                    })
                }
            })
            model.saveArticle(postData).then(function (res) {
                if (res.ok) {
                    if (!$scope.id) {
                        // $scope.id = res.ok.id;
                        dict.alert($scope, '发布新文章成功').then(function(){
                            dict.go('admin.article', {
                                id: res.ok.id
                            })
                        })
                    }else{
                        dict.alert($scope, '保存成功')
                    }
                } else {
                    dict.alert($scope, res.err.msg).then(function () {
                        if (res.err.code == 1) {

                        }
                    })

                }
            })
        }
    }
}())