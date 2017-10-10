#ng-change与ng-model同时使用#
ng-change与ng-model是可以同时使用的，案例如下：
```
<textarea ng-change="change()" ng-model="content" autofocus></textarea>

$scope.change = funciton(){
	// ...code
}
```
#如何使用JS向textarea中写入换行符#

```
<textarea ng-change="change()" ng-model="content" autofocus></textarea>

$scope.add = function(){
	$scope.content = $scope.content+'\n\n';
}
```
这里写了两个`\n`，是因为项目中用的markdown语法， markdown语法中连续两个换行才会被解析成为一个真正的换行
#在angularjs中使用原生JS触发input[type=file]的点击事件#
```
<input type="file" style="display: none;" onchange="angular.element(this).scope().fileChange(this)" name="file">
<button class="btn_default" ng-click="addImage()">添加图片</button>

$scope.addImage = function(){
	document.querySelector('input[type=file]').click()
}
```
#获取光标在输入框中的位置#

在实现一个富文本编辑器的时候，经常需要在输入框中插入一个图片，插入图片的位置有一个很重要的要求，那就是要把图片插入在光标所在的位置，这个时候，就需要获取光标所在位置；`DOM.selectionStart`属性就可以实现我们的目的。 但是中间有一个问题，通常我们点击插入图片按钮的时候，光标就离开了输入框怎么办？ 因此必须要把上传图片之前的光标位置保存下来，这个位置有两种情况： 
> 1. onChange事件后，要把返回的图片插入到输入框的最后面， 
> 2. 在输入框的文字中间点击的时候，要把图片插入到，鼠标点击的位置。

在angular项目中的用法如下：
```
<input type="file" style="display: none;" onchange="angular.element(this).scope().fileChange(this)" name="file">
<button class="btn_default" ng-click="addImage()">添加图片</button>
<textarea ng-click="contentClick($event)" ng-change="contentChange()" ng-model="content" autofocus></textarea>

$scope.contentClick = function(event){
	$scope.contentAnthor = event.target.selectionStart;
}
$scope.contentChange = function(event){
	$scope.contentAnthor = $scope.content.length;
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
				dict.alert($scope, '图片上传失败')
			}
			ele.value = null;
		})
	}
}
```