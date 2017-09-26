;(function(){
    angular.module('app')
    .controller('homeArticleCtrl', controller)
    controller.$inject =[
        '$scope',
        '$state',
        'model',
        'dict'
    ];

    function controller($scope, $state, model, dict){
        init() 
        function init(){
            if($state.params.id){
                getDetail($state.params.id)
            }else{
                dict.go('home.list')
            }
        }
        function getDetail(id){
            var postData = {
                id: id
            };
            model.getArticleDetail(postData).then(function(res){
                if(res.ok){
                    $scope.detail = res.ok.detail
                }else{

                }
            })
        }
    }
}())