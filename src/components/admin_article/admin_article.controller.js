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
            $scope.showPreview = false;
            $scope.title = "";
            $scope.content = "";
            $scope.contentAnthor = 0;
            $scope.labels = []
            $scope.all_labels = [];
            $scope.changed = false;
            $scope.backup = {
                title: "",
                all_labels: [],
                content: ""
            };
            if (!dict.cache.ni_name) {
                return false;
            }
            if ($state.params.id) {
                $scope.id = $state.params.id
            }
            getArticleDetail();
        }
        $scope.$on('newArticle', function () {
            if ($scope.title != '' || $scope.content != '') {
                if ($scope.changed) {
                    dict.alert('您的操作还未保存，确定要重新开始吗？', true, '确定', '取消').then(function (res) {
                        if (res.ok) {
                            resetArticle()
                        }
                    })
                } else {
                    resetArticle()
                }

            }
        })
        function resetArticle() {
            $scope.title = "";
            $scope.id = "";
            $scope.content = "";
            angular.forEach($scope.all_labels, function (item, index) {
                item.select = false;
            })
            $scope.changed = false;
        }
        function getArticleDetail() {
            var postData = {
                id: $state.params.id,
                action: 'admin'
            };
            model.getArticleDetail(postData).then(function (res) {
                if (res.ok) {
                    if ($scope.id) {
                        $scope.id = res.ok.id;
                        $scope.title = res.ok.title;
                        $scope.content = res.ok.content;
                        $scope.labels = res.ok.labels;
                    }
                    $scope.all_labels = res.ok.all_labels;
                    angular.forEach(res.ok.labels, function (item, index) {
                        angular.forEach(res.ok.all_labels, function (value, key) {
                            if (item == value.name) {
                                $scope.all_labels[key]['select'] = true;
                            }
                        })
                    })
                } else {
                    if(res.err.code==4){
                        dict.alert('文章不存在，请检查后再试').then(function(res){
                            dict.go('admin.list');
                        })
                    }else{
                       dict.alert(res.err.msg)
                    }
                }
            })
        }

        $scope.contentClick = function (event) {
            $scope.contentAnthor = event.target.selectionStart;
        }
        $scope.titleChange = function () {
            $scope.changed = true;
        }
        $scope.contentChange = function (event) {
            $scope.contentAnthor = $scope.content.length;
            $scope.changed = true;
        }
        $scope.togglePreview = function () {
            $scope.showPreview = !$scope.showPreview;
        }
        $scope.showDetail = function (item) {
            $scope.content = item.content
            $scope.title = item.title
        }
        $scope.toggleLabel = function (item) {
            $scope.changed = true;
            // 最多只能添加5个标签
            if (!item.select) {
                var flag = 0;
                $scope.all_labels.map(function (item, index) {
                    if (item.select) {
                        flag++;
                    }
                })
                if (flag == 5) {
                    dict.alert('最多只能添加5个标签')
                    return false;
                }
            }
            item.select = !item.select;
        }
        $scope.addLabel = function () {
            addLabel();
        }
        $scope.addImage = function () {
            document.querySelector('input[type=file]').click()
        }
        $scope.fileChange = function (ele) {
            if (ele.value) {
                var postData = {
                    action: 'article',
                    file: ele.files[0],
                    action_id: $scope.id
                };
                model.uploadImg(postData).then(function (res) {
                    if (res.ok) {
                        if ($scope.contentAnthor == 0) {
                            $scope.content = $scope.content + '![图片](' + res.ok.url + ')\n\n';
                        } else {
                            var tmp1 = $scope.content.substr(0, $scope.contentAnthor);
                            var tmp2 = $scope.content.substr($scope.contentAnthor);
                            $scope.content = tmp1 + '\n\n![图片](' + res.ok.url + ')\n\n' + tmp2;
                        }
                        if (!$scope.id) {
                            $scope.id = res.ok.id
                            $scope.title = res.ok.title
                        }
                        // 上传成功后自动保存一次
                        save(function (id) {
                            dict.alert('已自动为你保存在未分类标签下').then(function () {
                                dict.go('admin.article', {
                                    id: id
                                })
                            })
                        });
                    } else {
                        dict.alert('图片上传失败')
                    }
                    ele.value = null;
                })
            }
        }
        function addLabel() {
            dict.confirm('请输入标签名').then(function (res) {
                // 点了确定，但是内容为空 
                // 点了取消
                // 点了确定内容不为空
                console.log(res)
                if (res.cancel) {
                    return false;
                }
                if (res.ok == '') {
                    dict.alert('请输入标签名').then(function () {
                        if (res.ok) {
                            addLabel();
                        }
                    })
                } else {
                    var postData = {
                        name: res.ok.trim()
                    };
                    model.saveLabel(postData).then(function (res) {
                        if (res.ok) {
                            $scope.all_labels.push({
                                id: res.ok.id,
                                name: res.ok.name,
                                add_date: res.ok.add_date
                            });
                        } else {
                            dict.alert(res.err.msg)
                        }
                    })
                }
            })
        }
        $scope.save = function () {
            save();
        }
        function save(callback) {
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

                    // 当id为空的时候，发布新文章  发布成功  跳转页面
                    // 当id不为空的时候，是编辑文章 发布成功
                    // 当id不为空，但callback存在的时候，提示已自动保存在未分类标签下 跳转页面
                    if ($scope.id) {
                        if (callback) {
                            callback(res.ok.id);
                        } else {
                            dict.alert('发布成功')
                        }
                    } else {
                        dict.alert('发布成功').then(function () {
                            dict.go('admin.article', {
                                id: res.ok.id
                            })
                        })
                    }
                    $scope.changed = false;
                } else {
                    dict.alert(res.err.msg).then(function () {
                        if (res.err.code == 1) {

                        }
                    })

                }
            })
        }
    }
}())