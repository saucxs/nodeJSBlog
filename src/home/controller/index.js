'use strict';

import Base from './base.js';
import Create from './sitemap.js';

let nodemailer = require("nodemailer");
let mailer=think.config("mail");

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    // 首页
    async indexAction(){
        let setting=await this.model('home').findOne('system_comment');
        this.assign("setting",setting);
        return this.displayView('index_index');
    }

    //文章页
    async pageAction(){
        let aid= await this.get("aid");
        let blogInfo=await this.model("home").findOne('article',{id:aid});
        if(blogInfo.ispublished===1){
            // 设置浏览量加1
            let viewcount=await this.model("home").addViewCount({id:aid});
            //获取标签名
            let tagItem=await this.model("home").findOne("tags",{id:blogInfo.tag});
            this.assign('blogInfo',blogInfo);
            //设置文章分页
            let html=blogInfo.content;
            let strArray=[],particle='',ainfo='';
            let pid=this.get('pid');
            if(html){
                if(html.indexOf("<!--page-->")>0){
                    strArray=html.split("<!--page-->");
                    if(pid){
                        let id=pid*1-1;
                        particle=strArray[id];
                    }else{
                        pid=1;
                        particle=strArray[0];
                    }
                }
            }
            //关联文章
            let relatearticle=await this.model("home").getArticleList({tag:blogInfo.tag,ispublished:1})
            this.assign("relatearticle",relatearticle);

            //跳转到内容分页
            let tagname=tagItem.tagname||'';
            let title=blogInfo.title||'';
            let strArrayVal=strArray||'';
            let particleVal=particle||'';

            this.assign("title",blogInfo.title);
            this.assign('strArray',strArrayVal);
            this.assign('particle',particleVal);
            this.assign('pid',pid);
            this.assign('tagname',tagname);

            let setting=await this.model('home').findOne('system_comment');
            this.assign("setting",setting);

            return this.displayView('index_page');
        }else{
            return this.displayView("../common/error_404");
        }
    }

    async previewAction(){
        let aid= await this.get("aid");
        let blogInfo=await this.model("home").findOne("article",{id:aid});
        // 设置浏览量加1
        let viewcount=await this.model("home").addViewCount({id:aid});
        //获取标签名
        let tagItem=await this.model("home").findOne("tags",{id:blogInfo.tag});
        this.assign('blogInfo',blogInfo);
        //设置文章分页
        let html=blogInfo.content;
        let strArray=[],particle='',ainfo='';
        let pid=this.get('pid');
        if(html){
            if(html.indexOf("<!--page-->")>0){
                strArray=html.split("<!--page-->");
                if(pid){
                    let id=pid*1-1;
                    particle=strArray[id];
                }else{
                    pid=1;
                    particle=strArray[0];
                }
            }
        }
        //跳转到内容分页
        let tagname=tagItem.tagname||'';
        let title=blogInfo.title||'';
        let strArrayVal=strArray||'';
        let particleVal=particle||'';

        this.assign("title",blogInfo.title);
        this.assign('strArray',strArrayVal);
        this.assign('particle',particleVal);
        this.assign('pid',pid);
        this.assign('tagname',tagname);
        return this.displayView('index_preview');
    }
    //前端资讯
    async newsAction(){
        this.getList(2,'news');
    }
    //nodejs文章
    async nodeAction(){
        this.getList(3,'node');
    }
    //苹果精品软件
    async downloadAction(){
        this.getList(4,'download');
    }
    //活动
    async activityAction(){
        this.getList(6,'activity');
    }
    //大杂烩
    async othersAction(){
        this.getList(1,'others');
    }
    //招聘
    async jobsAction(){
        this.getList(5,'jobs');
    }
    //分类公用方法
    async getList(itemId,menu){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("home").getPageSelect({item:itemId,ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({item:itemId,ispublished:1},pagenumber,pagesize);
        var Page=think.adapter("template", "page");
        var page = new Page(this.http);
        var pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu',menu);
        //分页

        let item=await this.model("home").findOne("item",{id:itemId});
        this.assign('categoryName',item.itemname);
        this.assign('more',0);
        return this.displayView("index_item");
    }
    async moreAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        //分页
        let itemList=await this.model("home").getPageSelect({ispublished:1,item:{"!=":8}},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({ispublished:1,item:{"!=":8}},pagenumber,pagesize);
        let Page=think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData=page.pagination(result);

        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        this.assign('menu','more');
        //分页
        this.assign('more',1);
        this.assign('categoryName','全部文章');
        return this.displayView("index_category");
    }
    //分类
    async categoryAction(){
        let pagenumber=this.get("page")||1;
        let pagesize=this.get("pagesize")||10;
        let itemId=await this.get("id");

        let itemList=await this.model("home").getPageSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        let result = await this.model("home").getPageCountSelect({tag:itemId,ispublished:1},pagenumber,pagesize);
        let Page=think.adapter("template", "page");
        let page = new Page(this.http);
        let pageData=page.pagination(result);
        this.assign("itemList",itemList);
        this.assign('pageData',pageData);
        //分页
        let category=await this.model("home").findOne("tags",{id:itemId});
        this.assign('categoryName',category.tagname);
        this.assign('more',0);
        this.assign('menu','category/'+itemId);
        return this.displayView('index_category');

    }

    // 友情链接提交接口
    async linkssaveAction(){
        let mydata =await this.post();
        if(mydata.domain!==''&&mydata.link!==''&&mydata.qq!==''){
            let rs=await this.model("home").addRecord("links",mydata);
            if(rs) return this.success();
        }
    }
    // 留言提交接口
    async guestsaveAction(){
        let mydata =await this.post();
        if(mydata.nickname!==''&&mydata.contact!==''&&mydata.guest!==''){
            let rs=await this.model("home").addRecord("guest",mydata);
            if(rs) return this.success();
        }
    }
    async guestAction(){
        this.assign("title","留言板");
        return this.displayView("index_guest");
    }
    async aboutAction(){
        this.assign("title","关于我们");
        return this.displayView("index_about");
    }
    async adsAction(){
        this.assign("title","推广服务");
        return this.displayView("index_ads");
    }
    async copyrightAction(){
        this.assign("title","版权声明");
        return this.displayView("index_copyright");
    }
    async linksAction(){
        this.assign("title","友情链接");
        return this.displayView("index_links");
    }
    async policyAction(){
        this.assign("title","注册协议");
        return this.displayView("index_policy");
    }
    async donateAction(){
        this.assign("title","捐赠");
        return this.displayView("index_donate");
    }
    async dologoutAction(){
        this.session("uInfo","");
        return this.redirect("/login.html");
    }

    // 站点地图
    async sitemapAction() {
        //生成xml
        let data={};
        let sysdata=await this.model("system").find();
        //获取分类页list
        let list=await this.model("item").select();
        //获取文章列表article
        let article=await this.model("article").select();
        //获取主题帖
        let topic=await this.model("topic").select();
        //获取用户
        let user=await this.model("user").select();
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
            others:others,
            topic:topic,
            user: user
        }
        Create.createXml(data);
        Create.createSiteMap(data);
        return this.displaySiteMapView("sitemap");

    }

    async nodejsblogAction(){
        return this.displayView("index_nodejsblog");
    }

    /*定时任务接口-发送邮件*/
    async sendmaildayAction(){
        let teacherData = await this.model("other_user").field('email,name').select();
        let emailData = await this.model("user").field('email,name').select();
        let systemData = await this.model("system").find();
        let articleData = await this.model("article").field('id,title').limit(10).where({'ispublished': '1'}).order("id desc").select();
        let articleListData = '';
        let menuData = await this.model("menu").order("orders asc").where({'appear': '1'}).select();
        let menuListData = '';
        let headerData = await this.model('headerlink').where({'show': 'true'}).select();
        let headerListData = '';
        /*取subject，取name，取图片*/
        let subjectData = await this.model("email_subject").where({'show': '1'}).select();
        let nameData = await this.model("email_name").where({'show': '1'}).select();
        let imageData = await this.model("home_image").where({'show': '1','isFestival': '0'}).select();
        let subjectMap = [];
        for(let i=0,length=subjectData.length;i<length;i++){
            subjectMap[i] = subjectData[i].subject
        }
        let nameMap = [];
        for(let i=0,length=nameData.length;i<length;i++){
            nameMap[i] = nameData[i].name
        }
        let imageMap = [];
        for(let i=0,length=imageData.length;i<length;i++){
            imageMap[i] = imageData[i].imageUrl
        }

        let smtpTransport = nodemailer.createTransport("SMTP", {
            host: mailer.host,
            secureConnection: true,
            port: mailer.port,
            requiresAuth: true,
            domains: mailer.domains,
            auth: {
                user: mailer.account,
                pass: mailer.pass
            }
        });
        /*背景颜色变化*/
        let fontColor = '#fff !important';
        let blueFontColor = '#5579ee'
        let bgColor = '#373d41'

        // let email = [{
        //     email: 'saucxs@163.com',
        //     name: 'saucxs'
        // },{
        //     email: 'suningcxs@163.com',
        //     name: 'suningcxs'
        // }]

        let imageUrl = '';
        /*节假日*/
        let calendar = new Date();
        let month = calendar.getMonth();
        let date = calendar.getDate();
        let festival = '';
        let festivalImageUrl = ''
        if ((month == 0) && (date == 1)) { festival = "元旦快乐"; festivalImageUrl = "https://www.mwcxs.top/static/theme/liblog/res/common/images/festival/2019.jpg"};
        if ((month == 0) && (date > 1 || date <= 31)) { festival = "新年快乐"; festivalImageUrl = "https://www.mwcxs.top/static/staticImage/sliders/bg5.jpeg"};
        if ((month == 1) && (date >= 1 || date < 4 )) festival = "快过年了，准备回家了，年货准备好了吗？";
        if ((month == 1) && (date == 4 )) festival = "除夕快乐，愿你在新的一年里，健健康康，工作顺利，家里老人身体健康，没事回家看看，小伙年轻帅气，姑娘美丽靓人，孩子开心成长，";
        if ((month == 1) && (date >= 5 || date <= 14)) festival = "春节快乐，祝你在家多陪陪父母，过完年，该上学上学，该上班上班";
        if ((month == 1) && (date == 19 )) festival = "元宵节快乐";
        if ((month == 2) && (date == 8 )) festival = "三八妇女节快乐";
        if ((month == 4) && (date == 1 )) festival = "五一劳动节快乐";
        if ((month == 5) && (date == 1 )) festival = "六一儿童节快乐";
        if ((month == 5) && (date == 7 )) festival = "端午节安康";
        if ((month == 6) && (date == 1 )) festival = "党的生日，我为你骄傲";
        if ((month == 7) && (date == 1 )) festival = "建军节快乐";
        if ((month == 8) && (date == 13 )) festival = "中秋节快乐";
        if ((month == 9) && (date == 1 )) festival = "国庆节快乐";
        if ((month == 11) && (date == 24 )) festival = "平安夜快乐";
        if ((month == 11) && (date == 25 )) festival = "圣诞节快乐";
        if ((month == 11) && (date >= 30 || date <= 31 )) { festival = "2018再见，2019你好！元旦快来了"; festivalImageUrl = "https://www.mwcxs.top/static/theme/liblog/res/common/images/common/yuandan.jpg"};

        for(let i=0,length=menuData.length;i<length;i++){
            menuListData += '<a target="_blank" style="margin:0px 14px;color: '+ fontColor +';text-decoration: none;font-size: 14px;font-weight: 700" href="'+ systemData.homeurl + menuData[i].url.substr(1) +'">'+ menuData[i].menuname +'</a>'
        }
        for(let i=0,length=articleData.length;i<length;i++){
            articleListData += '<p style="margin:5px 0px;font-size: 14px;"><span>文章'+ parseInt(i + 1)  +'：</span>' +
                '<a target="_blank" style="text-decoration: none;color: #5579ee;width: 80%;"  href="'+ systemData.homeurl+ 'page/' + articleData[i].id +'.html">'+ articleData[i].title +'</a></p><br><br>'
        }
        for(let i=0,length=headerData.length;i<length;i++){
            headerListData += '<a target="_blank" style="text-decoration: none;color: '+ fontColor +';margin: 0px 10px" href="'+ headerData[i].url +'">'+ headerData[i].title +'</a>'
        }

        /*随机称呼 生成0-4*/
        let randomSubjectNum = Math.round(Math.random()*(subjectMap.length-1));
        console.log(subjectMap[randomSubjectNum], '主题================================================')
        // let subjectMap = ['工作再累也要照顾好自己', '再忙也要喝水', '新松恨不高千尺,恶竹应须斩万竿', '生命有爱，懂得珍惜', '让自己放松，让自己坦然', '真正的贫穷是精神上的堕落', '眼里长着太阳，笑里全是阳光'];
        // let nameMap = ['陛下', '主公', '亲', '大虾', '大佬', '军师', '小主'];
        let randomNameNum = Math.round(Math.random()*(nameMap.length-1));
        console.log(nameMap[randomNameNum], '名字================================================')
        let randomImageNum = Math.round(Math.random()*(imageMap.length-1));
        console.log(imageMap[randomImageNum], '图片================================================')

        imageUrl = imageMap[randomImageNum]

        /*收件人列表*/
        let emailListData = '';
        if(festival.length>0){
            emailData = emailData.concat(teacherData);
            fontColor = systemData.festivalFontColor;
            bgColor = systemData.festivalBgColor;
            imageUrl = festivalImageUrl
        }
        console.log(emailData, '0000000000000000000000000000000000000000000000000000000000000')
        for(let i=0,length=emailData.length;i<length;i++){
            emailListData += emailData[i].email + ','
        }
        emailListData = emailListData.substr(0, emailListData.length - 1)

        /*邮件内容配置项*/
        let specialOption = {
            from: mailer.from,
            to: emailListData,
            subject: subjectMap[randomSubjectNum] + '-sau交流学习社区-power by saucxs',
            html: '<div style="width:800px;margin:0 auto;border:1px solid #eee;box-shadow: 0 0 16px 0 rgba(85, 121, 238, 0.39);background: #eee;">\n' +
            '\t\t\t<div style="background-color: '+ bgColor +' ;border-bottom: 1px solid rgba(150,150,150,.26);">\n' +
            '\t\t\t\t<div style="display: flex;align-items: center;justify-content: space-between;padding: 0px 10px;">\n' +
            '\t\t\t\t\t<a target="_blank" href="https://www.mwcxs.top" style="display: flex;align-items: center;color: '+ fontColor +';text-decoration: none;"> \n' +
            '\t\t\t\t\t\t<img src="https://www.mwcxs.top/static/theme/liblog/res/common/images/common/logo_64_64_white.png">\n' +
            '\t\t\t\t\t\t<p style="font-size: 26px;font-weight: bold;margin-left: 12px;">sau交流学习社区</p>\n' +
            '\t\t\t\t\t</a>\n' +
            '\t\t\t\t</div>\n' +
            '\t\t\t\t<div style="display: flex;justify-content: flex-end;margin-bottom: 14px;">\n' +
            '\t\t\t\t\t'+ menuListData +'\n' +
            '\t\t\t\t</div>\n' +
            '\t\t\t</div>\n' +
            '\t\t\t<div style="padding: 10px">\n' +
            '\t\t\t\t<p>尊敬的<span style="color: #5579ee">'+ nameMap[randomNameNum] + '</span>:</p>\n' +
            '\t\t\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
            '\t\t\t\t\t<p style="font-size: 18px;color: #5579ee;">'+ festival +'，<a target="_blank" href="http://www.chengxinsong.cn">松宝写代码（songEagle）-程新松</a>在这里祝你节日快乐</p>\n' +
            '\t\t\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: #5579ee;" href="https://www.mwcxs.top">sau交流学习社区</a>\n' +
            '\t\t\t\t\t<img style="width: 100%;margin: 16px auto;" src="'+ imageUrl +'">\n' +
            '\t\t\t\t\t<p style="font-weight: bold;">最新文章：</p>\n' +
            '\t\t\t\t\t'+ articleListData +'\n' +
            '\t\t\t\t</div>\n' +
            '\t\t\t\t<p style="font-size: 16px;font-weight: bold;margin-left: 12px;padding-bottom:16px;border-bottom: 1px dashed #ccc;">sau交流学习社区</p>\n' +

            '\t\t\t</div>\n' +

                '<div style="background: '+ bgColor +' ;border-radius: 4px;border: 1px solid '+ bgColor +';">' +
                '\t\t\t<div style="display: flex;align-items: center;justify-content: center;margin: 18px 0px;">\n' +
                '\t\t\t\t<img style="width: 100px; height: 100px;" src="https://www.mwcxs.top/static/theme/liblog/res/common/images/common/400_400.jpg" />\n' +
                '\t\t\t\t<div style="font-size: 14px;color: '+ fontColor +';margin-left: 16px;">\n' +
                '\t\t\t\t\t<p>智能随行</p>\n' +
                '\t\t\t\t\t<p>扫码关注</p>\n' +
                '\t\t\t\t\t<p>获取最新资讯,活动信息</p>\n' +
                '\t\t\t\t</div>\n' +
                '\t\t\t</div>\n' +
                '\t\t\t\t<p style="font-size: 14px;text-align: center;margin: 10px 0px;font-weight: bold;">'+ headerListData +
                '\t\t\t\t</p>\n' +
                '\t\t\t\t<p style="font-size: 12px;color: '+ fontColor +';margin-left: 30px;text-align: center;margin: 10px 0px 20px 0px;">版权所有 ©\n' + systemData.sitename + systemData.copyright +
                '\t\t\t\t</p>\n' +
                '</div>' +

            '\t\t</div>\n' +
            '\t\t'
        };

        smtpTransport.sendMail(specialOption, function (err, res) {
            if(err){
                console.log(err);
            }else{
                console.log(res.response,'定时任务发送邮件日志-----------------------------------------------');
            }
            //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
            smtpTransport.close();
        })

        // for(let i=0,length=email.length;i<length;i++){
        //     setInterval(function(){
        //
        //     },2*60*1000);
        // }

    }
}
