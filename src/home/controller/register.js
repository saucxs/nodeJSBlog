'use strict';
let http = require("http");
let fs = require("fs");
let nodemailer = require("nodemailer");
let mailer=think.config("mail");
import Base from './base.js';
export default class extends Base {

    // 注册页面
    async indexAction(){
        let uinfo=await this.session('uInfo');
        if(!think.isEmpty(uinfo)){
            //已注册并登录
            return this.redirect('/personal/@'+uinfo.name);
        }else {
            this.assign("title","会员注册");
            return this.displayView("register_index");
        }
    }
    /*验证邮箱--修改激活标志*/
    async updateactivateemailAction(){
        let uuidCode = this.post('code');
        let result = await this.model('home').findOne('user',{activate_uuidCode:uuidCode});
        if(think.isEmpty(result)){
            return this.json({status:0,errno:2,errmsg:"请确认邮件链接是否完整!"});
        }else{
            if(result.activateFlag === 0){
                let activatetime = think.datetime(new Date());
                let data = await this.model('home').updateRecord('user',{activate_uuidCode:uuidCode},{activateFlag: 1,activate_uuidCode: '',activatetime: activatetime});
                let uInfo={
                    email:result.email,
                    pic:result.pic,
                    name:result.name,
                    nickname:result.nickname,
                    openid:'',
                    way:'site'
                }
                await this.session("uInfo", uInfo);
                return this.json({status:0,errno:0,username: result.name,errmsg:"激活成功!"});
            }else{
                return this.json({status:0,errno:0,errmsg:"该用户已经在"+ result.activatetime +"激活成功!"});
            }
        }
    }

    /*验证邮箱-初始化*/
    async activateuserAction(){
        let uuidCode = this.get('uuidCode');
        let result = await this.model('home').findOne('user',{activate_uuidCode: uuidCode});
        if(think.isEmpty(result)){
            return this.redirect("/login.html");
        }else{
            this.assign("code", uuidCode);
            this.assign("title","注册用户激活");
            // let result = await this.model('home').updateRecord('user',{activate_uuidCode: uuidCode},{activateFlag: 1, activate_uuidCode: ''});
            return this.displayView("activate_user");
        }
    }


    //注册接口
    async doregisterAction(){
        let newData=this.post();
        newData.password=think.md5(newData.password);
        // 后台校验
        let name=newData.name;
        let password=newData.password;
        let email=newData.email;
        newData.createtime=think.datetime(this.post('createtime'));
        if(name!==''&&password!==''&&email!==''){
            //校验用户是否存在
            let userFlag=await this.checkIsExist({name:name});
            let emailFlag=await this.checkIsExist({email:email});
            if(userFlag===0){
                return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
            }else if(emailFlag===0){
                return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
            }else{
                let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
                let geetest = new Geetest();
                let res = await geetest.validate(this.post());
                if("success" != res.status){
                    return this.json({status:0,errno:2,errmsg:"验证码错误!"});
                }else{
                    newData.activate_uuidCode = think.uuid(128);
                    newData.activateFlag = '0';
                    let rs=await this.model('home').addUser(newData);
                    let systemData = await this.model("system").find();
                    let menuData = await this.model("menu").order("orders asc").where({'appear': '1'}).select();
                    let menuListData = '';
                    let headerData = await this.model('headerlink').where({'show': 'true'}).select();
                    let headerListData = '';
                    let headerNotice = await this.model('header_notice').find();
                    /*背景颜色默认值*/
                    let fontColor = '#fff !important';
                    let blueFontColor = '#5579ee';
                    let bgColor = '#373d41';
                    fontColor = systemData.festivalFontColor;
                    bgColor = systemData.festivalBgColor;
                    /*头部的menu*/
                    for(let i=0,length=menuData.length;i<length;i++){
                        menuListData += '<a target="_blank" style="margin:0px 14px;color: '+ fontColor +';text-decoration: none;font-size: 14px;font-weight: 700" href="'+ systemData.homeurl + menuData[i].url.substr(1) +'">'+ menuData[i].menuname +'</a>'
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
                        '</div>\n';
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
                        '\t<p style="font-size: 14px !important;color: '+ fontColor +';text-align: center;margin: 10px 0px 20px 30px;">\n' +
                        systemData.copyright + '©' + systemData.sitename +
                        '\t</p>\n' +
                        '</div>';

                    let html = '<div style="width:800px;margin:0 auto;border:1px solid #eee;box-shadow: 0 0 16px 0 rgba(85, 121, 238, 0.39);background: #eee;">\n' +
                        commonHeader +
                        '\t<div style="padding: 10px">\n' +
                        '\t\t<p>亲爱的<span style="color: #5579ee">'+ name + '</span>:</p>\n' +
                        '\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
                        '\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: ' + bgColor + ';" href="'+ systemData.homeurl +'">'+ systemData.siteNickName +'</a>，\n' +
                        '\t\t\t<span style="font-weight: 700;"><a target="_blank" style="text-decoration: none;color: '+ bgColor +'" href="http://www.chengxinsong.cn">松宝写代码(saucxs|songEagle)-程新松</a>，在这里祝你天天开心。</span>\n' +

                        '\t\t\t<p style="font-size: 18px;">'+ name +'-用户激活邮件，请点击下面链接进行激活用户</p>\n' +
                        '\t\t\t<a style="color: '+ bgColor +'; font-size: 24px;" href="https://www.mwcxs.top/activateuser/code=' + newData.activate_uuidCode + '">https://www.mwcxs.top/activateuser/code='+ newData.activate_uuidCode +'</a>' +

                        '\t\t\t<p style="font-weight: bold;font-size: 18px;">新功能：</p>' +
                        '\t\t\t<p><a href="'+ systemData.homeurl +'" style="font-size: 14px;text-decoration: none;color: '+ bgColor +';">'+ headerNotice.content +'</a></p>\n' +

                        '\t\t</div>\n' +
                        '\t\t<p style="font-size: 16px;font-weight: bold;margin-left: 12px;padding-bottom:16px;border-bottom: 1px dashed #ccc;">'+ systemData.siteNickName +'</p>\n' +
                        '\t</div>\n' +
                        commonFooter +
                        '</div>\n';

                    /*发送邮件*/
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
                    /*邮件内容配置项*/
                    let specialOption = {
                        from: mailer.from,
                        to: email,
                        subject: name+'用户激活邮件-'+systemData.siteNickName,
                        html: html
                    };
                    smtpTransport.sendMail(specialOption, function (err, res) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(res,'注册激活邮件发送邮件日志-----------------------------------------------');
                        }
                        //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
                        smtpTransport.close();
                    })
                    if(rs) return this.json({status:1,errno:0,errmsg:"用户激活链接已经发到您邮箱"+ email +"!点击链接后进行激活！"});
                }
            }
        }else{
            return this.fail('请填写必要信息！');
        }
    }
    // 获取网络头像并保存
    // async getpicAction(){
    //     let url="http://www.jsout.com/static/common/images/common/logo.jpg";
    //     http.get(url, function(res){
    //           var imgData = "";
    //           res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
    //           res.on("data", function(chunk){
    //               imgData+=chunk;
    //           });
    //           console.log(url);
    //           res.on("end", function(){
    //               let mypath=think.RESOURCE_PATH+"/static/common/images/pic/logonew.png"
    //               fs.writeFile(mypath, imgData, "binary", function(err){
    //                   if(err){
    //                       console.log(err);
    //                   }else {
    //                     return mypath;
    //                   }
    //                   // console.log("down success");
    //               });
    //           });
    //       });
    // }
    async adduserAction(){
        let newData=this.post();
        // 后台校验
        let name=newData.name;
        let email=newData.email;
        let nickname=newData.nickname;
        let openid=newData.openid;
        newData.createtime=think.datetime(this.post('createtime'));
        if(name!==''&&nickname!==''&&email!==''&&openid!==''){
            //校验用户是否存在
            let s=await this.checkIsExist({name:name})
            if(s===0){
                return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
            }else{
                let systemData = await this.model("system").find();
                let menuData = await this.model("menu").order("orders asc").where({'appear': '1'}).select();
                let menuListData = '';
                let headerData = await this.model('headerlink').where({'show': 'true'}).select();
                let headerListData = '';
                let headerNotice = await this.model('header_notice').find();
                /*背景颜色默认值*/
                let fontColor = '#fff !important';
                let blueFontColor = '#5579ee';
                let bgColor = '#373d41';
                fontColor = systemData.festivalFontColor;
                bgColor = systemData.festivalBgColor;
                /*头部的menu*/
                for(let i=0,length=menuData.length;i<length;i++){
                    menuListData += '<a target="_blank" style="margin:0px 14px;color: '+ fontColor +';text-decoration: none;font-size: 14px;font-weight: 700" href="'+ systemData.homeurl + menuData[i].url.substr(1) +'">'+ menuData[i].menuname +'</a>'
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
                    '</div>\n';
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
                    '\t<p style="font-size: 14px !important;color: '+ fontColor +';text-align: center;margin: 10px 0px 20px 30px;">\n' +
                    systemData.copyright + '©' + systemData.sitename +
                    '\t</p>\n' +
                    '</div>';

                let html = '<div style="width:800px;margin:0 auto;border:1px solid #eee;box-shadow: 0 0 16px 0 rgba(85, 121, 238, 0.39);background: #eee;">\n' +
                    commonHeader +
                    '\t<div style="padding: 10px">\n' +
                    '\t\t<p>亲爱的<span style="color: #5579ee">'+ name + '</span>:</p>\n' +
                    '\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
                    '\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: ' + bgColor + ';" href="'+ systemData.homeurl +'">'+ systemData.siteNickName +'</a>，\n' +
                    '\t\t\t<span style="font-weight: 700;"><a target="_blank" style="text-decoration: none;color: '+ bgColor +'" href="http://www.chengxinsong.cn">松宝写代码(saucxs|songEagle)-程新松</a>，在这里祝你天天开心。</span>\n' +

                    '\t\t\t<p style="font-size: 18px;">'+ name +'-成功完善个人信息</p>\n' +

                    '\t\t\t<p style="font-weight: bold;font-size: 18px;">新功能：</p>' +
                    '\t\t\t<p><a target="_blank" href="'+ systemData.homeurl +'" style="font-size: 14px;text-decoration: none;color: '+ bgColor +';">'+ headerNotice.content +'</a></p>\n' +

                    '\t\t</div>\n' +
                    '\t\t<p style="font-size: 16px;font-weight: bold;margin-left: 12px;padding-bottom:16px;border-bottom: 1px dashed #ccc;">'+ systemData.siteNickName +'</p>\n' +
                    '\t</div>\n' +
                    commonFooter +
                    '</div>\n';
                /*发送邮件*/
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
                /*邮件内容配置项*/
                let specialOption = {
                    from: mailer.from,
                    to: email,
                    subject: name+'成功完善个人信息-'+systemData.siteNickName,
                    html: html
                };
                smtpTransport.sendMail(specialOption, function (err, res) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(res,'完善个人信息发送邮件日志-----------------------------------------------');
                    }
                })
                let rs=await this.model('home').addUser(newData);
                //设置session
                let uinfo=await this.session('uInfo');
                uinfo.name=name;
                if(rs){return this.success();}
            }
        }else{
            return this.fail('请填写必要信息！');
        }
    }

    //检查是否存在
    async checkIsExist(where){
        let rs= await this.model('home').findUser(where);
        let s=(rs.length>0)?0:1;
        return s;
    }

    //校验注册用户名是否存在
    async isexistAction(){
        let name=await this.post('name');
        let s=await this.checkIsExist({name:name});
        if(s==1){
            return this.json({status:1,errno:0,errmsg:'用户名可用！'});
        }else{
            return this.json({status:0,errno:1,errmsg:'该用户名已存在！'});
        }
    }

    //校验邮箱是否存在
    async checkemailAction(){
        let email=await this.post('email');
        let s=await this.checkIsExist({'email':email});
        if(s==1){
            return this.json({status:1,errno:0,errmsg:'该邮箱可用！'});
        }else{
            return this.json({status:0,errno:1,errmsg:'该邮箱已存在！'});
        }
    }

    //极验验证码
    async geetestAction(){
        // pc 端接口
        let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
        let geetest = new Geetest();
        if(this.isPost()){
            let post =this.post();
            let res = await geetest.validate(post);
            return this.json(res);
        }else {
            let res = await geetest.register(this.get('type'));
            return this.json(res);
        }
    }
}
