标签映射表
id 标签名 
0 全部
1 javascript
2 angularjs
3 


文章映射表
id 文章id  
uid 唯一标识符
title  文章标题
content 内容
add_date 发布时间
last_edit 最后编辑时间
labels 标签 


系统日志表
id 日志id
type 日志类型 0 注册 1 登录 2 发布文章 3 编辑文章 4 修改密码 5 新增标签类型 6 删除标签类型 7 修改用户文章权限 8 修改用户登录权限 9 修改用户评论权限 10 删除评论  11 文章添加标签 12 文章删除标签
typedesc 日志类型说明
title 日志内容  
userid 操作人id
adddate 记录时间
ip  操作ip

用户表
id 用户id
phone 手机号码
passwd 登录密码
face 用户头像
group  所在组  0 管理员 1 普通用户
login 是否允许登录  0 允许  1 不允许
article 文章权限 0 允许发布 1 不允许发布 
comment 评论权限 0 允许  1 不允许


评论表
id 评论id
articleId 文章id
userId 评论人id
content 评论内容
status  0 正常显示 1 不显示

系统表