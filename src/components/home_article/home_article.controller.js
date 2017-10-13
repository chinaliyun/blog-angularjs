; (function () {
    angular.module('app')
        .controller('homeArticleCtrl', controller)
    controller.$inject = [
        '$scope',
        '$state',
        'model',
        'dict'
    ];

    function controller($scope, $state, model, dict) {
        init()
        function init() {
            $scope.commentContent = "";
            $scope.detail = {};
            $scope.dict = dict;
            if ($state.params.id) {
                getArticleDetail()
            } else {
                dict.go('home.list')
            }
        }
        function getArticleDetail() {
            var postData = {
                id: $state.params.id,
                action: 'home'
            };
            model.getArticleDetail(postData).then(function (res) {
                if (res.ok) {
                    $scope.detail = res.ok
                } else {

                }
            })
        }
        $scope.addComment = function () {
            $scope.addLoading = true;
            if ($scope.commentContent.trim() == '') {
                dict.alert('评论内容不能为空');
                document.querySelector('textarea').focus();
            }
            var postData = {
                content: $scope.commentContent,
                article_id: $state.params.id
            };
            model.addComment(postData).then(function (res) {
                $scope.addLoading = false;
                if (res.ok) {
                    dict.alert('评论提交成功');
                    $scope.commentContent = "";
                    document.querySelector('textarea').focus();
                    $scope.detail.comments.push(res.ok)
                }
                else {
                    dict.alert(res.err.msg)
                }
            })
        }
        $scope.deleteComment = function(item, index){
            dict.alert('确定要删除该评论吗？', true, '确定', '取消').then(function(res){
                if(res.ok){
                    var postData = {
                        id: item.id
                    };
                    model.deleteComment(postData).then(function(res){
                        if(res.ok){
                            dict.alert('评论删除成功')
                            $scope.detail.comments.splice(index, 1);
                        }else{
                            dict.alert(res.err.msg)
                        }
                    })
                }
            })
            
        }
    }
}())