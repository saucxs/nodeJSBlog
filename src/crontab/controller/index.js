'use strict';

import Base from './base.js';
import request from "request";

let nodemailer = require("nodemailer");
let mailer=think.config("mail");

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    /*定时任务接口-发送邮件*/
    async sendmaildayAction(){
        let teacherData = await this.model("other_user").field('email,name').select();
        let emailData = await this.model("user").field('email,name').where({'isverify': '1'}).select();
        let systemData = await this.model("system").find();
        let articleData = await this.model("article").field('id,title').limit(10).where({'ispublished': '1'}).order("id desc").select();
        let articleListData = '';
        let menuData = await this.model("menu").order("orders asc").where({'appear': '1'}).select();
        let menuListData = '';
        let headerData = await this.model('headerlink').where({'show': 'true'}).select();
        let headerListData = '';
        let headerNotice = await this.model('header_notice').find();
        /*取subject，取name，取图片*/
        // let subjectData = await this.model("email_subject").where({'show': '1'}).select();
        // let nameData = await this.model("email_name").where({'show': '1'}).select();
        let imageData = await this.model("home_image").where({'isFestival': '0'}).select();
        let imageFestivalData = await this.model("home_image").where({'isFestival': '1'}).select();
        // let subjectMap = [];
        // for(let i=0,length=subjectData.length;i<length;i++){
        //     subjectMap[i] = subjectData[i].subject
        // }
        // let nameMap = [];
        // for(let i=0,length=nameData.length;i<length;i++){
        //     nameMap[i] = nameData[i].name
        // }

        /*日常邮件背景图的map映射*/
        let imageMap = [];
        let imageUrl = '';
        for(let i=0,length=imageData.length;i<length;i++){
            imageMap[i] = imageData[i].imageUrl
        }
        let randomImageNum = Math.round(Math.random()*(imageMap.length-1));
        /*测试账号*/
        let emailTest = [{
            email: 'saucxs@163.com',
            name: 'saucxs'
        },{
            email: '184866445@qq.com',
            name: 'songEagle'
        }];

        /*节假日*/
        let calendar = new Date();
        let month = calendar.getMonth();
        let date = calendar.getDate();
        let festival = '';
        let festivalImageUrl = ''
        if ((month == 0) && (date == 1))  festival = "元旦快乐";
        if ((month == 0) && (date > 1 && date <= 31))  festival = "快过年了，准备回家了，年货准备好了吗？";
        if ((month == 1) && (date >= 1 && date < 4 )) festival = "新年是一个团聚的日子，每逢佳节倍思亲，放假的日子多陪陪父母亲人";
        if ((month == 1) && (date == 4 )) festival = "除夕快乐，愿您在新的一年里，健健康康，工作顺利，家里老人身体健康，没事回家看看，小伙年轻帅气，姑娘美丽靓人，孩子开心成长。";
        if ((month == 1) && (date >= 5 && date <= 14)) festival = "春节快乐，祝你在家多陪陪父母，过完年，该上学上学，该上班上班。";
        if ((month == 1) && (date == 19 )) festival = "元宵节快乐。";
        if ((month == 2) && (date == 8 )) festival = "三八妇女节快乐。";
        if ((month == 4) && (date == 1 )) festival = "五一劳动节快乐。";
        if ((month == 4) && (date >= 25 && date <= 31)) festival = "六一儿童节快来了，拥有一个童心，你就永远年轻，节日快乐。";
        if ((month == 5) && (date == 1 )) festival = "六一儿童节快乐，童心是一种心态，即使岁月蹉跎，时光荏苒，珍惜它，爱惜它，你将年轻永驻。";
        if ((month == 5) && (date >=3 && date <= 7 )) festival = "端午节安康，端午节吃粽子，赛龙舟，挂菖蒲、蒿草、艾叶，薰苍术、白芷，喝雄黄酒、吃大蒜、儿童戴荷包、五毒兜兜等的习俗，也是人们品味生活，热爱生命，发展文明，抑恶扬善的不懈追求。。";
        if ((month == 6) && (date == 1 )) festival = "党的生日，我为你骄傲。";
        if ((month == 7) && (date == 1 )) festival = "建军节快乐。";
        if ((month == 8) && (date == 13 )) festival = "中秋节快乐。";
        if ((month == 9) && (date == 1 )) festival = "国庆节快乐。";
        if ((month == 11) && (date == 24 )) festival = "平安夜快乐。";
        if ((month == 11) && (date == 25 )) festival = "圣诞节快乐。";
        if ((month == 11) && (date >= 30 || date <= 31 )) festival = "2018再见，2019你好！元旦快来了。";

        /*背景颜色默认值*/
        let fontColor = '#fff !important';
        let blueFontColor = '#5579ee';
        let bgColor = '#373d41';

        /*收件人列表*/
        // let emailListData = '';
        /*正式用户*/
        emailData = emailData.concat(teacherData);
        /*测试用户*/
        // emailData = emailTest;
        fontColor = systemData.festivalFontColor;
        bgColor = systemData.festivalBgColor;
        if(festival.length>0){
            imageUrl = imageFestivalData[0].imageUrl
        }else{
            // console.log(imageMap[randomImageNum], '图片================================================')
            imageUrl = imageMap[randomImageNum]
        }
        /*头部的menu*/
        for(let i=0,length=menuData.length;i<length;i++){
            menuListData += '<a target="_blank" style="margin:0px 14px;color: '+ fontColor +';text-decoration: none;font-size: 14px;font-weight: 700" href="'+ systemData.homeurl + menuData[i].url.substr(1) +'">'+ menuData[i].menuname +'</a>'
        }
        /*内容的文章列表*/
        for(let i=0,length=articleData.length;i<length;i++){
            articleListData += '<p style="margin:5px 0px;font-size: 14px;"><span>文章'+ parseInt(i + 1)  +'：</span>' +
                '<a target="_blank" style="text-decoration: none;color: #5579ee;width: 80%;"  href="'+ systemData.homeurl+ 'page/' + articleData[i].id +'.html">'+ articleData[i].title +'</a></p><br><br>'
        }
        /*底部的连接*/
        for(let i=0,length=headerData.length;i<length;i++){
            headerListData += '<a target="_blank" style="text-decoration: none;color: '+ fontColor +';margin: 0px 10px" href="'+ headerData[i].url +'">'+ headerData[i].title +'</a>'
        }
        /*公共头部*/
        let commonHeader =  '<div style="background: '+ bgColor +' ;border-bottom: 1px solid rgba(150,150,150,.26);">\n' +
            '\t<div style="display: flex;align-items: center;justify-content: space-between;padding: 0px 10px;">\n' +
            '\t\t<a target="_blank" href="'+ systemData.homeurl +'" style="display: flex;align-items: center;color: '+ fontColor +';text-decoration: none;"> \n' +
            '\t\t\t<img src="https://www.mwcxs.top/static/theme/liblog/res/common/images/common/logo_64_64_white.png">\n' +
            '\t\t\t<p style="font-size: 26px;font-weight: bold;margin-left: 12px;">'+ systemData.siteNickName +'</p>\n' +
            '\t\t</a>\n' +
            '\t</div>\n' +
            '\t<div style="display: flex;justify-content: flex-end;margin-bottom: 14px;">\n' +
            '\t\t'+ menuListData +'\n' +
            '\t</div>\n' +
            '</div>\n'
        /*公共尾部*/
        let commonFooter =  '<div style="background: '+ bgColor +' ;border-radius: 4px;border: 1px solid '+ bgColor +';">' +
            '\t<div style="display: flex;align-items: center;justify-content: center;margin: 18px 0px;">\n' +
            '\t\t<img style="width: 100px; height: 100px;" src="https://www.mwcxs.top/static/theme/liblog/res/common/images/common/400_400.jpg" />\n' +
            '\t\t<div style="font-size: 14px;color: '+ fontColor +';margin-left: 16px;">\n' +
            '\t\t\t<p>智能随行</p>\n' +
            '\t\t\t<p>扫码关注</p>\n' +
            '\t\t\t<p>获取最新资讯,活动信息</p>\n' +
            '\t\t</div>\n' +
            '\t</div>\n' +
            '\t<p style="font-size: 18px;text-align: center;margin: 10px 0px;font-weight: bold;">'+
            headerListData +
            '\t</p>\n' +
            '\t<p style="font-size: 14px !important;color: '+ fontColor +';margin-left: 30px;text-align: center;margin: 10px 0px 20px 0px;">\n' +
            systemData.copyright + '©' + systemData.sitename +
            '\t</p>\n' +
            '</div>'

        /*随机称呼 生成0-4*/
        // let randomSubjectNum = Math.round(Math.random()*(subjectMap.length-1));
        // console.log(subjectMap[randomSubjectNum], '主题================================================')
        // let subjectMap = ['工作再累也要照顾好自己', '再忙也要喝水', '新松恨不高千尺,恶竹应须斩万竿', '生命有爱，懂得珍惜', '让自己放松，让自己坦然', '真正的贫穷是精神上的堕落', '眼里长着太阳，笑里全是阳光'];
        // let nameMap = ['陛下', '主公', '亲', '大虾', '大佬', '军师', '小主'];
        // let randomNameNum = Math.round(Math.random()*(nameMap.length-1));
        // console.log(nameMap[randomNameNum], '名字================================================')


        // for(let i=0,length=emailData.length;i<length;i++){
        //     emailListData += emailData[i].email + ','
        // }
        // emailListData = emailListData.substr(0, emailListData.length - 1)
        // console.log(emailListData, '0000000000000000000000000000000000000000000000000')

        /*创建email的连接*/
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

        emailData.forEach(function(user) {
            (function(user) {
                /*html内容*/
                let html = '<div style="width:800px;margin:0 auto;border:1px solid #eee;box-shadow: 0 0 16px 0 rgba(85, 121, 238, 0.39);background: #eee;">\n' +
                    commonHeader +
                    '\t\t\t<div style="padding: 10px;font-size: 16px;">\n' +
                    '\t\t\t\t<p>亲爱的<span style="color: '+ bgColor +'">'+ user.name + '</span>:</p>\n' +

                    '\t\t\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
                    '\t\t\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: ' + bgColor + ';" href="'+ systemData.homeurl +'">'+ systemData.siteNickName +'</a>，\n' +
                    '\t\t\t\t\t<span style="font-weight: 700;">'+ festival +'<a target="_blank" style="text-decoration: none;color: '+ bgColor +'" href="http://www.chengxinsong.cn">松宝写代码(saucxs|songEagle)-程新松</a>，在这里祝你天天开心。</span>\n' +

                    '\t\t\t\t\t<p style="font-weight: bold;font-size: 18px;">一、新功能：</p>' +
                    '\t\t\t\t\t<p><a href="'+ systemData.homeurl +'" style="font-size: 14px;text-decoration: none;color: '+ bgColor +';">'+ headerNotice.content +'</a></p>\n' +

                    '\t\t\t\t\t<a target="_blank" href="http://www.chengxinsong.cn"><img style="width: 100%;margin: 16px auto;" src="'+ imageUrl +'"></a>\n' +
                    '\t\t\t\t\t<p style="font-weight: bold;font-size: 18px;">二、最新文章：</p>\n' +
                    '\t\t\t\t\t'+ articleListData +'\n' +
                    '\t\t\t\t</div>\n' +

                    '\t\t\t\t<p style="font-size: 18px;font-weight: bold;margin-left: 12px;padding-bottom:16px;border-bottom: 1px dashed #ccc;">'+ systemData.siteNickName +'</p>\n' +

                    '\t\t\t</div>\n' +
                    commonFooter +
                    '\t\t</div>\n' +
                    '\t\t'
                /*邮件内容配置项*/
                let specialOption = {
                    from: mailer.from,
                    to: user.email,
                    subject: '最新文章-'+systemData.siteNickName,
                    // subject: subjectMap[randomSubjectNum] + '-sau交流学习社区-power by saucxs',
                    html: html
                };
                smtpTransport.sendMail(specialOption, function (err, res) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(res,'定时任务发送邮件日志-----------------------------------------------');
                    }
                    //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
                    smtpTransport.close();
                })
            })(user)
        });

        // let specialOption = {
        //     from: mailer.from,
        //     to: '184866445@qq.com',
        //     subject: '每日邮件统计-sau交流学习社区-power by saucxs',
        //     html: '<p>成功'+ successCount + '个。</p><br>' + '<p>失败的邮箱：'+ failEmail +'</p>'
        // };
        // smtpTransport.sendMail(specialOption, function (err, res) {
        //     if(err){
        //         console.log(err);
        //     }else{
        //         console.log(res.response,'定时任务发送邮件日志-----------------------------------------------');
        //     }
        //     //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
        //     smtpTransport.close();
        // })
        // for(let i=0,length=emailTest.length;i<length;i++){
        //     (function () {
        //         /*邮件内容配置项*/
        //         let specialOption = {
        //             from: mailer.from,
        //             to: emailTest[i].email,
        //             subject: subjectMap[randomSubjectNum] + '-sau交流学习社区-power by saucxs',
        //             html: html
        //         };
        //         smtpTransport.sendMail(specialOption, function (err, res) {
        //             if(err){
        //                 console.log(err);
        //             }else{
        //                 console.log(res,'============================================================================');
        //                 console.log(res.response,'定时任务发送邮件日志-----------------------------------------------');
        //             }
        //             //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
        //             smtpTransport.close();
        //         })
        //     })
        // }


        // for(let i=0,length=email.length;i<length;i++){
        //     setInterval(function(){
        //
        //     },2*60*1000);
        // }

    }

    /*定时任务提交链接*/
    async baiducrontabAction() {
        /*获取系统配置*/
        let sysdata=await this.model('system').find();
        /*熊掌号每天5篇文章，4篇topic*/
        let article_day = await this.model("article").where({'ispublished': '1'}).order("createtime DESC").limit(5).select();
        let topic_day = await this.model("topic").where({'show': '1'}).order("createtime DESC").limit(4).select();
        let xiongzhang = [];
        let xiongzhangData = {
            sysdata: sysdata,
            article_day: article_day,
            topic_day: topic_day
        }
        xiongzhang.push(xiongzhangData.sysdata.homeurl);
        for(let i=0,length=xiongzhangData.article_day.length;i<length;i++){
            xiongzhang.push(xiongzhangData.sysdata.homeurl + 'page/'+ xiongzhangData.article_day[i].id +'.html')
        }
        for(let i=0,length=xiongzhangData.topic_day.length;i<length;i++){
            xiongzhang.push(xiongzhangData.sysdata.homeurl + 'topic/item/'+ xiongzhangData.topic_day[i].id +'.html')
        }
        let xzBody = xiongzhang.join('\n');
        console.log(xzBody, '----------------------------------------------------')
        request.post({
            url: 'http://data.zz.baidu.com/urls?appid=1618168323287168&token=RJP3Edxoplt9Der5&type=realtime',
            body: xzBody
        }, function (err, res, body) {
            console.log(body,'baiduxiongzhang666666666666666666666666666666666666666666666666666666666666666daily')
            if(!err){
                return this.json({err:err,body:body});
            }else{
                return this.json(err);
            }
        });
    }
}
