# [nodeJSBlog](https://github.com/saucxs/nodeJSBlog)
[![](https://img.shields.io/badge/Powered%20by-saucxs%20-brightgreen.svg)](https://github.com/saucxs/nodeJSBlog)
[![GitHub license](https://img.shields.io/github/license/saucxs/nodeJSBlog.svg)](https://github.com/saucxs/nodeJSBlog/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/saucxs/nodeJSBlog.svg?style=popout)](https://github.com/saucxs/nodeJSBlog/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/saucxs/nodeJSBlog.svg?style=popout)](https://github.com/saucxs/nodeJSBlog/network)
[![GitHub issues](https://img.shields.io/github/issues/saucxs/nodeJSBlog.svg?style=popout)](https://github.com/saucxs/nodeJSBlog/issues)

交流学习社区系统，是一个拥有博客功能和社区分享评论功能的一个学习分享平台，后端完全使用nodeJS，数据库使用mysql，基于nodejs的thinkjs框架搭建的，支持：1、文章评论；2、代码高亮；3、文章内容分页；4、小型bbs社区讨论社区；5、后台管理；6、权限管理等功能 。
如果喜欢`nodeJS`写的后端，支持大前端，支持全栈开发，请请`star`并`fork`项目。系统地址为：[前台系统网站](http://www.mwcxs.top)。[后台系统网站](http://www.mwcxs.top/admin)
如有使用问题请留言。

### 技术栈
> + ThinkJS（ Node端框架） [官方网站](https://thinkjs.org/)
> + jQuery.js（都懂得……）  [中文文档](http://jquery.cuishifeng.cn/)
> + Vue.js（客户端双向数据绑定框架）  [官方网站](https://cn.vuejs.org/)

### 目录结构

+ app    —— node端编译后文件夹，一般情况不需要关注
+ src    —— node端服务文件夹，以业务模块划分子文件夹
    - admin  -- 管理后台
    - common  -- 通用模块，放置主配置参数、boostrap adapter middleware service 等相关组件
        - adapter  -- adapter配置   
        - bootstrap -- bootstrap框架
        - config -- 框架需要的配置以及项目自定义的配置（多模块）  
        - controller -- 控制器层
        - service -- 服务层
    - home -- 前端默认模块
    - personal --  后端管理模块
    - topic -- 话题模块     
+ view   —— 静态页面文件夹，以业务模块划分子文件夹与src对应
+ www
    - static —— 静态资源文件
        - admin —— 管理后台
        - theme  —— 主题文件
        - upload —— 上传文件
    - development.js  -- 开发环境
    - production.js   -- 生产环境    

### 一、功能特点
1. 文章评论；
2. 代码高亮；
3. 文章内容分页；
4. 小型bbs社区讨论社区；
5. 后台管理；
6. 权限管理

### 二、版本功能
+ 2017.03.14
   - 移动端少数页面的兼容性
+ 下一版
    - 系统主题设置
    - 完善后台功能

### 三、系统截图
#### 3.1 无线端
![image](./screen-pic.png)
#### 3.1 PC端
![image](./screen-pic-2.png)

### 四、运行程序请选择运行模式
可能目前fork，安装完依赖后还是不能正常显示，而是报500，那是因为数据库配置没有更改
```javascript
//压缩html,css,js 并生成相应目录
npm run compress

//运行开发模式，html,css,js均加载未压缩版本
npm run dev  

//开发模式的浏览器，浏览器访问
http://127.0.0.1:8361/

//运行生产模式，html,css,js均加载压缩版本
npm run app  

//首次运行/更新运行前请先编译项目
npm run compile

//线上推荐用pm2来运行(先配置好pm2.json)
pm2 start pm2.json

//注：线上部署，如果你使用的是win服务器，可以给我留言
```
### 五、兼容性
1. Chrome
2. Firefox
3. QQ浏览器
4. 无线端（移动端）
等
