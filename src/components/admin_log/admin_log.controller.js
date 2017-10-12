; (function () {
    angular.module('app')
        .controller('adminLogCtrl', controller)
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
            $scope.showPreview = false;
            $scope.title = "";
            $scope.content = "";
            $scope.contentAnthor = 0;
            $scope.labels = []
            $scope.all_labels = [];
            if (!dict.cache.ni_name) {
                return false;
            }
            getArticleDetail();
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
                    $scope.all_labels = res.ok.all_labels;
                    angular.forEach(res.ok.labels, function(item, index){
                        angular.forEach(res.ok.all_labels, function(value, key){
                            if(item==value.name){
                                $scope.all_labels[key]['select'] = true;
                            }
                        })
                    })
                } else {

                }
            })
        }

        $scope.contentClick = function(event){
            $scope.contentAnthor = event.target.selectionStart;
        }
        $scope.contentChange = function(event){
            $scope.contentAnthor = $scope.content.length;
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
        $scope.addImage = function(){
            document.querySelector('input[type=file]').click()
        }
        $scope.fileChange = function(ele){
            if(ele.value){
                var postData = {
                    action : 'article',
                    file: ele.files[0]
                };
                model.uploadImg(postData).then(function(res){
                    if(res.ok){
                        if($scope.contentAnthor==0){
                            $scope.content = $scope.content+'![图片]('+res.ok.data.url+')\n\n';
                        }else{
                            var tmp1 = $scope.content.substr(0, $scope.contentAnthor);
                            var tmp2 = $scope.content.substr($scope.contentAnthor);
                            $scope.content = tmp1 + '\n\n![图片]('+res.ok.data.url+')\n\n' + tmp2;
                        }
                    }else{
                        dict.alert( '图片上传失败')
                    }
                    ele.value = null;
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
                    dict.alert( '请输入标签名').then(function(){
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
                            dict.alert( res.err.msg)
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
            $scope.all_labels.map(function (item, index) {
                if (item.select) {
                    postData.labels.push(item.id)
                }
            })
            model.saveArticle(postData).then(function (res) {
                if (res.ok) {
                    if (!$scope.id) {
                        // $scope.id = res.ok.id;
                        dict.alert( '发布新文章成功').then(function(){
                            dict.go('admin.article', {
                                id: res.ok.id
                            })
                        })
                    }else{
                        dict.alert( '保存成功')
                    }
                } else {
                    dict.alert( res.err.msg).then(function () {
                        if (res.err.code == 1) {

                        }
                    })

                }
            })
        }
    }
}())