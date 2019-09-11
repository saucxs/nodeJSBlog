'use strict';

import fs from "fs";
import path from "path";
import Base from './base.js';
import request from "request";

export default class extends Base
{
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction()
    {
        let articlelist ={},result={},list={};
        let selval=this.get('type');
        let searchtxt=this.get('search');
        let pagenumber=this.get('page')||1;
        let pagesize=this.get('pagesize')||1;
        // 设置分页
        if(selval){
            //文章筛选
            let map={item: {'!=': 2},};
            map[this.get('type')]=1;
            articlelist = await this.model("admin").getArticleJoinRecord(map,pagenumber,pagesize);
            result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
            this.assign("type", selval);
        }else if(searchtxt){
            //文章搜索
            let map={item: {'!=': 2},title: ["like", "%"+searchtxt+"%"],['li_article.id']:["like", "%"+searchtxt*1+"%"],_logic: "OR"};
            articlelist = await this.model("admin").getArticleJoinRecord(map,pagenumber,pagesize);
            result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
            this.assign("type", '');
        }else{
            let map={item: {'!=': 2},};
            articlelist = await this.model("admin").getArticleJoinRecord(map,pagenumber,pagesize);
            result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
            this.assign("type", '');
        }
        let Page = think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData = page.pagination(result);
        this.assign("articlelist", articlelist);
        this.assign('pageData', pageData);

        // 设置分页
        let pageSize = await this.config("pagesize");
        if (!this.get("page")) {
            return this.redirect("/admin/content/index?page=1&pagesize=" + pageSize);
        }
        this.assign("title", "文章管理");
        this.assign("pagecount",this.get("page"));
        this.assign("pagesize",pageSize);
        this.assign('isdraft', false);
        return this.display();
    }

    //资讯列表
    async newsAction()
    {
        let articlelist ={},result={},list={};
        let selval=this.get('type');
        let searchtxt=this.get('search');
        let pagenumber=this.get('page')||1;
        let pagesize=this.get('pagesize')||1;
        // 设置分页
        let map={item: 2};
        console.log('---------------------------')
        articlelist = await this.model("admin").getArticleNewsJoinRecord(map,pagenumber,pagesize);
        result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
        this.assign("type", '');
        // console.log(selval,searchtxt,'0000000000000000000000000000000000000000')
        // if(selval){
        //     //文章筛选
        //     let map={};
        //     map[this.get('type')]=1;
        //     articlelist = await this.model("admin").getArticleJoinRecord(map,pagenumber,pagesize);
        //     result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
        //     this.assign("type", selval);
        // }else if(searchtxt){
        //     //文章搜索
        //     let map={title: ["like", "%"+searchtxt+"%"],['li_article.id']:["like", "%"+searchtxt*1+"%"],_logic: "OR"};
        //     articlelist = await this.model("admin").getArticleJoinRecord(map,pagenumber,pagesize);
        //     result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
        //     this.assign("type", '');
        // }else{
        //     let map={item: 2};
        //     console.log('---------------------------')
        //     articlelist = await this.model("admin").getArticleNewsJoinRecord(map,pagenumber,pagesize);
        //     result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
        //     this.assign("type", '');
        // }
        let Page = think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData = page.pagination(result);
        this.assign("articlelist", articlelist);
        this.assign('pageData', pageData);

        // 设置分页
        let pageSize = await this.config("pagesize");
        if (!this.get("page")) {
            return this.redirect("/admin/content/news?page=1&pagesize=" + pageSize);
        }
        this.assign("title", "资讯管理");
        this.assign("pagecount",this.get("page"));
        this.assign("pagesize",pageSize);
        this.assign('isdraft', false);
        return this.display('news');
    }
    async draftlistAction(){
        // 设置分页
        let map={ispublished:0};
        let pagenumber=this.get('page')|1;
        let pagesize=this.get('pagesize')|1;
        let articlelist = await this.model("admin").getDraftJoinRecord({
            tags: {on: "tag, id"}
        },map,pagenumber,pagesize);
        let result = await this.model("admin").getPageCountSelect(map,pagenumber,pagesize);
        let Page = think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData = page.pagination(result);
        this.assign("articlelist", articlelist);
        this.assign('pageData', pageData);
        this.assign('isdraft', true);

        // 设置分页
        let pageSize = await this.config("pagesize");
        if (!this.get("page")) {
            return this.redirect("/admin/content/draftlist?page=1&pagesize=" + pageSize);
        }
        this.assign("title", "草稿箱列表");
        this.assign("pagecount",this.get("page"));
        this.assign("pagesize",pageSize);
        return this.display('index');
    }
    //文章编辑/新增
    async articleAction()
    {
        //获取分类
        let tagsList=await this.model("admin").findAll("tags");
        this.assign("tagsList",tagsList);
        //获取类型
        let itemList=await this.model("admin").findAll("item");
        this.assign("itemList",itemList);
        //编辑或者新增
        if (this.get('id')) {
            let article = await this.model('admin').findOne('article',{id:this.get('id')});
            let picurl=(article.picurl==='')?'/static/common/images/common/default.jpg':article.picurl;
            let tag_selected_id=article.tag;
            let item_selected_id=article.item;
            if(tag_selected_id){
                this.assign("tagselectedId",tag_selected_id);
            }else{
                this.assign("tagselectedId",'');
            }
            if(item_selected_id){
                this.assign("itemselectedId",item_selected_id);
            }else{
                this.assign("itemselectedId",'');
            }
            this.assign("piccss", 'background-image: url('+picurl+');background-size:82px 82px;');
            this.assign("picurl", picurl);
            this.assign('article', article);

            this.assign("title", "文章编辑");

        } else {
            this.assign('article', {});
            this.assign("selectedId",'');
            this.assign("picurl", '');
            this.assign("piccss",'');
            this.assign("tagselectedId",'');
            this.assign("itemselectedId",'');
            this.assign("title", "文章添加");
        }
        this.assign('ismarkdown',false);//不显示markdown导入
        return this.display();
    }

    //新增markdown文章
    async addmarkdownAction()
    {
        //获取分类
        let tagsList=await this.model("admin").findAll("tags");
        this.assign("tagsList",tagsList);
        //获取类型
        let itemList=await this.model("admin").findAll("item");
        this.assign("itemList",itemList);
        //新增
        this.assign("title", "markdown文章添加");
        this.assign('article', {});
        this.assign("selectedId",'');
        this.assign("picurl", '');
        this.assign("piccss",'');
        this.assign("tagselectedId",'');
        this.assign("itemselectedId",'');
        this.assign('ismarkdown',true);
        return this.display('article');

    }

    //新增/编辑文章提交接口
    async doaddAction(){   //编辑或者新增
        let mycreatetime=think.datetime(this.post('createtime'));
        let data=await this.post();
        data.createtime=mycreatetime;
        if(!think.isEmpty(this.post("id"))){
            let rs=await this.model("admin").updateRecord("article",{},data);
            this.baiduAction();
            if(rs) return this.success();
        }else{
            let articleinfo=await this.model("admin").addRecord("article",data);
            this.baiduAction();
            return this.success({id:articleinfo});
        }
    }
    /*自动实时推送提交链接*/
    async baiduAction(){
        let arr = [];
        let data = {};
        /*获取系统配置*/
        let sysdata=await this.model('admin').findOne('system');
        //获取分类页list
        let list=await this.model("item").select();
        //获取文章列表article
        let article=await this.model("article").select();
        //获取主题帖
        let topic=await this.model("topic").select();
        //获取用户
        let user=await this.model("user").select();
        //其他
        let others=[
            { id: 1, itemname: '大杂烩',url:'others.html' },
            { id: 2, itemname: '前端资讯',url:'news.html' },
            { id: 3, itemname: 'nodejs',url:'node.html' },
            { id: 4, itemname: '资源下载',url:'download.html' },
            { id: 5, itemname: '招聘',url:'jobs.html' },
            { id: 6, itemname: '活动',url:'activity.html' },
            { id: 7, itemname: '关于',url:'about.html' },
            { id: 8, itemname: '友情链接',url:'links.html' },
            { id: 9, itemname: '注册',url:'register.html' },
            { id: 10, itemname: '捐赠',url:'donate.html' },
            { id: 11, itemname: '推广服务',url:'ads.html' },
            { id: 12, itemname: '注册协议',url:'policy.html' },
            { id: 13, itemname: '版权声明',url:'copyright.html' },
            { id: 14, itemname: '会员登录',url:'login.html' },
            { id: 15, itemname: '留言板',url:'guest.html' },
            { id: 16, itemname: 'nodeJSBlog',url:'nodejsblog.html' },
        ];
        data={
            sysdata:sysdata,
            list:list,
            article:article,
            topic:topic,
            user: user,
            others: others
        }
        arr.push(data.sysdata.homeurl);
        for(let i=0,length=data.article.length;i<length;i++){
            arr.push(data.sysdata.homeurl + 'page/'+ data.article[i].id +'.html')
        }
        for(let i=0,length=data.list.length;i<length;i++){
            arr.push(data.sysdata.homeurl + 'category/'+ (data.list[i].id) +'.html')
        }
        for(let i=0,length=data.topic.length;i<length;i++){
            arr.push( data.sysdata.homeurl + 'topic/item/'+ data.topic[i].id +'.html')
        }
        for(let i=0,length=data.user.length;i<length;i++){
            arr.push( data.sysdata.homeurl + 'personal/@'+ data.user[i].name + '.html')
        }
        for(let i=0,length=data.others.length;i<length;i++){
            arr.push( data.sysdata.homeurl + data.others[i].url)
        }

        var bodyString = arr.join('\n');
        fs.writeFileSync(path.resolve(think.ROOT_PATH, './www/site_url.txt'), arr.join('\n'));
        request.post({
            url: 'http://data.zz.baidu.com/urls?site=https://www.mwcxs.top&token=CuY4HYkx9GrCwdXc',
            body: bodyString
        }, function (err, res, body) {
            console.log(body,'baidu9999999999999999999999999999999999999999999')
            if(!err){
                return this.json({err:err,body:body});
            }else{
                return this.json(err);
            }
        });
        /*熊掌号每周*/
        request.post({
            url: 'http://data.zz.baidu.com/urls?appid=1618168323287168&token=RJP3Edxoplt9Der5&type=batch',
            body: bodyString
        }, function (err, res, body) {
            console.log(body,'baiduxiongzhang666666666666666666666666666666666666666666666666666666666666666weekly')
            if(!err){
                return this.json({err:err,body:body});
            }else{
                return this.json(err);
            }
        });
    }

    async updatestatusAction(){   //草稿箱发布接口
        let pid=await this.post("id");
        if(!think.isEmpty(pid)){
           let rs=await this.model("admin").updateRecord("article",{id:pid},{ispublished:1});
            if(rs){
                return this.success();
            }
        }
    }
    //删除或批量删除接口
    async delsomeAction(){
        let arr=await this.post('delarr[]');
        let where={id: ["IN", arr]};
        let rs=await this.model("admin").deleteRecord("article",where);
        if(rs){
            //操作成功
            return this.success();
        }
    }

    //上传图片接口
    async uploadAction()
    {
        let IS_USE_OSS=think.config('OSS.on');
        if(IS_USE_OSS){
            //上传OSS图片接口
            let ALIOSS = think.service("alioss");
            let alioss = new ALIOSS();
            let file = think.extend({}, this.file('file'));
            let rs=await alioss.upload(file);
            console.log(rs);
            if(rs){
                return this.json({path: think.config('OSS.domain')+"/"+rs.name});
            }else{
                return this.json("上传失败！");
            }
        }else{
            //上传应用服务器图片接口
            let file = think.extend({}, this.file('file'));
            let filepath = file.path;
            let newpath = liFormatDate(new Date().toLocaleDateString());
            let uploadPath = think.UPLOAD_PATH + '/pics/' + newpath;
            think.mkdir(uploadPath);
            let basename = path.basename(filepath);
            fs.renameSync(filepath, uploadPath + basename);
            this.json({path: "/static/upload/pics/" + newpath + basename});
        }
    }

    //上传阿里云OSS图片接口
    async uploadeditorAction()
    {
        let IS_USE_OSS=think.config('OSS.on');
        if(IS_USE_OSS){
            //上传OSS图片接口
            let ALIOSS = think.service("alioss");
            let alioss = new ALIOSS();
            let file = think.extend({}, this.file('thumb_img'));
            let rs=await alioss.upload(file);
            if(rs){
                return this.json(think.config('OSS.domain')+"/"+rs.name);
            }else{
                return this.json("上传失败！");
            }
        }else{
            //上传应用服务器图片接口
            let file = think.extend({}, this.file('thumb_img'));
            let filepath = file.path;
            let newpath = liFormatDate(new Date().toLocaleDateString());
            let uploadPath = think.UPLOAD_PATH + '/pics/' + newpath;
            think.mkdir(uploadPath);
            let basename = path.basename(filepath);
            fs.renameSync(filepath, uploadPath + basename);
            this.json("/static/upload/pics/" + newpath + basename);
        }
    }
    //上传markdown文件及解析接口、内容分页
    async uploadfileAction()
    {
        let marked = require('marked');
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });

        let file = think.extend({}, this.file('file'));
        let data = await getContent(file.path);
        let html = await marked(data);

        function encodeHTMLContent(str) {
            return str.replace(/&quot;/g, '"').replace(/&lt;!--/g,"<!--").replace(/--&gt;/g,"-->");
        }

        let newHtml=encodeHTMLContent(html),ainfo={};
        if(newHtml){
            let ainfo_obj;
            if(newHtml.indexOf("<!--")>0 && newHtml.indexOf("-->")>0){
                //获取注释信息
                let end=newHtml.indexOf("-->")-1;
                let note=newHtml.substr(0,newHtml.indexOf("-->")-1)
                if(note.indexOf("{")>=0 && note.indexOf("-")>0){
                    ainfo=note.substr(note.indexOf("{"),end);
                }
                try{
                    ainfo_obj = JSON.parse(ainfo);
                }catch(err){
                    //通过 err.message 拿到具体的错误信息
                    return this.fail(1000, '解析错误！请检查文章配置项!');
                }
                this.json({articlehtml:newHtml,ainfo:ainfo_obj});
            }else{
                this.json({articlehtml:html});
            }
        }
    };

}
