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
                getArticleDetail()
            }else{
                dict.go('home.list')
            }
        }
        function getArticleDetail(){
            var postData = {
                id: $state.params.id,
                action: 'home'
            };
            model.getArticleDetail(postData).then(function(res){
                if(res.ok){
                    $scope.detail = res.ok
                }else{

                }
            })
        }
    }
}())