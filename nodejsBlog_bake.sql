-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 120.27.109.67    Database: nodejsBlog_bake
-- ------------------------------------------------------
-- Server version	5.6.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `li_article`
--

DROP TABLE IF EXISTS `li_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `abstract` text,
  `content` text NOT NULL,
  `picurl` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `view` bigint(20) DEFAULT '1',
  `totop` smallint(6) DEFAULT '0',
  `torecom` smallint(6) DEFAULT '0',
  `topicrecom` smallint(6) DEFAULT '0',
  `tag` int(11) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `allowcomment` int(11) DEFAULT '1',
  `ispublished` int(11) DEFAULT '0',
  `from` varchar(255) DEFAULT NULL,
  `item` int(11) DEFAULT NULL,
  `like` int(11) DEFAULT '0' COMMENT '喜欢',
  `flag_a` smallint(255) DEFAULT '0',
  `flag_b` smallint(255) DEFAULT '0',
  `flag_c` smallint(255) DEFAULT '0',
  `flag_d` smallint(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=463 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_article`
--

LOCK TABLES `li_article` WRITE;
/*!40000 ALTER TABLE `li_article` DISABLE KEYS */;
INSERT INTO `li_article` VALUES (128,'javascript常见数组操作整理','数组常见操作包含了 增、删、查、改、插入、交集、并集','<p>数组常见操作包含了 增、删、查、改、插入、交集、并集，现整理如下：</p>\n<p>1、数组整体元素修改</p>\n<pre><code class=\"lang-javascript\">        //map,给数组每个元素加1 输出[1,2,3]\n        $.map([0,1,2],function(n){\n            return n+1;\n        })\n</code></pre>\n<p>2、 数组筛选</p>\n<pre><code class=\"lang-javascript\">        $.map([0,1,2],function(n){\n            return n&gt;0?n+1:null\n        })\n        //[2,3]\n</code></pre>\n<p>3、jquery 元素转数组</p>\n<pre><code class=\"lang-javascript\">        $(\"li\").toArray()\n        $.makeArray($(\"li\"))\n</code></pre>\n<p>4、获取两个数组中相同部分或者不同部分</p>\n<pre><code class=\"lang-javascript\">        //去掉true则显示相同部分，保留true则显示不同部分\n        var a=[1,2,3,5,6,3,7,12],\n             b=[1,3,5,12]\n\n        $.grep(a,function(n,i){\n             if(b.indexOf(n)&gt;=0)\n                 return n\n        },true);\n        //[2, 6, 7]\n</code></pre>\n<p>5、数组去重并倒序排序</p>\n<pre><code class=\"lang-javascript\">        var a=[1,2,3,5,6,3,7,12];\n        $.unique(a)\n        //[12, 7, 6, 5, 3, 2, 1]\n</code></pre>\n<p>6、数组排序</p>\n<pre><code class=\"lang-javascript\">        var arr=[1,34,5,8,4,9,12]\n        arr.sort(function(a,b){\n            return a-b;\n        });\n        //顺序：a-b   [1, 4, 5, 8, 9, 12, 34]\n        //倒序：b-a   [34, 12, 9, 8, 5, 4, 1]\n</code></pre>\n<p>7、数组截取slice</p>\n<pre><code class=\"lang-javascript\">        var arr=[1,34,5,8,4,9,12];\n            arr.slice(2,4) // [5, 8]\n        //arr  输出 [1, 34, 5, 8, 4, 9, 12]\n</code></pre>\n<p>8、数组插入、删除splice(需明确位置)</p>\n<pre><code class=\"lang-javascript\">        var arr=[1,34,5,8,4,9,12];\n        //删除\n             arr.splice(2,4)\n            //arr  输出[1, 34, 12]\n        //替换\n            arr.splice(1,2,3,4)\n            //arr  输出[1, 3, 4, 8, 4, 9, 12]\n        //插入\n            arr.splice(2,0,44)\n        //arr  输出[1, 34, 44, 5, 8, 4, 9, 12]\n</code></pre>\n<p>9、数组遍历</p>\n<pre><code class=\"lang-javascript\">        var members=[\"1\",\"2\",\"3\"];\n        $.each(members,function(i,item){\n            console.log(item);\n        });\n        //如何跳出当前的each循环\n        //return false;——跳出所有循环；相当于 javascript 中的 break 效果。\n        //return true;——跳出当前循环，进入下一个循环；相当于 javascript 中的 continue 效果。\n</code></pre>\n<p>10、jQuery根据元素值删除数组元素的方法</p>\n<pre><code class=\"lang-javascript\">        var arr = [\'a\',\'b\',\'c\',\'d\'];\n        arr.splice($.inArray(\'c\',arr),1);\n        console.log(arr);\n        //[\"a\", \"b\", \"d\"]\n</code></pre>\n<p>11、常见的数组操作</p>\n<pre><code class=\"lang-javascript\">        push、pop、shift、unshift、concat\n</code></pre>\n<p>12、数组操作兼容性</p>\n<pre><code class=\"lang-javascript\">        IE8下\n        $.inArray 代替 indexOf\n\n        $.grep代替Array.prototype.filter\n</code></pre>\n<p>13、常见数组操作案例：</p>\n<p>1、jquery实现从数组移除指定的值</p>\n<pre><code class=\"lang-javascript\">        function delItem(arr,m)\n        {\n                return $.grep(arr,function(n,i){\n                    return n!=m\n                });\n        }\n        var a=[1,2,3,5,6,3,7,12];\n            delItem(a,3)\n</code></pre>\n<p>或者</p>\n<pre><code class=\"lang-javascript\">        function delItem(arr,m)\n            {\n                arr.splice($.inArray(m,arr),1);\n                return arr\n            }\n        var arr = [\'a\',\'b\',\'c\',\'d\'];\n            delItem(arr,\"c\")\n</code></pre>\n<p>2、jquery实现从数组移除指定的数组</p>\n<pre><code class=\"lang-javascript\">        function delArray(arr,delArr)\n        {\n                return $.grep(arr,function(n,i){\n                    if( delArr.indexOf(n)&gt;=0)\n                    return n\n                },true);\n        }\n        var a=[1,2,3,5,6,3,7,12],\n            b=[5,7];\n            delArray(a,b)\n</code></pre>\n<p>3、jquery找出2个数组同有的部分</p>\n<pre><code class=\"lang-javascript\">        function findCommonArray(arr,delArr)\n        {\n                return $.grep(arr,function(n,i){\n                    if( delArr.indexOf(n)&gt;=0)\n                        return n\n                });\n        }\n        var a=[1,2,3,5,6,3,7,12],\n            b=[5,7,9];\n            findCommonArray(a,b)\n</code></pre><p><br></p>','static/upload/pics/5/17/2016YuKqGjR0liiRzXoofEQPpjld.jpg','saucxs','2016-05-17 10:58:44',350,1,1,1,7,'js,jquery',1,1,'',1,0,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `li_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_comment`
--

DROP TABLE IF EXISTS `li_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) DEFAULT NULL COMMENT '文章id',
  `author` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `qq` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `belongid` int(11) DEFAULT '0' COMMENT '回复的评论id',
  `dig` int(11) DEFAULT '0',
  `tipoff` int(11) DEFAULT '0' COMMENT '举报',
  `createtime` datetime DEFAULT NULL,
  `pic` varchar(255) COLLATE utf8_bin DEFAULT '' COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_comment`
--

LOCK TABLES `li_comment` WRITE;
/*!40000 ALTER TABLE `li_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `li_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_footerlink`
--

DROP TABLE IF EXISTS `li_footerlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_footerlink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(225) DEFAULT NULL,
  `url` varchar(512) CHARACTER SET latin1 DEFAULT NULL,
  `description` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_footerlink`
--

LOCK TABLES `li_footerlink` WRITE;
/*!40000 ALTER TABLE `li_footerlink` DISABLE KEYS */;
INSERT INTO `li_footerlink` VALUES (1,'阿里云红包','https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=jrx9ua8m','阿里云红包'),(2,'sau交流学习社区','https://www.mwcxs.top','sau交流学习社区');
/*!40000 ALTER TABLE `li_footerlink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_guest`
--

DROP TABLE IF EXISTS `li_guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_guest` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `contact` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `guest` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_guest`
--

LOCK TABLES `li_guest` WRITE;
/*!40000 ALTER TABLE `li_guest` DISABLE KEYS */;
INSERT INTO `li_guest` VALUES (36,'s','是','搜索'),(37,'范德萨发斯蒂芬','的说法是否','你好'),(38,'猿天地','1304489315@qq.com','我申请了交换友情链接'),(39,'steven','306557397','Hello站长，\n\nweekly项目忘记放数据库了。。。。。。。。。。。。。\n\nSteven'),(40,'super','QQ：1572740870','https://github.com/saucxs/nodeJSBlog   没有数据库怎么办？');
/*!40000 ALTER TABLE `li_guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_header_notice`
--

DROP TABLE IF EXISTS `li_header_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_header_notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(500) DEFAULT NULL,
  `content` varchar(1024) DEFAULT NULL,
  `create_time` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_header_notice`
--

LOCK TABLES `li_header_notice` WRITE;
/*!40000 ALTER TABLE `li_header_notice` DISABLE KEYS */;
INSERT INTO `li_header_notice` VALUES (1,'https://www.mwcxs.top/topic.html','1、新增成功登陆邮件提醒，2、修复社区模块没有模块和标题也能发布的问题，3、新增加忘记密码功能,通过注册邮件找回密码，4、新增加了github第三方登陆功能',NULL);
/*!40000 ALTER TABLE `li_header_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_headerlink`
--

DROP TABLE IF EXISTS `li_headerlink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_headerlink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) DEFAULT NULL,
  `url` varchar(512) DEFAULT NULL,
  `desciption` varchar(1024) DEFAULT NULL,
  `show` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_headerlink`
--

LOCK TABLES `li_headerlink` WRITE;
/*!40000 ALTER TABLE `li_headerlink` DISABLE KEYS */;
INSERT INTO `li_headerlink` VALUES (1,'weekly','http://weekly.mwcxs.top','weekly周报系统','true'),(2,'loveBook','http://book.mwcxs.top','loveBook','true');
/*!40000 ALTER TABLE `li_headerlink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_item`
--

DROP TABLE IF EXISTS `li_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `itemname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_item`
--

LOCK TABLES `li_item` WRITE;
/*!40000 ALTER TABLE `li_item` DISABLE KEYS */;
INSERT INTO `li_item` VALUES (1,'文章'),(2,'资讯'),(3,'nodejs'),(4,'资源下载'),(5,'招聘'),(6,'活动'),(8,'文档'),(10,'新闻');
/*!40000 ALTER TABLE `li_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_links`
--

DROP TABLE IF EXISTS `li_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `link` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `logo` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `qq` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `notice` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `flag` varchar(255) COLLATE utf8_bin DEFAULT '0' COMMENT '是否通过',
  `orders` int(255) DEFAULT '0' COMMENT '顺序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_links`
--

LOCK TABLES `li_links` WRITE;
/*!40000 ALTER TABLE `li_links` DISABLE KEYS */;
INSERT INTO `li_links` VALUES (18,'wangEditor','http://wangeditor.github.io/','','',NULL,'1',3),(27,'猿天地','http://www.cxytiandi.com/','','',NULL,'0',12),(28,'Falost的小窝','http://www.fedte.cc/','','',NULL,'1',13),(29,'小松博客','https://www.phpsong.com/','','',NULL,'1',14),(30,'苏宁云','https://www.suningcloud.com/','','',NULL,'1',0),(31,'东方财富','http://www.eastmoney.com/','','',NULL,'1',0),(32,'safeguard eagle博客园','http://www.cnblogs.com/chengxs','','184866445','','1',0),(33,'weekly周报系统','http://weekly.mwcxs.top','','184866445','','1',0),(34,'loveBook小说系统wepApp','http://book.mwcxs.top/','','184866445','','1',0),(35,'苏宁易购','https://www.suning.com/','http://image3.suning.cn/uimg/cms/img/153135831598566332.png','184866445',NULL,'1',0),(36,'百度主站','https://www.baidu.com/','//www.baidu.com/s?wd=%E4%BB%8A%E6%97%A5%E6%96%B0%E9%B2%9C%E4%BA%8B&tn=SE_Pclogo_6ysd4c7a&sa=ire_dl_gh_logo&rsv_dl=igh_logo_pc','184866445',NULL,'1',0),(38,'阿里云','https://www.aliyun.com/','//img.alicdn.com/tps/TB1BQh7LpXXXXcJXFXXXXXXXXXX-198-46.gif','184866445',NULL,'1',0),(39,'前端博客','https://www.haorooms.com/','','184866445',NULL,'1',0),(40,'技术交流学习社区','https://www.mwcxs.top','','',NULL,'1',0),(41,'交流学习社区','https://www.mwcxs.top','','',NULL,'1',0),(42,'技术交流学习博客','https://www.mwcxs.top','','',NULL,'1',0),(43,'小程序开发','https://www.mwcxs.top','','',NULL,'1',1),(44,'rin部落','http://www.9958.pw/','','',NULL,'1',1),(45,'一只羊的博客','http://www.asheep.cn/','','',NULL,'1',1),(46,'建站素材','http://www.mzolo.com/index.html','','',NULL,'1',1),(47,'saucxs','https://github.com/saucxs','','',NULL,'1',0),(48,'segmentfault','https://segmentfault.com/','','',NULL,'1',0),(49,'saucxs的博客','https://blog.csdn.net/saucxs','','',NULL,'1',0),(50,'前端资源网','http://www.aseoe.com/','','',NULL,'1',1),(51,'技术交流学习社区','https://www.mwcxs.top','','',NULL,'1',0),(52,'web技术交流','https://www.mwcxs.top','','',NULL,'1',2),(53,'CSS开发手册','http://css.doyoe.com/','','',NULL,'1',1),(54,'程新松博客网站safeguardEagle','https://www.chengxinsong.cn/','','',NULL,'1',2),(55,'haorooms','http://www.haorooms.com/','','184866445','','1',0),(56,'luckyscript','http://www.luckyscript.me/','','184866445','','1',0),(57,'天天基金','http://fund.eastmoney.com/','','184866445','','1',0),(58,'东方财富期货','http://www.eastmoneyfutures.com/','','184866445','','1',0),(59,'交流学习社区','http://www.mwcxs.top','','184866445','','1',15),(60,'峰云就她了','http://xiaorui.cc/','','184866445','','1',0);
/*!40000 ALTER TABLE `li_links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_manage_permission`
--

DROP TABLE IF EXISTS `li_manage_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_manage_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pername` varchar(255) DEFAULT NULL,
  `permission` text,
  `tag` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_manage_permission`
--

LOCK TABLES `li_manage_permission` WRITE;
/*!40000 ALTER TABLE `li_manage_permission` DISABLE KEYS */;
INSERT INTO `li_manage_permission` VALUES (1,'新建/编辑文章','admin/content/article',1),(2,'添加markdown','admin/content/addmarkdown',1),(3,'文章列表','admin/content/index',1),(7,'后台首页','admin/index/index',4),(8,'后台欢迎页','admin/index/welcome',4),(9,'草稿箱文章列表','admin/content/draftlist',1),(10,'新增/编辑文章提交接口','admin/content/doadd',1),(11,'草稿箱发布接口','admin/content/updatestatus',1),(12,'删除/批量删除文章接口','admin/content/delsome',1),(13,'上传文章缩略图接口','admin/content/upload',1),(14,'上传编辑器图片接口','admin/content/uploadeditor',1),(15,'上传markdown文件及解析接口/内容分页','admin/content/uploadfile',1),(16,'留言列表','admin/guest/index',5),(17,'删除/批量留言接口','admin/guest/delsome',5),(18,'退出后台接口','admin/index/logout',4),(19,'栏目列表','admin/item/index',6),(20,'新增/编辑栏目','admin/item/item',6),(21,'新增/编辑栏目接口','admin/item/save',6),(22,'删除/批量删除栏目接口','admin/item/delsome',6),(23,'申请列表','admin/links/index',14),(24,'删除/批量删除友情链接接口','admin/links/delsome',14),(25,'导航列表','admin/menu/index',2),(26,'新增/编辑导航','admin/menu/item',2),(27,'编辑/新增导航接口','admin/menu/save',2),(28,'删除/批量删除导航接口','admin/menu/delsome',2),(29,'权限列表','admin/permission/index',10),(30,'新增/编辑权限','admin/permission/item',10),(31,'编辑/新增权限接口','admin/permission/save',10),(32,'删除/批量删除权限接口','admin/permission/delsome',10),(33,'权限分类列表','admin/pertag/index',10),(34,'新增/编辑权限分类','admin/pertag/item',10),(35,'编辑/新增权限分类接口','admin/pertag/save',10),(36,'删除/批量删除权限分类接口','admin/pertag/delsome',10),(37,'角色列表','admin/role/index',10),(38,'新增/编辑角色','admin/role/item',10),(39,'新增/编辑角色接口','admin/role/save',10),(40,'删除/批量删除角色接口','admin/role/delsome',10),(41,'角色分配权限页','admin/role/perlist',10),(42,'角色分配权限保存接口','admin/role/rolesave',10),(43,'标签列表','admin/tag/index',9),(44,'新增/编辑标签','admin/tag/item',9),(45,'新增/编辑标签接口','admin/tag/save',9),(46,'删除/批量删除标签接口','admin/tag/delsome',9),(47,'用户列表','admin/user/index',8),(48,'新增/编辑用户','admin/user/item',8),(49,'新增/编辑用户接口','admin/user/save',8),(50,'删除/批量删除用户接口','admin/user/delsome',8),(51,'常规设置','admin/system/index',11),(52,'常规设置保存接口','admin/system/edit',11),(53,'评论设置','admin/system/setcomment',11),(54,'评论设置保存接口','admin/system/commentedit',11),(55,'管理员列表','admin/user/adminlist',8),(56,'评论列表','admin/comment/index',12),(57,'举报列表','admin/comment/tiplist',12),(58,'主题列表','admin/topic/index',13),(59,'显示/隐藏主题','admin/topic/update',13),(60,'主题标签管理','admin/topictag/index',13),(61,'新增/编辑主题分类','admin/topictag/item',13),(62,'新增/编辑主题分类接口','admin/topictag/save',13),(63,'删除/批量删除主题标签接口','admin/topictag/delsome',13),(64,'链接管理','admin/links/list',14),(65,'新增/编辑友情链接	','admin/links/item',14),(66,'新增/编辑友情链接接口','admin/links/save',14),(67,'显示/隐藏友情链接接口','admin/links/upstatus',14),(68,'设置logo','admin/system/setlogo',11),(69,'上传logo接口','admin/system/upload',11),(70,'baidu实时提交','admin/content/baidu',15);
/*!40000 ALTER TABLE `li_manage_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_manage_role`
--

DROP TABLE IF EXISTS `li_manage_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_manage_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `rolename` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `pid` text,
  `permission` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_manage_role`
--

LOCK TABLES `li_manage_role` WRITE;
/*!40000 ALTER TABLE `li_manage_role` DISABLE KEYS */;
INSERT INTO `li_manage_role` VALUES (1,'superadmin','超级管理员','1,2,3,9,10,11,12,13,14,15,25,26,27,28,7,8,18,16,17,19,20,21,22,47,48,49,50,55,43,44,45,46,29,30,31,32,33,34,35,36,37,38,39,40,41,42,51,52,53,54,68,69,56,57,58,59,60,61,62,63,23,24,64,65,66,67,70','admin/content/article,admin/content/addmarkdown,admin/content/index,admin/content/draftlist,admin/content/doadd,admin/content/updatestatus,admin/content/delsome,admin/content/upload,admin/content/uploadeditor,admin/content/uploadfile,admin/menu/index,admin/menu/item,admin/menu/save,admin/menu/delsome,admin/index/index,admin/index/welcome,admin/index/logout,admin/guest/index,admin/guest/delsome,admin/item/index,admin/item/item,admin/item/save,admin/item/delsome,admin/user/index,admin/user/item,admin/user/save,admin/user/delsome,admin/user/adminlist,admin/tag/index,admin/tag/item,admin/tag/save,admin/tag/delsome,admin/permission/index,admin/permission/item,admin/permission/save,admin/permission/delsome,admin/pertag/index,admin/pertag/item,admin/pertag/save,admin/pertag/delsome,admin/role/index,admin/role/item,admin/role/save,admin/role/delsome,admin/role/perlist,admin/role/rolesave,admin/system/index,admin/system/edit,admin/system/setcomment,admin/system/commentedit,admin/system/setlogo,admin/system/upload,admin/comment/index,admin/comment/tiplist,admin/topic/index,admin/topic/update,admin/topictag/index,admin/topictag/item,admin/topictag/save,admin/topictag/delsome,admin/links/index,admin/links/delsome,admin/links/list,admin/links/item,admin/links/save,admin/links/upstatus,admin/content/baidu'),(2,'admin','管理员','1,2,3,9,10,11,12,13,14,15,25,26,27,28,7,8,18,16,17,19,20,21,22,23,24,47,43,44,45,46,70','admin/content/article,admin/content/addmarkdown,admin/content/index,admin/content/draftlist,admin/content/doadd,admin/content/updatestatus,admin/content/delsome,admin/content/upload,admin/content/uploadeditor,admin/content/uploadfile,admin/menu/index,admin/menu/item,admin/menu/save,admin/menu/delsome,admin/index/index,admin/index/welcome,admin/index/logout,admin/guest/index,admin/guest/delsome,admin/item/index,admin/item/item,admin/content/save,admin/item/delsome,admin/links/index,admin/links/delsome,admin/user/index,admin/tag/index,admin/tag/item,admin/tag/save,admin/tag/delsome,admin/content/baidu'),(3,'editor','编辑','1,2,3,9,10,11,12,13,14,15,7,8,18,70','admin/content/article,admin/content/addmarkdown,admin/content/index,admin/content/draftlist,admin/content/doadd,admin/content/updatestatus,admin/content/delsome,admin/content/upload,admin/content/uploadeditor,admin/content/uploadfile,admin/index/index,admin/index/welcome,admin/index/logout,admin/content/baidu'),(4,'visitor','访客','3,9,25,7,8,18,16,19,23,47,43','admin/content/index,admin/content/draftlist,admin/menu/index,admin/index/index,admin/index/welcome,admin/index/logout,admin/guest/index,admin/item/index,admin/links/index,admin/user/index,admin/tag/index');
/*!40000 ALTER TABLE `li_manage_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_manage_tag`
--

DROP TABLE IF EXISTS `li_manage_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_manage_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_manage_tag`
--

LOCK TABLES `li_manage_tag` WRITE;
/*!40000 ALTER TABLE `li_manage_tag` DISABLE KEYS */;
INSERT INTO `li_manage_tag` VALUES (1,'文章管理'),(2,'导航管理'),(4,'基础页面'),(5,'留言管理'),(6,'栏目管理'),(8,'用户管理'),(9,'标签管理'),(10,'权限管理'),(11,'系统设置'),(12,'评论管理'),(13,'社区管理'),(14,'友情链接');
/*!40000 ALTER TABLE `li_manage_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_menu`
--

DROP TABLE IF EXISTS `li_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuname` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '菜单名',
  `url` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '导航链接',
  `info` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '备注',
  `appear` int(11) DEFAULT '1',
  `orders` int(255) DEFAULT '0' COMMENT '排序',
  `target` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_menu`
--

LOCK TABLES `li_menu` WRITE;
/*!40000 ALTER TABLE `li_menu` DISABLE KEYS */;
INSERT INTO `li_menu` VALUES (1,'首页','/','',1,1,1),(2,'文档','/doc.html',NULL,0,2,0),(8,'资源下载','/download.html',NULL,0,3,0),(9,'活动','/activity.html',NULL,1,4,0),(10,'社区','/topic.html',NULL,1,5,0),(11,'招聘','/topic/job.html',NULL,0,6,0),(14,'捐赠','/donate.html',NULL,1,7,0),(15,'文章','/more.html',NULL,1,1,0),(16,'资讯','/news.html',NULL,1,1,1);
/*!40000 ALTER TABLE `li_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_system`
--

DROP TABLE IF EXISTS `li_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sitename` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author` char(50) DEFAULT NULL,
  `copyright` varchar(255) DEFAULT NULL,
  `links` text,
  `allowcomment` int(11) DEFAULT '1',
  `tongji` text,
  `theme` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT 'default',
  `homeurl` varchar(45) DEFAULT NULL,
  `baidu_tuisong` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_system`
--

LOCK TABLES `li_system` WRITE;
/*!40000 ALTER TABLE `li_system` DISABLE KEYS */;
INSERT INTO `li_system` VALUES (1,'sau交流学习社区-power by saucxs(程新松)','/','sau交流学习社区,交流学习社区,程新松,交流学习社区程新松,saucxs,苏宁科技,东方财富','交流学习社区是基于thinkjs框架的nodeJSBlog系统,power by saucxs(程新松),交流学习社区具备完美兼容到PC端和无线端,并且拥有完善的轻量级网站后台,简单灵活,兼容性好.nodeJSBlog让您快速搭建中小型网站,博客,社区,论坛等','saucxs','2018 Copyright','<li><a href=\"https://www.mwcxs.top\" target=\"_blank\">交流学习社区</a></li>\n<li><a href=\"https://www.mwcxs.top\" target=\"_blank\">交流学习社区</a></li>\n<li><a href=\"https://www.mwcxs.top\" target=\"_blank\">交流学习社区</a></li>\n<li><a href=\"https://www.mwcxs.top\" target=\"_blank\">交流学习社区</a></li>\n<li><a href=\"https://www.mwcxs.top\" target=\"_blank\">交流学习社区</a></li>',0,'<script>\nvar _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https://hm.baidu.com/hm.js?8649e1cdb5dfb4c811b355ccbe389548\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();\n</script>','liblog','https://www.mwcxs.top/','<script>\n\n	(function(){\n\n		var canonicalURL, curProtocol;\n\n		//Get the <link> tag\n\n		var x=document.getElementsByTagName(\"link\");\n\n		//Find the last canonical URL\n\n		if(x.length > 0){\n\n			for (i=0;i<x.length;i++){\n\n				if(x[i].rel.toLowerCase() == \'canonical\' && x[i].href){\n\n					canonicalURL=x[i].href;\n\n				}\n\n			}\n\n		}\n\n		//Get protocol\n\n	    if (!canonicalURL){\n\n	    	curProtocol = window.location.protocol.split(\':\')[0];\n\n	    }\n\n	    else{\n\n	    	curProtocol = canonicalURL.split(\':\')[0];\n\n	    }\n\n	    //Get current URL if the canonical URL does not exist\n\n	    if (!canonicalURL) canonicalURL = window.location.href;\n\n	    //Assign script content. Replace current URL with the canonical URL\n\n    	!function(){var e=/([http|https]:\\/\\/[a-zA-Z0-9\\_\\.]+\\.baidu\\.com)/gi,r=canonicalURL,t=document.referrer;if(!e.test(r)){var n=(String(curProtocol).toLowerCase() === \'https\')?\"https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif\":\"//api.share.baidu.com/s.gif\";t?(n+=\"?r=\"+encodeURIComponent(document.referrer),r&&(n+=\"&l=\"+r)):r&&(n+=\"?l=\"+r);var i=new Image;i.src=n}}(window);})();\n\n</script>');
/*!40000 ALTER TABLE `li_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_system_comment`
--

DROP TABLE IF EXISTS `li_system_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_system_comment` (
  `clientid` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `appcode` text CHARACTER SET utf8,
  `appkey` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `appid` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`,`appid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_system_comment`
--

LOCK TABLES `li_system_comment` WRITE;
/*!40000 ALTER TABLE `li_system_comment` DISABLE KEYS */;
INSERT INTO `li_system_comment` VALUES ('clientId','<!--高速版-->\n<div id=\"SOHUCS\"></div>\n<script charset=\"utf-8\" type=\"text/javascript\" src=\"http://changyan.sohu.com/upload/changyan.js\" ></script>\n<script type=\"text/javascript\"> \n(function(){ \nvar appid = \'cytTc84Uv\'; \nvar conf = \'prod_2a23e92e53049f733dec63ffc2d14994\'; \nvar width = window.innerWidth || document.documentElement.clientWidth; \nif (width < 960) { \nwindow.document.write(\'<script id=\"changyan_mobile_js\" charset=\"utf-8\" type=\"text/javascript\" src=\"https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=\' + appid + \'&conf=\' + conf + \'\"><\\/script>\'); } else { var loadJs=function(d,a){var c=document.getElementsByTagName(\"head\")[0]||document.head||document.documentElement;var b=document.createElement(\"script\");b.setAttribute(\"type\",\"text/javascript\");b.setAttribute(\"charset\",\"UTF-8\");b.setAttribute(\"src\",d);if(typeof a===\"function\"){if(window.attachEvent){b.onreadystatechange=function(){var e=b.readyState;if(e===\"loaded\"||e===\"complete\"){b.onreadystatechange=null;a()}}}else{b.onload=a}}c.appendChild(b)};loadJs(\"https://changyan.sohu.com/upload/changyan.js\",function(){window.changyan.api.config({appid:appid,conf:conf})}); } })(); </script>','4edd2dec6369517dd4fd4ccb188137f2','cytTc84Uv',1);
/*!40000 ALTER TABLE `li_system_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_tags`
--

DROP TABLE IF EXISTS `li_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tagname` varchar(255) DEFAULT NULL,
  `appear` int(11) DEFAULT '1',
  `orders` int(255) DEFAULT '0' COMMENT '显示顺序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_tags`
--

LOCK TABLES `li_tags` WRITE;
/*!40000 ALTER TABLE `li_tags` DISABLE KEYS */;
INSERT INTO `li_tags` VALUES (1,'web开发',1,0),(2,'thinkjs',1,1),(3,'nodejs',1,2),(4,'jquery',1,3),(5,'css3',1,4),(6,'html5',1,5),(7,'javascript',1,6),(8,'html',1,7),(9,'前端设计',1,8),(10,'fis',1,30),(11,'grunt',1,32),(12,'vscode',1,31),(13,'vue',1,9),(14,'活动',1,33),(15,'招聘',1,34),(16,'nginx',1,10),(18,'微信小程序',1,12),(19,'angular',1,13),(20,'react',1,14),(21,'wangeditor',1,15),(22,'numjucks',1,16),(23,'linux',1,5),(24,'docker',1,17),(25,'gitlab',1,18),(26,'webapp',1,19),(27,'软件工程',1,20),(28,'vuex',1,9),(29,'数据可视化',1,10),(30,'java',1,10),(31,'redis',1,5),(32,'android',1,11),(33,'MongoDB',1,15),(34,'分享',1,15),(35,'androidAPP',1,15),(36,'iosAPP',1,15),(37,'资讯',1,0);
/*!40000 ALTER TABLE `li_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_topic`
--

DROP TABLE IF EXISTS `li_topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `item` varchar(255) DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin COMMENT '内容',
  `author` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `view` bigint(20) DEFAULT '1' COMMENT '点击数',
  `updatetime` datetime DEFAULT NULL,
  `updateauthor` varchar(255) DEFAULT NULL,
  `updatepic` varchar(255) DEFAULT NULL,
  `replycount` int(11) DEFAULT '0' COMMENT '回复数',
  `show` smallint(255) DEFAULT '1' COMMENT '是否显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_topic`
--

LOCK TABLES `li_topic` WRITE;
/*!40000 ALTER TABLE `li_topic` DISABLE KEYS */;
INSERT INTO `li_topic` VALUES (31,'ask','<p>在做登陆页的验证码功能，之前没有用node做过，有什么办法么？</p>','livi','2016-09-02 15:52:44','新手求解，thinkjs如何生成随机验证码，并返回至前台？',238,'2016-09-02 16:30:43','livisky','common/images/pic/avatar_7.jpg',4,1),(32,'thinkjs','<p>使用分组查询并带有分页查询，结果得到的结果集中分页信息是错误的，请问是不支持分组后在分页查询么，还是写法的问题？以下是代码和结果截图：<img src=\"/static/upload/pics/9/9/2016cQH8ijqFS4HB9Z1SPsa0atAt.png\" alt=\"QQ截图20160909104246\" style=\"max-width: 100%;\"><img src=\"/static/upload/pics/9/9/20169IGijgOAqzRzljaJGE6qMBzb.png\" alt=\"结果\" style=\"max-width: 100%;\"></p><p><br></p>','livi','2016-09-09 10:45:05','分页问题',127,'2016-09-12 10:25:32','livi','common/images/pic/avatar_2.jpg',1,1),(35,'share','<p>git提交时出现\"Your&nbsp;local&nbsp;changes&nbsp;to&nbsp;the&nbsp;following&nbsp;files&nbsp;would&nbsp;be&nbsp;overwritten&nbsp;by&nbsp;merge\"，是因为git pull的电脑本地修改了，跟git的库里不一致，所以提示错误信息。</p><p><br></p>','admin','2016-09-19 10:22:07','git提交时出现\"Your local changes to the following files would be overwritten by merge\"',63,'2016-09-19 10:22:07','admin','common/images/pic/avatar_7.jpg',0,1),(37,'job','<p><b>前端开发工程师（总部）</b></p><table class=\"\"><tbody><tr><th>职位类别：</th><td>IT类&nbsp;&gt;&gt;IT类</td><th>学历要求：</th><td><span>本科及以上</span><select>&nbsp;					<option></option>&nbsp;								<option>博士</option>&nbsp;								<option>MPA</option>&nbsp;								<option>EMBA</option>&nbsp;								<option>MBA</option>&nbsp;								<option>硕士</option>&nbsp;								<option>本科</option>&nbsp;								<option>大专</option>&nbsp;								<option>中专/技校</option>&nbsp;								<option>高中/职高/中五</option>&nbsp;								<option>初中/中三</option>&nbsp;				</select></td><th>工作性质：</th><td>全职</td></tr><tr><th>工作地点：</th><td>南京市,上海市</td></tr></tbody></table><p><br></p><p><b><em></em>岗位职责：</b></p><p>1、使用HTML/CSS/JavaScript开发PC和Mobile项目；</p><p>&nbsp;2、参与中小型项目的页面切图和模板视图层开发；&nbsp;</p><p>3、与后台工程师（java或PHP）制定技术实现方案、服务接口等；&nbsp;</p><p>4、前端基础组件平台开发和维护；&nbsp;</p><p>5、优化产品，为用户提供更好的视觉和操作体验。</p><p><br></p><p><b><em></em>任职要求：</b></p><p>1、本科及以上学历，计算机科学与技术、软件工程、信息与计算科学等相关专业；</p><p>&nbsp;2、能够运用HTML+CSS来开发符合W3C标准的静态页面，兼容各大浏览器(IE6- IE10,Chrome,Safari,Firefox,Opera)；&nbsp;</p><p>3、基本掌握XHTML/HTML5/CSS/CSS3/JavaScript等前端技术；&nbsp;</p><p>4、至少熟悉一种JS框架（如 jQuery，Backbone，Angular，React，Vue）,精通jQuery更佳；</p><p>5、至少了解一门后端开发语言（Java/PHP/Python/Ruby）。</p><p><br></p>','saucxs','2018-01-06 14:10:18','狮长校园招聘-前端开发工程师（总部）',52,'2018-01-06 14:10:18','saucxs','',0,1),(38,'share','<p>利用unzip命令解压缩的时候，出现-bash:&nbsp;</p><p>unzip:&nbsp;command&nbsp;not&nbsp;found的错误。</p><p>unzip——命令没有找到，其原因肯定是没有安装unzip。</p><p>利用一句命令就可以解决了。</p><p>命令是：</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">yum install -y unzip zip</code></pre><p>安装成功后就可以使用unzip命令了。</p>','saucxs','2018-10-23 14:37:40','Centos出现-bash: unzip: command not found的解决办法',52,'2018-10-23 14:37:40','saucxs','common/images/pic/avatar_16.jpg',0,1),(39,'share','<p><strong>favicon.ico</strong>一般用于作为<strong>缩略的网站标志</strong>,它显示位于浏览器的地址栏或者在标签上,用于显示网站的logo,如图红圈的位置， 目前主要的浏览器都支持<em>favicon.ico</em>图标.</p><p><br></p><p>目前vue-cli搭建的vue项目里面已经有了一个static文件夹，存放静态文件。</p><p><img src=\"/static/upload/pics/2018/10/23XUvgAMq2u_2m_Vl7JuYpP9WY.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p><p>1、然后再index.html中添加：</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> &lt;link rel=<span class=\"hljs-string\">\"icon\"</span> href=<span class=\"hljs-string\">\"static/icon.jpg\"</span> type=<span class=\"hljs-string\">\"image/x-icon\"</span> /&gt;\n <span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">link</span> <span class=\"hljs-attr\">rel</span>=<span class=\"hljs-string\">\"shortcut icon\"</span> <span class=\"hljs-attr\">href</span>=<span class=\"hljs-string\">\"static/icon.jpg\"</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"image/x-icon\"</span>  /&gt;</span>\n</span></code></pre><p><br></p><p>2、你的build文件夹下：build/webpack.dev.conf.js中，本地环境生效</p><p>增加&nbsp;&nbsp;<b>favicon:\'static/icon.jpg\'</b></p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> <span class=\"hljs-comment\">// https://github.com/ampedandwired/html-webpack-plugin</span>\n    <span class=\"hljs-keyword\">new</span> HtmlWebpackPlugin({\n      filename: <span class=\"hljs-string\">\'index.html\'</span>,\n      template: <span class=\"hljs-string\">\'index.html\'</span>,\n      inject: <span class=\"hljs-literal\">true</span>,\n      <b>favicon:<span class=\"hljs-string\">\'static/icon.jpg\'</span></b>\n    }),</code></pre><p>启动一下npm run dev，这样本地的favicon生效了。</p><p><br></p><p>3、在build文件夹下，build/webpack.prod.conf.js中，线上部署环境生效</p><p><img src=\"/static/upload/pics/2018/10/237WswfxUH7rPU8Va6y1cIQS8C.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><img src=\"/static/upload/pics/2018/10/23c-_SdCMlXVlWaM3f2Ea307OE.png\" alt=\"\" style=\"max-width:100%;\"><br></p>','saucxs','2018-10-23 15:19:30','vue项目--本地环境和线上环境的favicon设置',49,'2018-10-23 15:19:30','saucxs','common/images/pic/avatar_16.jpg',0,1),(40,'share','<h3>问题描述</h3><p>在webpack利用打包css文件时出现:</p><pre><code>Error: Cannot find module \'node-sass\'</code></pre><h3>解决方法</h3><pre><code>$ npm install node-sass --save-dev</code></pre><p></p><p>安装node-sass模块即可解决</p><p><br></p>','saucxs','2018-10-23 23:42:35','Error Cannot find module node-sass',33,'2018-10-23 23:42:35','saucxs','common/images/pic/avatar_16.jpg',0,1),(41,'nodeJSBlog','<p>添加文章内容调用标签，通过标签配置即可实现内容的读取</p><p>如：获取置顶的6条文章列表</p><pre><code>{% article data = \"topList\",limit= \"6\",flag=\"totop\"%}</code></pre><p>然后再循环出来</p><pre><code>{% article data = \"topList\",limit= \"6\",flag=\"totop\"%}\n      {% for item in topList %}\n      &lt;div class=\"blogs\"&gt;\n         &lt;figure&gt;\n         &lt;a href=\"/page/{{item.aid}}.html\" target=\"_blank\"&gt;&lt;img src=\"{{_web.url}}{{\'static/common/images/common/default.jpg\' if item.picurl==\'\' else item.picurl }}\" title=\"{{item.title}}\"&gt;&lt;/a&gt;\n          &lt;/figure&gt;\n          &lt;ul class=\"articleul\"&gt;\n          &lt;h3&gt;&lt;a href=\"/page/{{item.aid}}.html\" target=\"_blank\"&gt;{{item.title}}&lt;/a&gt;&lt;/h3&gt;\n           &lt;p&gt;{{item.abstract}}&lt;/p&gt;\n          &lt;div class=\"author\"&gt;\n           &lt;span class=\"lm f_l\"&gt;\n             &lt;a href=\"javascript:void(0);\"&gt;{{item.tagname}}&lt;/a&gt;\n            &lt;/span&gt;\n            &lt;span class=\"dtime f_l\"&gt;{{think.datetime(item.createtime,\"YYYY-MM-DD\")}}&lt;/span&gt;\n           &lt;/div&gt;\n                       &lt;div class=\"author\"&gt;\n                          &lt;span class=\"viewnum f_r\"&gt;\n             浏览（{{item.view}}）&lt;/span&gt;\n            &lt;span class=\"pingl f_r\"&gt;\n             评论（&lt;span id=\"sourceId::{{item.aid}}\" class=\"cy_cmt_count\" style=\"margin: 0px;padding: 0px\"&gt;&lt;/span&gt;）\n            &lt;/span&gt;\n                       &lt;/div&gt;\n          &lt;/ul&gt;\n        &lt;/div&gt;\n {% endfor %}</code></pre><p>其他标签如：</p><pre><code>站长推荐\n\n{% article data = \"torecomList\",limit= \"6\",flag=\"torecom\"%}\n\n图文推荐\n\n{% article data = \"picrecomList\",limit= \"6\",flag=\"topicrecom\"%}</code></pre><p>nodeJSBlog于17年7月7日底更新到github 并开源，<a href=\"https://github.com/saucxs/nodeJSBlog\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255);\">https://github.com/saucxs/nodeJSBlog</a></p><p>欢迎关注！</p><p><br></p>','superadmin','2018-10-25 09:14:36','nodeJSBlog功能更新',64,'2018-10-25 09:14:36','superadmin','',0,1),(42,'share','<pre>  &lt;script async src=\"//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js\"&gt;&lt;/script&gt;\n            &lt;span id=\"busuanzi_container_site_pv\"&gt;本站总访问量&lt;span id=\"busuanzi_value_site_pv\"&gt;&lt;/span&gt;次&lt;/span&gt;</pre><p>因七牛强制过期『dn-lbstatics.qbox.me』域名，与客服沟通无果，只能更换域名到『busuanzi.ibruce.info』！</p><p>欢迎查看官方通知<a href=\"http://busuanzi.ibruce.info/\" target=\"_blank\" style=\"background-color: rgb(255, 255, 255);\">http://busuanzi.ibruce.info/</a></p><p><br></p>','saucxs','2018-10-29 11:20:21',' 不蒜子统计：两行代码 搞定计数',55,'2018-10-29 11:20:21','saucxs','common/images/pic/avatar_16.jpg',0,1),(43,'linux','<pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">df -h</code></pre><p><img src=\"/static/upload/pics/2018/10/29mgeTEcR37gYEbMq81Dyv0q_x.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-10-31 16:17:47','linux（centos）查看我们机器现有的分区状况',47,'2018-10-31 16:17:47','superadmin','',0,1),(44,'share','<p>那怎么开启一个端口呢？</p><p>添加</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">firewall-cmd --zone=public --add-port=<span class=\"hljs-number\">80</span>/tcp --permanent    （--permanent永久生效，没有此参数重启后失效）</code></pre><p>重新载入</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">firewall-cmd --reload</code></pre><p>查看</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">firewall-cmd --zone= public --query-port=<span class=\"hljs-number\">80</span>/tcp</code></pre><p>删除</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">firewall-cmd --zone= public --remove-port=<span class=\"hljs-number\">80</span>/tcp --permanent</code></pre><p><img src=\"/static/upload/pics/2018/10/29PNdZOeRPuhIaAW-TxgCm5jVp.png\" alt=\"\" style=\"max-width:100%;\"><br></p>','superadmin','2018-10-29 17:47:11','CentOS7使用firewalld打开关闭防火墙与端口',87,'2018-10-29 17:47:11','superadmin','',0,1),(45,'share','<p>1、本来以为可以不开防火墙，这样端口问题就没有问题，发现docker启动gitlab之后</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">docker: <span class=\"hljs-built_in\">Error</span> response <span class=\"hljs-keyword\">from</span> daemon: driver failed programming external connectivity on endpoint gitlab (d2ab44d8d843143670e705529bd0c421ee631dca8bfd5f70f0a4e4bb764f5f4f):  (iptables failed: iptables --wait -t nat -A DOCKER -p tcp -d <span class=\"hljs-number\">0</span>/<span class=\"hljs-number\">0</span> --dport <span class=\"hljs-number\">443</span> -j DNAT --to-destination <span class=\"hljs-number\">192.168</span><span class=\"hljs-number\">.0</span><span class=\"hljs-number\">.2</span>:<span class=\"hljs-number\">443</span> ! -i docker0: iptables: No chain/target/match by that name.\n (exit status <span class=\"hljs-number\">1</span>)).</code></pre><p>解决办法：</p><p>打开防火墙服务，开放相应的端口，暴露出来</p><p><br></p><p>2、后来又报错，名字重复</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">docker: <span class=\"hljs-built_in\">Error</span> response <span class=\"hljs-keyword\">from</span> daemon: Conflict. The container name <span class=\"hljs-string\">\"/gitlab\"</span> is already <span class=\"hljs-keyword\">in</span> use by container <span class=\"hljs-string\">\"b85f417db3e448fd19ad0fae514ae6a9f27c4970bd9d37394e42a09c2570fb91\"</span>. You have to remove (or rename) that container to be able to reuse that name.</code></pre><p>解决办法1：</p><p>要想使用原来的镜像名称，需要把创建的删除</p><p></p><p>删除 docker rm gitlab</p><p>解决方法2：</p><p>修改启动的名字</p><p><br></p><p>3、443端口已经使用</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">&gt;     gitlab/gitlab-ce\ndocker: <span class=\"hljs-built_in\">Error</span> response <span class=\"hljs-keyword\">from</span> daemon: driver failed programming external connectivity on endpoint gitlab (<span class=\"hljs-number\">557</span>c04eb6c9a8ba2ffa22ac90dc7a29d0e588af70f108936ce10b10cccf58ee5): <span class=\"hljs-built_in\">Error</span> starting userland proxy: listen tcp <span class=\"hljs-number\">0.0</span><span class=\"hljs-number\">.0</span><span class=\"hljs-number\">.0</span>:<span class=\"hljs-number\">443</span>: bind: address already <span class=\"hljs-keyword\">in</span> use.</code></pre><p>修改占用的端口</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">docker run \\\n    --hostname gitlab.mwcxs.top \\\n    --publish <span class=\"hljs-number\"><b>4433</b></span>:<span class=\"hljs-number\">443</span> --publish <span class=\"hljs-number\"><b>8080</b></span>:<span class=\"hljs-number\">80</span> --publish <span class=\"hljs-number\">22</span>:<span class=\"hljs-number\">22</span> \\\n    --name gitlab \\\n    --volume /home/databaken/gitlabdata/config:<span class=\"hljs-regexp\">/etc/gi</span>tlab \\\n    --volume /home/databaken/gitlabdata/logs:<span class=\"hljs-regexp\">/var/</span>log/gitlab \\\n    --volume /home/databaken/gitlabdata/data:<span class=\"hljs-regexp\">/var/</span>opt/gitlab \\\n    gitlab/gitlab-ce</code></pre><p><br></p>','superadmin','2018-10-30 14:26:25','docker启动gitlab，报错driver failed programming external connectivity on endpoint gitlab 。。。',121,'2018-10-30 14:26:25','superadmin','',2,1),(46,'javascript','<pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-comment\">/**\n * map转数组。\n * \n * @param {Map}map\n *            map对象\n * @return 数组\n */</span>\nShare.map2Ary = <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">map</span>) </span>{\n    <span class=\"hljs-keyword\">var</span> list = [];\n    <span class=\"hljs-keyword\">for</span> (<span class=\"hljs-keyword\">var</span> key <span class=\"hljs-keyword\">in</span> map) {\n        list.push([key, map[key]]);\n    }\n    <span class=\"hljs-keyword\">return</span> list;\n};</code></pre><p><br></p>','superadmin','2018-10-31 16:16:54','js将map转换成数组',38,'2018-10-31 16:16:54','superadmin','',0,1),(47,'小程序','<p>&nbsp;微信小程序跳转启动页面主要有两种方法：</p><p>&nbsp; 1.通过配置全局文件page.json进行配置</p><p>在app.json文件中，pages数组，设置在第一个的页面就是默认启动页面，所以你只需要调整你当前开发的页面顺序就好了。 page.json:</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-string\">\"pages\"</span>:[\n    <span class=\"hljs-string\">\"pages/department/department\"</span>,\n    <span class=\"hljs-string\">\"pages/subject/subject\"</span>,\n    <span class=\"hljs-string\">\"pages/index/index\"</span>,\n    <span class=\"hljs-string\">\"pages/logs/logs\"</span>,\n    <span class=\"hljs-string\">\"pages/card/card\"</span>,\n    <span class=\"hljs-string\">\"pages/user/user\"</span>,\n    <span class=\"hljs-string\">\"pages/update/update\"</span>\n  ],</code></pre><p><br></p><p>&nbsp;2.通过微信小程序编辑器框设置启动页面</p><p>在编译的地方设置，你只需要设置页面的路径，勾选上“使用以上条件编译”，如果页面需要参数，那可以把参数也传上。这样启动的就是你设置的页面。</p><p><img src=\"/static/upload/pics/2018/10/31gBFw4Ag4RygGz4SRDOiB6-sb.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-10-31 17:59:57','微信小程序运行成功需要跳转到启动页面',50,'2018-10-31 17:59:57','superadmin','',0,1),(48,'share','<p>本来程序运行的好好的，有一次启动时提示我们上面的信息，经从网上查找答案是：<b>此端口已被占用，改换其他端口</b>。然后是一系列解决方案。</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">$ node api/app.js\nevents.js:<span class=\"hljs-number\">183</span>\n      <span class=\"hljs-keyword\">throw</span> er; <span class=\"hljs-comment\">// Unhandled \'error\' event</span>\n      ^\n\n<span class=\"hljs-built_in\">Error</span>: listen EADDRINUSE :::<span class=\"hljs-number\">8000</span>\n    at <span class=\"hljs-built_in\">Object</span>._errnoException (util.js:<span class=\"hljs-number\">992</span>:<span class=\"hljs-number\">11</span>)\n    at _exceptionWithHostPort (util.js:<span class=\"hljs-number\">1014</span>:<span class=\"hljs-number\">20</span>)\n    at Server.setupListenHandle [<span class=\"hljs-keyword\">as</span> _listen2] (net.js:<span class=\"hljs-number\">1355</span>:<span class=\"hljs-number\">14</span>)\n    at listenInCluster (net.js:<span class=\"hljs-number\">1396</span>:<span class=\"hljs-number\">12</span>)\n    at Server.listen (net.js:<span class=\"hljs-number\">1480</span>:<span class=\"hljs-number\">7</span>)\n    at <span class=\"hljs-built_in\">Object</span>.&lt;anonymous&gt; (E:\\<span class=\"hljs-number\">2018</span>github\\wx_phoneBook\\api\\app.js:<span class=\"hljs-number\">35</span>:<span class=\"hljs-number\">4</span>)\n    at Module._compile (<span class=\"hljs-built_in\">module</span>.js:<span class=\"hljs-number\">652</span>:<span class=\"hljs-number\">30</span>)\n    at <span class=\"hljs-built_in\">Object</span>.Module._extensions..js (<span class=\"hljs-built_in\">module</span>.js:<span class=\"hljs-number\">663</span>:<span class=\"hljs-number\">10</span>)\n    at Module.load (<span class=\"hljs-built_in\">module</span>.js:<span class=\"hljs-number\">565</span>:<span class=\"hljs-number\">32</span>)\n    at tryModuleLoad (<span class=\"hljs-built_in\">module</span>.js:<span class=\"hljs-number\">505</span>:<span class=\"hljs-number\">12</span>)<br></code></pre>','superadmin','2018-11-01 17:37:55',' listen EADDRINUSE :::8000  端口被占用',39,'2018-11-01 17:37:55','superadmin','',0,1),(49,'小程序','<p>小程序报错</p><p><img src=\"/static/upload/pics/2018/11/1IwydbulkKkIqKaZRc3cZPr_b.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><b><br></b></p><p><b>解决方案：</b></p><p>在小程序开发工具中，打上下面的√</p><p><img src=\"/static/upload/pics/2018/11/1P5oo_ndkn8aqJJBP77JYQB_n.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-11-01 22:17:15','微信小程序--报错：域名不在request合法域名列表中',42,'2018-11-01 22:17:15','superadmin','',0,1),(50,'share','<p>apiName：EMLoanCodeII\n</p><p>梦网优先，玄武备份</p><p><img src=\"/static/upload/pics/2018/11/2oIM7AvDJ-4seDouvK4t5zJ9z.png\" alt=\"\" style=\"max-width:100%;\" class=\"\"><br></p><p><br></p>','superadmin','2018-11-02 13:18:04','用户收不到验证码的原因',54,'2018-11-02 13:18:04','superadmin','',0,1),(51,'share','<p>当switchTab点击过的时候，只有第一次加载数据，第二次点击的时候是不刷新数据的，这个时候只要在需要<b><font size=\"4\">每次点击都刷新数据的switchTab页的js</font></b>里加上onShow的方法即可</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">onShow:<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">e</span>)</span>{\n    <span class=\"hljs-keyword\">this</span>.onLoad();\n },</code></pre><p>举个例子，A页面--修改个人信息，B页面--展示个人信息。</p><p>A页面里</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> wx.switchTab({\n    url: <span class=\"hljs-string\">\"/pages/user/user\"    //跳到B页面</span>\n });</code></pre><p>需要在B页面上加上onShow方法，方法里重新执行加载的方法。</p>','superadmin','2018-11-05 14:43:35','微信小程序点击switchTab不刷新',40,'2018-11-05 14:43:35','superadmin','',0,1),(52,'share','<p>本来按照事件爱你的顺序，小程序初始化时触发App里的onLaunch，后边再执行页面的Page里的onLoad方法</p><p>但是在onLauch里请求获取是否有权限，等待返回值的时候，Page里的onLoad事件已经执行了。</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-comment\">//app.js</span>\nApp({\n  onLaunch: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'onLaunch\'</span>);\n    wx.request({\n      url: <span class=\"hljs-string\">\'test.php\'</span>, <span class=\"hljs-comment\">//仅为示例，并非真实的接口地址</span>\n      data: {\n      },\n      success: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">res</span>) </span>{\n        <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'onLaunch-request-success\'</span>);\n        <span class=\"hljs-comment\">// 将employId赋值给全局变量，提供给页面做判断</span>\n        <span class=\"hljs-keyword\">this</span>.globalData.employId = res.employId;   \n      }\n    })\n  },\n  globalData: {\n    employId: <span class=\"hljs-string\">\'\'</span>\n  }\n})\n\n\n<span class=\"hljs-comment\">//index.js</span>\n<span class=\"hljs-comment\">//获取应用实例</span>\n<span class=\"hljs-keyword\">const</span> app = getApp()\n\nPage({\n  data: {\n    albumDisabled: <span class=\"hljs-literal\">true</span>,\n    bindDisabled: <span class=\"hljs-literal\">false</span>\n  },\n  onLoad: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'onLoad\'</span>);\n    <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'onLoad app.globalData.employId = \'</span> + app.globalData.employId);\n    <span class=\"hljs-comment\">//判断是用户是否绑定了</span>\n    <span class=\"hljs-keyword\">if</span> (app.globalData.employId &amp;&amp; app.globalData.employId != <span class=\"hljs-string\">\'\'</span>) {\n      <span class=\"hljs-keyword\">this</span>.setData({\n        albumDisabled: <span class=\"hljs-literal\">false</span>,\n        bindDisabled: <span class=\"hljs-literal\">true</span>\n      });\n  }\n})</code></pre><p>打印结果是</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">onLaunch\nonLoad\nonLoad app.globalData.employId = \nonLaunch-request-success</code></pre><p><br></p><p>要是能等完onLaunch请求完再执行Page的onLoad方法那该多好。<br>这里采用的方法是定义一个回调函数。<br>Page页面判断一下当前app.globalData.employId是否有值，如果没有（第一次）则定义定义一个app方法（回调函数）app.employIdCallback = employId =&gt; {...}。</p><p>App页面在请求success后判断时候有Page页面定义的回调方法，如果有就执行该方法。因为回调函数是在Page里面定义的所以方法作用域this是指向Page页面。</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-comment\">//app.js</span>\nApp({\n  onLaunch: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    wx.request({\n      url: <span class=\"hljs-string\">\'test.php\'</span>, <span class=\"hljs-comment\">//仅为示例，并非真实的接口地址</span>\n      data: {\n      },\n      success: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\">res</span>) </span>{\n        <span class=\"hljs-keyword\">this</span>.globalData.employId = res.employId;\n        <span class=\"hljs-comment\">//由于这里是网络请求，可能会在 Page.onLoad 之后才返回</span>\n        <span class=\"hljs-comment\">// 所以此处加入 callback 以防止这种情况</span>\n        <span class=\"hljs-keyword\">if</span> (<span class=\"hljs-keyword\">this</span>.employIdCallback){\n           <span class=\"hljs-keyword\">this</span>.employIdCallback(employId);\n        }\n      }\n    })\n  },\n  globalData: {\n    employId: <span class=\"hljs-string\">\'\'</span>\n  }\n})\n<span class=\"hljs-comment\">//index.js</span>\n<span class=\"hljs-comment\">//获取应用实例</span>\n<span class=\"hljs-keyword\">const</span> app = getApp()\n\nPage({\n  data: {\n    albumDisabled: <span class=\"hljs-literal\">true</span>,\n    bindDisabled: <span class=\"hljs-literal\">false</span>\n  },\n  onLoad: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-comment\">//判断是用户是否绑定了</span>\n    <span class=\"hljs-keyword\">if</span> (app.globalData.employId &amp;&amp; app.globalData.employId != <span class=\"hljs-string\">\'\'</span>) {\n      <span class=\"hljs-keyword\">this</span>.setData({\n        albumDisabled: <span class=\"hljs-literal\">false</span>,\n        bindDisabled: <span class=\"hljs-literal\">true</span>\n      });\n    } <span class=\"hljs-keyword\">else</span> {\n      <span class=\"hljs-comment\">// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回</span>\n      <span class=\"hljs-comment\">// 所以此处加入 callback 以防止这种情况</span>\n      app.employIdCallback = employId =&gt; {\n        <span class=\"hljs-keyword\">if</span> (employId != <span class=\"hljs-string\">\'\'</span>) {\n          <span class=\"hljs-keyword\">this</span>.setData({\n            albumDisabled: <span class=\"hljs-literal\">false</span>,\n            bindDisabled: <span class=\"hljs-literal\">true</span>\n          });\n        }\n      }\n    }\n  }\n})</code></pre><p>这样的话，就能实现想要的结果。执行顺序就是：</p><p></p><pre><code>[A<span><span>pp</span>] onLaunch -&gt;</span><span>&nbsp;</span>[P<span><span>age</span>] onLoad -&gt;</span><span>&nbsp;</span>[App] onLaunch sucess callback</code></pre><p><br></p>','superadmin','2018-11-05 15:11:57','小程序onLaunch,onLoad 执行生命周期',40,'2018-11-05 15:11:57','superadmin','',0,1),(53,'share','<pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">&lt;meta property=<span class=\"hljs-string\">\"qc:admins\"</span> content=<span class=\"hljs-string\">\"22626771676237546375\"</span> /&gt;</code></pre><p>这个是让网站加入<a href=\"https://www.baidu.com/s?wd=QQ&tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">QQ</a>登录接口，这段代码可放在&lt;head&gt;&lt;/head&gt;之间。<br>申请腾讯接口后，会得到这样的代码，加入接口之后，你的网站上面的注册登录功能，别人可以直接用<a href=\"https://www.baidu.com/s?wd=QQ&amp;tn=SE_PcZhidaonwhc_ngpagmjz&amp;rsv_dl=gh_pc_zhidao\" target=\"_blank\">QQ</a>登录，省去注册的麻烦。</p><p><br></p>','superadmin','2018-11-05 15:59:06','meta property=\"qc:admins\" content=\"22626771676237546375\" 这样的meta标签含义',41,'2018-11-05 15:59:06','superadmin','',0,1),(54,'share','<p>数据库的数量是可以配置的，默认情况下是16个。修改redis.conf下的databases指令：databases 16</p><p><img src=\"/static/upload/pics/2018/11/6VnLBsHZUHCNzO2sZ0mQggsKq.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-11-06 09:43:07','redis配置数据库数量',78,'2018-11-09 21:13:17','saucxs','common/images/pic/avatar_16.jpg',2,1),(55,'share','<p>出现错误：</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-keyword\">while</span> applying the SQL script to the database.\nERROR <span class=\"hljs-number\">1366</span>: <span class=\"hljs-number\">1366</span>: Incorrect string value: <span class=\"hljs-string\">\'\\xE9\\x98\\xBF\\xE9\\x87\\x8C..</span></code></pre><p><img src=\"/static/upload/pics/2018/11/80cVcFJlCOK2jrB1la5Jk1Avk.png\" alt=\"\" style=\"max-width:100%;\" class=\"\"><img src=\"/static/upload/pics/2018/11/9XC91d0P0r4GJm268RAJHS4zt.png\" alt=\"\" style=\"max-width: 100%;\"></p><p><span style=\"font-size: x-large;\">经过排查，原因：</span><b style=\"font-size: x-large;\">是建表的时候选择了数据库类型和参数类型不一致造成的。</b><br></p><p><img src=\"/static/upload/pics/2018/11/8iRrUut_4NlWQyaIe8xuGJ7aL.png\" alt=\"\" style=\"max-width:100%;\" class=\"\"><img src=\"/static/upload/pics/2018/11/9TsBVWlqrywrFKct0eX_gi4eJ.png\" alt=\"\" style=\"max-width: 100%;\" class=\"\"></p><p><img src=\"/static/upload/pics/2018/11/97OkhhZBAl08-CTttLVQp9T8L.png\" alt=\"\" style=\"max-width: 100%;\"><br></p><p><font size=\"5\">解决方案一：改成一致的utf8-default-collation</font></p><p><img src=\"/static/upload/pics/2018/11/9FjtD44VaUxZvAtR32qK8mEoD.png\" alt=\"\" style=\"max-width:100%;\"><img src=\"/static/upload/pics/2018/11/8j27utkn03zH2B0vvisWd4WSf.png\" alt=\"\" class=\"\" style=\"max-width: 100%;\"><span style=\"font-size: x-large;\">解决防范二：下面参数就选数表默认格式：table-default</span></p><p><img src=\"/static/upload/pics/2018/11/8GHRsb-HC8BpsetGa09YY9tkG.png\" alt=\"\" style=\"max-width:100%;\" class=\"\"><img src=\"/static/upload/pics/2018/11/97kQVqzhudMmQ0zU54E7cDr2v.png\" alt=\"\" style=\"max-width: 100%;\"><br></p><p><br></p>','superadmin','2018-11-09 09:59:10','mysql出现数据插入不进去 while applying the SQL script to the database. ERROR 1366: 1366: Incorrect string value: \'\\xE9\\x98\\xBF\\xE9\\x87\\x8C..',74,'2018-11-09 21:09:54','saucxs','common/images/pic/avatar_16.jpg',1,1),(56,'share','<h3>node -v正常、npm -v报错</h3><p><img src=\"/static/upload/pics/2018/11/12BObqfQXblBb9k5_Sxh_egWRs.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p><p><font size=\"4\">解决办法：</font></p><p><font size=\"4\">1、卸载nodejs</font></p><p><img src=\"/static/upload/pics/2018/11/12yXEd7RNPGpwcOGdtbkD5tWuE.png\" alt=\"\" class=\"\" style=\"max-width: 100%;\"><br></p><p><font size=\"4\">2、删除C:\\Users\\Administrator\\AppData\\Roaming下边的npm、npm-cache具体操作如下：</font></p><p><img src=\"/static/upload/pics/2018/11/12YlE02yN8VF0W1A7a35qfP1x9.png\" alt=\"\" style=\"max-width:100%;\"><font size=\"4\"><br></font></p><p><font size=\"4\"><br></font></p><p><font size=\"4\">3、重新安装node.js，再次在dos中输入node -v和npm -v可以看到相应的版本号</font></p><p><br></p>','suning','2018-11-12 22:39:29',' npm -v报错 node -v正确',55,'2018-11-15 20:37:46','superadmin','',1,1),(57,'share','<p><font size=\"5\">首先mysql是不支持布尔类型的，当把一个数据设置成布尔类型的时候,数据库会自动转换成<a href=\"https://www.baidu.com/s?wd=tinyint&tn=44039180_cpr&amp;fenlei=mv6quAkxTZn0IZRqIHckPjm4nH00T1Y3PymYmWN-rjubm1c4rAwh0ZwV5Hcvrjm3rH6sPfKWUMw85HfYnjn4nH6sgvPsT6KdThsqpZwYTjCEQLGCpyw9Uz4Bmy-bIi4WUvYETgN-TLwGUv3EPHRkPjTsPjbk\" target=\"_blank\">tinyint</a>(1)的数据类型,其实这个就是变相的布尔。 默认值也就是1,0两种,分别对应了布尔类型的true和false</font></p><p><br></p>','cxsagmw','2018-11-14 09:05:12','mysql的布尔类型',30,'2018-11-14 09:05:12','cxsagmw','',0,1),(58,'share','<p>Nodemailer 是一个简单易用的 Node.JS 邮件发送模块（通过 SMTP，sendmail，或者 Amazon SES），支持 unicode，你可以使用任何你喜欢的字符集。</p><h2><font size=\"4\">一、安装nodemailer模块</font></h2><pre><ol><li><code class=\"hljs sql\" codemark=\"1\">npm <span class=\"hljs-keyword\">install</span> nodemailer <span class=\"hljs-comment\">--save</span></code></li></ol></pre><blockquote>注意1：nodejs默认安装最新的nodemailer版本，如果版本和nodejs版本不匹配则会提示你下降版本，</blockquote><h2><font size=\"4\">二、邮件账号配置</font></h2><p>在src/common/config/下新建mail.js,配置代码如下：</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-meta\">\'use strict\'</span>;\n<span class=\"hljs-comment\">/**\n * config\n */</span>\n<span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {\n  <span class=\"hljs-comment\">//发送邮件配置</span>\n  host:<span class=\"hljs-string\">\"smtp.qq.com\"</span>,\n  port: <span class=\"hljs-number\">465</span>,\n  domains:<span class=\"hljs-string\">\'[\"qq.com\"]\'</span>,\n  account:<span class=\"hljs-string\">\'184866445@qq.com\'</span>,\n  pass: <span class=\"hljs-string\">\"XXXXXXXXXXXXXXXXXXX\"</span>,\n  <span class=\"hljs-keyword\">from</span>:<span class=\"hljs-string\">\"184866445@qq.com\"</span>,\n  route_on: <span class=\"hljs-literal\">true</span>,\n  encoding: <span class=\"hljs-string\">\"utf-8\"</span>\n};\n</code></pre><p>注意2:QQ邮箱的密码不是你的登录密码，而是在设置/账户里开启SMTP后腾讯给出的一串第三方登录密码</p><p><br></p><h2><font size=\"4\">三、在需要发送邮件的controller里配置：</font></h2><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> <span class=\"hljs-comment\">/*发送邮件*/</span>\n                <span class=\"hljs-keyword\">let</span> smtpTransport = nodemailer.createTransport(<span class=\"hljs-string\">\"SMTP\"</span>, {\n                    host: mailer.host,\n                    secureConnection: <span class=\"hljs-literal\">true</span>,\n                    port: mailer.port,\n                    requiresAuth: <span class=\"hljs-literal\">true</span>,\n                    domains: mailer.domains,\n                    auth: {\n                        user: mailer.account,\n                        pass: mailer.pass\n                    }\n                });\n                smtpTransport.sendMail({\n                    <span class=\"hljs-keyword\">from</span>: mailer.account,\n                    to: email,\n                    subject: <span class=\"hljs-string\">\'交流学习社区邮件-使用NodeJS通过QQ邮箱发出的\'</span>,\n                    html: <span class=\"hljs-string\">\'注册成功，欢迎来到&lt;a href=\"https://www.mwcxs.top\"&gt;交流学习社区&lt;/a&gt;\'</span>\n                },<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\">err, res</span>) </span>{\n                    <span class=\"hljs-built_in\">console</span>.log(err,res);\n                })</code></pre><p><br></p>','suning','2018-11-14 17:14:05','交流学习社区邮件配置',30,'2018-11-17 23:15:12','suning','common/images/pic/avatar_10.jpg',1,1),(59,'nodejs','<p>发现一直不走道，发现是tianchao墙了</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">Downloading https:<span class=\"hljs-comment\">//chromedriver.storage.googleapis.com/2.43/chromedriver_win32.zip</span>\nSaving to C:\\Users\\pc\\AppData\\Local\\Temp\\chromedriver\\chromedriver_win32.zip\n</code></pre><p>这个时候正常上网也是没有办法去获取文件的。但是不管是那种情况，只用如下的安装命令安装完成之后，就可以继续执行npm i 或者其他的依赖包下载方式。</p><p>需要将npm的chromedriver的源地址设置为http://cdn.npm.taobao.org/dist/chromedriver</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">npm install chromedriver --chromedriver_cdnurl=http:<span class=\"hljs-comment\">//cdn.npm.taobao.org/dist/chromedriver</span></code></pre><p><img src=\"/static/upload/pics/2018/11/15WdTng7cJFQcqQ8bWOAX-EraL.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-11-15 21:01:14','npm安装依赖包报错，Downloading https://chromedriver.storage.googleapis.com/2.43/chromedriver_win32.zip',18,'2018-11-15 21:01:14','superadmin','',0,1),(60,'share','<p>这个错误是在新增数据源的时候出现的</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> &lt;el-col <span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span></span>=<span class=\"hljs-string\">\"object-box\"</span> :xs=<span class=\"hljs-string\">\"4\"</span> :sm=<span class=\"hljs-string\">\"4\"</span> :md=<span class=\"hljs-string\">\"4\"</span> :lg=<span class=\"hljs-string\">\"8\"</span> :xl=<span class=\"hljs-string\">\"8\"</span>&gt;\n          <span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">p</span>&gt;</span>对象库<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">p</span>&gt;</span></span>\n          &lt;div <span class=\"hljs-class\"><span class=\"hljs-keyword\">class</span></span>=<span class=\"hljs-string\">\"object-item\"</span> v-<span class=\"hljs-keyword\">for</span>=<span class=\"hljs-string\">\"(item ,index) in listArray\"</span>&gt;\n            <span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">el-button</span> @<span class=\"hljs-attr\">click</span>=<span class=\"hljs-string\">\"addPoint(item.procId,item.name)\"</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"button-style\"</span> <span class=\"hljs-attr\">type</span>=<span class=\"hljs-string\">\"primary\"</span>&gt;</span>{{item.name}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">el-button</span>&gt;</span>\n          <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span></span>\n\n        &lt;<span class=\"hljs-regexp\">/el-col&gt;</span></code></pre><p>画布</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> &lt;div id=<span class=\"hljs-string\">\"labelManage\"</span>&gt;\n            <span class=\"xml\"><span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"main\"</span>&gt;</span>\n              <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"flowchart-canvas\"</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"flowchart-canvas\"</span>&gt;</span>\n                <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"window\"</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"flow-start\"</span>&gt;</span>开始<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n                <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"window\"</span> <span class=\"hljs-attr\">id</span>=<span class=\"hljs-string\">\"flow-end\"</span>&gt;</span>结束<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n                <span class=\"hljs-comment\">&lt;!--&lt;div class=\"window\" id=\"flow-end-1\"&gt;结束&lt;/div&gt;--&gt;</span>\n                <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">div</span> <span class=\"hljs-attr\">:class</span>=<span class=\"hljs-string\">\"item.className\"</span> <span class=\"hljs-attr\">class</span>=<span class=\"hljs-string\">\"window new-item\"</span> <span class=\"hljs-attr\">v-for</span>=<span class=\"hljs-string\">\"(item,index) in sourceArray\"</span> <span class=\"hljs-attr\">:id</span>=<span class=\"hljs-string\">\"item.id\"</span>&gt;</span>{{item.name}}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n              <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span>\n            <span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">div</span>&gt;</span></span>\n          &lt;<span class=\"hljs-regexp\">/div&gt;</span></code></pre><p>初始化和添加数据源</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"> init(){\n      <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-string\">\'aaaaaa\'</span>)\n      jsPlumb.ready(<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-keyword\">var</span> jsPlumbChart = jsPlumb.getInstance({\n          DragOptions: { cursor: <span class=\"hljs-string\">\'pointer\'</span>, zIndex: <span class=\"hljs-number\">2000</span> },\n          PaintStyle: { stroke: <span class=\"hljs-string\">\'#2196f3\'</span>, strokeWidth: <span class=\"hljs-number\">1</span> },  <span class=\"hljs-comment\">//配置自己拖拽小点的时候连接线的默认样式</span>\n          Endpoint: [<span class=\"hljs-string\">\"Dot\"</span>, {radius: <span class=\"hljs-number\">5</span>}], <span class=\"hljs-comment\">//这个是控制连线终端那个小点的半径</span>\n          <span class=\"hljs-comment\">// EndpointStyle : { fill : \"red\" }, //这个是控制连线终端那个小点的样式</span>\n          <span class=\"hljs-comment\">// EndpointHoverStyle  : { fill : \"blue\" }, //这个是控制连线终端那个小点的样式</span>\n          Connector: [<span class=\"hljs-string\">\"Flowchart\"</span>,{curviness:<span class=\"hljs-number\">70</span>}],\n          ConnectionOverlays: [\n            [ <span class=\"hljs-string\">\"Arrow\"</span>, { location: <span class=\"hljs-number\">1</span> } ],\n            [ <span class=\"hljs-string\">\"Label\"</span>, {\n              location: <span class=\"hljs-number\">0.5</span>,\n              label: <span class=\"hljs-string\">\"流程\"</span>,\n              id: <span class=\"hljs-string\">\"label\"</span>,\n              cssClass: <span class=\"hljs-string\">\"aLabel\"</span>\n            }]\n          ],\n          Container:<span class=\"hljs-string\">\"flowchart-canvas\"</span>\n        });\n\n        jsPlumbChart.draggable($(<span class=\"hljs-string\">\'.window\'</span>));\n        jsPlumbChart.addEndpoint(<span class=\"hljs-string\">\'flow-start\'</span>,{uuid:<span class=\"hljs-number\">1</span> , anchor: <span class=\"hljs-string\">\"Bottom\"</span>,  isSource:<span class=\"hljs-literal\">true</span>});\n        jsPlumbChart.addEndpoint(<span class=\"hljs-string\">\'flow-end\'</span>,{uuid:<span class=\"hljs-number\">2</span> ,anchor:<span class=\"hljs-string\">\'Top\'</span>, isTarget:<span class=\"hljs-literal\">true</span>});\n        <span class=\"hljs-comment\">// jsPlumbChart.addEndpoint(\'flow-end-1\',{uuid:2 ,anchor:\'Top\', isTarget:true});</span>\n\n        <span class=\"hljs-comment\">//init connect</span>\n        <span class=\"hljs-comment\">// jsPlumbChart.connect({</span>\n        <span class=\"hljs-comment\">//   uuids:[1,2],  //根据uuid进行连接</span>\n        <span class=\"hljs-comment\">//   paintStyle: { stroke: \'#2196f3\', strokeWidth: 2 },  //线的样式</span>\n        <span class=\"hljs-comment\">//   endpointStyle: { fill: \'blue\', outlineStroke: \'darkgray\', outlineWidth: 2 },//点的样式</span>\n        <span class=\"hljs-comment\">//   overlays: [ [\'Arrow\', { width: 12, length: 12, location: 0.5 }] ]   //覆盖物 箭头 及 样式</span>\n        <span class=\"hljs-comment\">// })</span>\n\n      });\n    },\n    addPoint(procId,name){\n      <span class=\"hljs-keyword\">this</span>.sourceArray.push({\n        procId: procId,\n        parentNode: procId,\n        id: nodeId++,\n        name: name,\n        className: <span class=\"hljs-string\">\'jtk-draggable jtk-endpoint-anchor\'</span>\n      })\n      <span class=\"hljs-built_in\">console</span>.log(nodeId,<span class=\"hljs-string\">\'nodeId\'</span>)\n      <span class=\"hljs-built_in\">console</span>.log(nodeId.toString(),<span class=\"hljs-string\">\'nodeId\'</span>)\n      jsPlumb.ready(<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-keyword\">var</span> jsPlumbChart = jsPlumb.getInstance({\n          DragOptions: { cursor: <span class=\"hljs-string\">\'pointer\'</span>, zIndex: <span class=\"hljs-number\">2000</span> },\n          PaintStyle: { stroke: <span class=\"hljs-string\">\'#2196f3\'</span>, strokeWidth: <span class=\"hljs-number\">1</span> },  <span class=\"hljs-comment\">//配置自己拖拽小点的时候连接线的默认样式</span>\n          Endpoint: [<span class=\"hljs-string\">\"Dot\"</span>, {radius: <span class=\"hljs-number\">5</span>}], <span class=\"hljs-comment\">//这个是控制连线终端那个小点的半径</span>\n          <span class=\"hljs-comment\">// EndpointStyle : { fill : \"red\" }, //这个是控制连线终端那个小点的样式</span>\n          <span class=\"hljs-comment\">// EndpointHoverStyle  : { fill : \"blue\" }, //这个是控制连线终端那个小点的样式</span>\n          Connector: [<span class=\"hljs-string\">\"Flowchart\"</span>,{curviness:<span class=\"hljs-number\">70</span>}],\n          ConnectionOverlays: [\n            [ <span class=\"hljs-string\">\"Arrow\"</span>, { location: <span class=\"hljs-number\">1</span> } ],\n            [ <span class=\"hljs-string\">\"Label\"</span>, {\n              location: <span class=\"hljs-number\">0.5</span>,\n              label: <span class=\"hljs-string\">\"流程\"</span>,\n              id: <span class=\"hljs-string\">\"label\"</span>,\n              cssClass: <span class=\"hljs-string\">\"aLabel\"</span>\n            }]\n          ],\n          Container:<span class=\"hljs-string\">\"flowchart-canvas\"</span>\n        });\n        jsPlumbChart.addEndpoint(nodeId.toString(), {\n          uuid:nodeId.toString(),\n          anchors: [<span class=\"hljs-string\">\'Right\'</span>],\n          isTarget:<span class=\"hljs-literal\">true</span>\n        })\n      })\n      <span class=\"hljs-comment\">// jsPlumb.addEndpoint(nodeId.toString(),{uuid:nodeId.toString(), anchor:\'Top\', isTarget:true});</span>\n    }</code></pre><p><img src=\"/static/upload/pics/2018/11/16g6PgiVRs7Ft1k2Bpfy5AO9F_.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','suning','2018-11-16 13:32:02','在vue中使用jsplumb出现错误TypeError: Cannot read property \'parentNode\' of null',19,'2018-11-16 13:32:02','suning','common/images/pic/avatar_10.jpg',0,1),(61,'share','<p>虽然 Vue.js 通常鼓励开发人员沿着“数据驱动”的方式思考，避免直接接触 DOM，但是有时我们确实要这么做</p><p><font size=\"4\"><b>一、this.$nextTick()</b></font></p><p></p><p>官方解释：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。</p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">Vue.component(<span class=\"hljs-string\">\'example\'</span>, {\n  template: <span class=\"hljs-string\">\'&lt;span&gt;{{ message }}&lt;/span&gt;\'</span>,\n  data: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n    <span class=\"hljs-keyword\">return</span> {\n      message: <span class=\"hljs-string\">\'not updated\'</span>\n    }\n  },\n  methods: {\n    updateMessage: <span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n      <span class=\"hljs-keyword\">this</span>.message = <span class=\"hljs-string\">\'updated\'</span>\n      <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-keyword\">this</span>.$el.textContent) <span class=\"hljs-comment\">// =&gt; \'not updated\'</span>\n      <span class=\"hljs-keyword\">this</span>.$nextTick(<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> (<span class=\"hljs-params\"></span>) </span>{\n        <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-keyword\">this</span>.$el.textContent) <span class=\"hljs-comment\">// =&gt; \'updated\'</span>\n      })\n    }\n  }\n})</code></pre><p><br></p><p><font size=\"3\"><b>二、注意</b></font></p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\"><span class=\"hljs-keyword\">this</span>.nextTick(callback)，当数据发生变化，更新后执行回调。\n<span class=\"hljs-keyword\">this</span>.$nextTick(callback)，当dom发生变化，更新后执行的回调。</code></pre><p><br></p>','suning','2018-11-16 16:18:24','vue中操作DOM--this.$nextTick()，dom发生改变的时候，执行回调',27,'2018-11-16 16:18:24','suning','common/images/pic/avatar_10.jpg',0,1),(62,'nodejs','<p>出现错误：</p><p><img src=\"/static/upload/pics/2018/11/16IWwORPK0g6K9pr-l7lQfkr6Y.png\" alt=\"\" style=\"max-width:100%;\" class=\"\"><br></p><p>解决办法：</p><p>修改config</p><p><img src=\"/static/upload/pics/2018/11/16fnC6Ymvb8PbhsHQYxvFy5Tu5.png\" alt=\"\" style=\"max-width: 100%;\"></p><p><br></p>','admin','2018-11-16 22:22:39','vue-npm问题，打包错误 TypeError: Path must be string. Received undefined',27,'2018-11-21 00:10:21','superadmin','',2,1),(63,'share','<p></p><p><ol><li><i style=\"font-size: large;\"><u><b><font color=\"#ff0000\" style=\"background-color: rgb(0, 0, 0);\"><strike>骨灰</strike>盒</font></b></u></i></li></ol></p><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;<img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/0b/tootha_thumb.gif\"><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/af/kl_thumb.gif\"><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/6a/laugh.gif\"><img src=\"http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/4a/mm_thumb.gif\"></td></tr></tbody></table><p><br></p>','interesting','2018-11-20 16:12:39','share',24,'2018-11-20 16:12:39','interesting','',0,1),(71,'share','<article><p>1、登录网景官网的下载页面：</p><a href=\"https://www.netsarang.com/download/down_form.html?code=622\" target=\"_blank\">https://www.netsarang.com/download/down_form.html?code=622</a>&nbsp;，页面截图如下：<p><img src=\"https://img-blog.csdn.net/20180301221726423?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaXR4aWFvbG9uZzM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70\" alt=\"\"><br></p><p><img src=\"https://img-blog.csdn.net/20180301221705648?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaXR4aWFvbG9uZzM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70\" alt=\"\"><br></p><p>2、你填写的邮箱会接收到邮件，截图如下：<br></p><p><img src=\"https://img-blog.csdn.net/20180301221852343?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaXR4aWFvbG9uZzM=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70\" alt=\"\"><br><br></p></article><p><newsfeed><info-div></info-div></newsfeed><a></a><br></p><p><br></p>','cxsagmw','2018-11-24 11:59:23','原 xshell6 评估期已过 解决办法',23,'2018-11-24 11:59:23','cxsagmw','common/images/pic/avatar_2.jpg',0,1),(72,'share','<p>需求：需要透明背景,但是图片不要透明</p><p>最初：</p><p><img src=\"/static/upload/pics/2018/11/26vR_K1rB8ibJH9lnfWYYqxQWS.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><font size=\"5\"><b>使用方法opacity</b></font></p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">background: #<span class=\"hljs-number\">ccc</span>;\nopacity: <span class=\"hljs-number\">0.6</span>;<br></code></pre><p>这种实现的是整个dom透明：</p><p><img src=\"/static/upload/pics/2018/11/26zFTORRvbKrSFB05PH91dqPxe.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p><p><font size=\"5\"><b>方法rgba</b></font></p><pre style=\"max-width: 100%;\"><code class=\"javascript hljs\" codemark=\"1\">background: rgba(<span class=\"hljs-number\">77</span>, <span class=\"hljs-number\">77</span>, <span class=\"hljs-number\">77</span>, <span class=\"hljs-number\">0.6</span>);</code></pre><p>实现的是背景色的透明</p><p><img src=\"/static/upload/pics/2018/11/26czTnYbuAvq_2LSenaOE3HpTI.png\" alt=\"\" style=\"max-width:100%;\"><br></p><p><br></p>','superadmin','2018-11-26 16:01:30','opacity是整个dom透明；background中rgba是背景色透明',2,'2018-11-26 16:01:30','superadmin','',0,1);
/*!40000 ALTER TABLE `li_topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_topic_comment`
--

DROP TABLE IF EXISTS `li_topic_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_topic_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) NOT NULL,
  `tid` bigint(20) DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL COMMENT '主题标题',
  `createtime` datetime DEFAULT NULL,
  `pic` varchar(255) DEFAULT '' COMMENT '回复者头像',
  `like` bigint(20) DEFAULT '0',
  `comment` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `likers` text,
  `oldcomment` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_topic_comment`
--

LOCK TABLES `li_topic_comment` WRITE;
/*!40000 ALTER TABLE `li_topic_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `li_topic_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_topic_item`
--

DROP TABLE IF EXISTS `li_topic_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_topic_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `comment` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_topic_item`
--

LOCK TABLES `li_topic_item` WRITE;
/*!40000 ALTER TABLE `li_topic_item` DISABLE KEYS */;
INSERT INTO `li_topic_item` VALUES (1,'share','分享'),(2,'ask','问答'),(3,'job','招聘'),(4,'go','go'),(5,'java','java'),(6,'thinkjs','thinkjs'),(7,'linux','linux'),(8,'vue','vue'),(9,'javascript','javascript'),(10,'python','python'),(11,'miniProgram','小程序'),(12,'nodejs','nodejs');
/*!40000 ALTER TABLE `li_topic_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_user`
--

DROP TABLE IF EXISTS `li_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_user` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` int(255) DEFAULT '4',
  `openid` varchar(255) DEFAULT NULL COMMENT '第三方登录标识',
  `pic` varchar(255) DEFAULT '' COMMENT '头像',
  `way` varchar(255) DEFAULT 'site' COMMENT '登录方式',
  `point` varchar(255) DEFAULT '10' COMMENT '积分',
  `sign` text COMMENT '个性签名',
  `createtime` datetime DEFAULT NULL,
  `level` int(11) DEFAULT '1' COMMENT '等级',
  `vip` int(11) DEFAULT '0' COMMENT 'vip',
  `isverify` int(11) DEFAULT '0' COMMENT '是否已验证邮箱',
  `forgetFlag` tinyint(4) DEFAULT NULL COMMENT '是否找回密码，1--是，0--否',
  `forget_uuidCode` varchar(512) DEFAULT NULL COMMENT '随机产生的授权码',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_user`
--

LOCK TABLES `li_user` WRITE;
/*!40000 ALTER TABLE `li_user` DISABLE KEYS */;
INSERT INTO `li_user` VALUES (56,'admin','admin','836e5d18d15f021bb70d5f97f0a1c0b0','15566151641@163.com',1,NULL,'common/images/pic/avatar_7.jpg','site','20',NULL,'2016-08-22 14:44:32',1,0,0,0,'GsIt0kI17DrOqu9Yd3wdoiDFp9HypM7lTsHH_uj6Qsp5T9xTYEeKWzYjbK7RwRG5W5qz_Jce2wS9Wk3HpK1N1Z0AjDUGBeRh6CYDkGCe5Cadzgl6bckkE_hNsYX3rWYL');
/*!40000 ALTER TABLE `li_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `li_user_collect`
--

DROP TABLE IF EXISTS `li_user_collect`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `li_user_collect` (
  `id` bigint(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL COMMENT '类型',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL COMMENT '文章id',
  `iscollect` int(11) DEFAULT '1' COMMENT '是否收藏',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `li_user_collect`
--

LOCK TABLES `li_user_collect` WRITE;
/*!40000 ALTER TABLE `li_user_collect` DISABLE KEYS */;
INSERT INTO `li_user_collect` VALUES (26,'/topic/item/23',' E井在线商城招聘前端开发工程师(15-30k) ','livichen','2016-08-23 19:00:48','topic',23,1),(27,'/topic/item/27',' css3中display:box 和display:flex区别 ','asf1988','2016-08-29 19:31:08','topic',27,1),(28,'/topic/item/27',' css3中display:box 和display:flex有区别？ ','bbq2013','2016-08-29 19:41:25','topic',27,1),(29,'/topic/item/28',' div垂直水平居中的几种方法 ','bbt1991','2016-09-02 10:14:56','topic',28,1),(30,'/topic/item/31.html',' 新手求解，thinkjs如何生成随机验证码，并返回至前台？ ','livisky','2016-09-02 16:32:09','topic',31,1),(31,'/topic/item/34.html','nodeJSBlog功能更新','livisky','2016-09-18 19:14:01','topic',34,1),(33,'/topic/item/42.html',' 不蒜子统计：两行代码 搞定计数','superadmin','2018-10-29 16:08:33','topic',42,1),(34,'/topic/item/45','docker启动gitlab，报错driver failed programming external connectivity on endpoint gitlab 。。。','superadmin','2018-10-30 11:09:52','topic',45,1),(35,'/topic/item/55','mysql出现数据插入不进去 while applying the SQL script to the database. ERROR 1366: 1366: Incorrect string value: \'\\xE9\\x98\\xBF\\xE9\\x87\\x8C..','saucxs','2018-11-09 21:10:11','topic',55,1);
/*!40000 ALTER TABLE `li_user_collect` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-11 10:13:06
