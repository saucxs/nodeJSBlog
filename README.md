# nodeJSBlog
交流学习社区系统，后端完全使用nodeJS，数据库使用mysql，基于nodejs的thinkjs框架搭建的，支持：1、文章评论；2、代码高亮；3、文章内容分页；4、小型bbs社区讨论社区；5、后台管理；6、权限管理等功能
如果喜欢nodeJS写的后端，支持大前端，支持全栈开发，请请`star`并`fork`项目。
如有使用问题请留言。

### 一、功能特点
1. 文章评论；
2. 代码高亮；
3. 文章内容分页；
4. 小型bbs社区讨论社区；
5. 后台管理；
6. 权限管理

### 二、下一版的功能
1. 系统主题设置
2. 完善后台功能


### 三.运行程序请选择运行模式
```javascript
//压缩html,css,js 并生成相应目录
npm run compress

//运行开发模式，html,css,js均加载未压缩版本
npm run dev  

//运行生产模式，html,css,js均加载压缩版本
npm run app  

//首次运行/更新运行前请先编译项目
npm run compile

//线上推荐用pm2来运行(先配置好pm2.json)
pm2 start pm2.json

//注：线上部署，如果你使用的是win服务器，可以给我留言
```
