'use strict';

import Base from './base.js';
import request from "request";
let nodemailer = require("nodemailer");
let mailer=think.config("mail");
export default class extends Base {

    //用户登录
    async indexAction(){
        let uinfo=await this.session('uInfo');
        if(!think.isEmpty(uinfo)){
            return this.redirect('/personal/@'+uinfo.name);
        }else {
            this.assign("title","用户登录");
            return this.displayView("login_index");
        }
    }
    async dologinAction(){
        let data=this.post();
        let code=data.code;
        let sysCode=await this.session('code');
        // code=code.toLowerCase();
        // sysCode=sysCode.toLowerCase();
        let md5Pas = await think.md5(data.password);
        let email = await data.email;
        let result=await this.model('home').findOne('user',{email:email});
        if(email===result.email&&md5Pas===result.password){
            let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
            let geetest = new Geetest();
            let res = await geetest.validate(this.post());
            if("success" != res.status){
                return this.json({status:0,errno:2,errmsg:"验证码错误!"});
            }else{
                let uInfo={
                    email:email,
                    pic:result.pic,
                    name:result.name,
                    nickname:result.nickname,
                    openid:'',
                    way:'site'
                }
                if(result.activateFlag === 0 ){
                    return this.json({status:0,errno:2,errmsg:"请先去注册邮箱里点击链接激活用户"});
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
                        '\t\t<p>亲爱的<span style="color: #5579ee">'+ uInfo.name + '</span>:</p>\n' +
                        '\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
                        '\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: ' + bgColor + ';" href="'+ systemData.homeurl +'">'+ systemData.siteNickName +'</a>，\n' +
                        '\t\t\t<span style="font-weight: 700;"><a target="_blank" style="text-decoration: none;color: '+ bgColor +'" href="http://www.chengxinsong.cn">松宝写代码(saucxs|songEagle)-程新松</a>，在这里祝你天天开心。</span>\n' +

                        '\t\t\t<p style="font-size: 18px;">'+ uInfo.name +'-登陆成功</p>\n' +

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
                        subject: result.name+'登陆成功-'+systemData.siteNickName,
                        html: html,
                    };
                    smtpTransport.sendMail(specialOption, function (err, res) {
                        if(err){
                            console.log(err);
                        }else{
                            console.log(res,'登陆成功邮件发送邮件日志-----------------------------------------------');
                        }
                    })
                    await this.session("uInfo", uInfo);
                    return this.json({status:1,errno:0,uname:result.name,errmsg:"登录成功!"});
                }
            }
        }else{
            return this.json({status:0,errno:1,errmsg:"用户名或密码错误!"});
        }
    }

    async githubAction(){
        let self=this;
        let GITHUB_CLIENT_ID="d55f9480603a48f24c09",
            GITHUB_CLIENT_SECRET="8d418e3721f9bccb7a9f0f009ba30ec8f9dba252";
        let code=await this.get('code');
        let formData = {
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code: code
        };
        request.post({
            url: 'https://github.com/login/oauth/access_token',
            form: formData,
            headers: {Accept: 'application/json'}
        }, function (err, res1, body) {
            var access_token = JSON.parse(body).access_token;
            var headers2 = {
                'User-Agent': 'Awesome-Octocat-App'
            };
            request.get({
                url: 'https://api.github.com/user',
                qs: {access_token: access_token},
                headers: headers2
            }, function (err, res2, body) {
                let info = JSON.parse(body);
                let uInfo={
                    email:info.email,
                    pic:'',
                    name: info.name,
                    nickname:info.login,
                    openid:info.id,
                    way:'github'
                }
                self.session("uInfo",uInfo);
                self.redirect("/login/complete");
            });
        });
    }

    async qqloginAction(){
        let self=this;
        let QQ_CLIENT_ID = "184866445";
        let QQ_CLIENT_SECRET = "ace474e949764ac84a9faeb8f99ae4c6";
        let REDIRECT_URI = "https://www.mwcxs.top/login/qqlogin";
        let QQ_grant_type = "authorization_code";
        //注意:回填地址, 因为QQ不允许像github一样填http://127.0.0.1:3000的开发者模式,
        // https://graph.qq.com/oauth2.0/authorize?redirect_uri=' + REDIRECT_URI + '&response_type=code&client_id=' + QQ_CLIENT_ID

        let code=await this.get('code');
        let qs = {
            grant_type: 'authorization_code',
            client_id: QQ_CLIENT_ID,
            client_secret: QQ_CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URI
        };
        request.get({
            url: 'https://graph.qq.com/oauth2.0/token',
            qs: qs
        }, function (err, res1, body) {
            let access_token = body.match(/access_token=(\w+)&?/)[1];
            request.get({
                url: 'https://graph.qq.com/oauth2.0/me',
                qs: {access_token: access_token}
            }, function (err, res2, body) {
                let openid = body.match(/"openid":"(\w+)"/)[1];
                let qs = {
                    oauth_consumer_key: QQ_CLIENT_ID,
                    access_token: access_token,
                    openid: openid,
                    format: 'json'
                };
                // 获取用户信息
                request.get({
                    url: 'https://graph.qq.com/user/get_user_info',
                    qs: qs
                }, function (err, res2, body) {
                    let info = JSON.parse(body);
                    let uInfo={
                        email:'',
                        pic:'',
                        name:'',
                        nickname:info.nickname,
                        openid:openid,
                        way:'qq'
                    }
                    self.session("uInfo",uInfo);
                    self.redirect("/login/complete");
                });
            });
        });
    }

    async completeAction(){
        this.assign('title','完善资料')
        let uinfo=await this.session("uInfo");
        if(think.isEmpty(uinfo)){
            return this.redirect("/login.html");
        }else{
            //查询是否已经注册过
            let DB_userinfo=await this.model('home').findOne('user',{openid:uinfo.openid});
            //未注册
            if(think.isEmpty(DB_userinfo)){
                this.assign("uinfo",uinfo);
                return this.displayView("login_complete");
            }else{
                //已注册
                uinfo.name=DB_userinfo.name;
                return this.redirect("/personal/@"+DB_userinfo.name);
            }
        }
    }

    async forgetpasswordAction(){
        this.assign("title","忘记密码");
        return this.displayView("forget_password");
    }

    async sendmailAction() {
        let data=this.post();
        let email = await data.email;
        let result = await this.model('home').findOne('user',{email:email});
        if(email===result.email){
            let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
            let geetest = new Geetest();
            let res = await geetest.validate(this.post());
            if("success" != res.status){
                return this.json({status:0,errno:2,errmsg:"验证码错误!"});
            }else{
                let newUuid = think.uuid(128);
                let updateResult = await this.model('home').updateRecord('user',{email:email},{forgetFlag: true, forget_uuidCode:newUuid});

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
                    '\t\t<p>亲爱的<span style="color: #5579ee">'+ result.name + '</span>:</p>\n' +
                    '\t\t<div style="text-indent:2em;margin-bottom: 30px;">\n' +
                    '\t\t\t欢迎来到<a target="_blank" style="text-decoration: none;color: ' + bgColor + ';" href="'+ systemData.homeurl +'">'+ systemData.siteNickName +'</a>，\n' +
                    '\t\t\t<span style="font-weight: 700;"><a target="_blank" style="text-decoration: none;color: '+ bgColor +'" href="http://www.chengxinsong.cn">松宝写代码(saucxs|songEagle)-程新松</a>，在这里祝你天天开心。</span>\n' +

                    '\t\t\t<p style="font-size: 18px;">'+ result.name +'-密码重置邮件，请点击链接进行重置密码，</p>\n' +
                    '\t\t\t<a style="color:'+ bgColor +'; font-size: 24px;" href="https://www.mwcxs.top/forgetcomplete/code=' + newUuid + '">https://www.mwcxs.top/forgetcomplete/code='+ newUuid +'</a>' +

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
                    subject: result.name+'密码重置邮件-'+systemData.siteNickName,
                    html: html
                };
                smtpTransport.sendMail(specialOption, function (err, res) {
                    if(err){
                        console.log(err);
                    }else{
                        console.log(res,'密码重置发送邮件日志-----------------------------------------------');
                    }
                    //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
                    smtpTransport.close();
                })
                return this.json({status:1,errno:0,uname:result.name,errmsg:"重置密码链接已经发到您邮箱!点击链接后修改密码！"});


                /*smtpTransport.sendMail({
                    from: mailer.from,
                    to: email,
                    subject: result.name+'密码重置邮件-sau交流学习社区',
                    html: '密码重置邮件，请点击链接进行重置密码，<a style="color: #5579EE" href="https://www.mwcxs.top/forgetcomplete/code=' + newUuid + '">https://www.mwcxs.top/forgetcomplete/code='+ newUuid +'</a>欢迎来到交流学习社区,请尽快登陆修改密码'
                },function (err, res) {
                    console.log(err,res);
                })*/

            }
        }else{
            return this.json({status:0,errno:1,errmsg:"邮箱不存在"});
        }
    }

    async forgetcompleteAction(){
        this.assign("title","重置密码");
        let uuidCode = this.get('uuidCode');
        let result=await this.model('home').findOne('user',{forget_uuidCode:uuidCode});
        if(think.isEmpty(result)){
            return this.redirect("/login.html");
        }else{
            this.assign("code",uuidCode);
            return this.displayView("forget_complete");
        }
    }

    async successpasswordAction(){
        let uuidCode = this.post('code');
        let password = this.post('password');
        password = think.md5(password);
        let result = await this.model('home').findOne('user',{forget_uuidCode:uuidCode});
        if(think.isEmpty(result)){
            return this.json({status:0,errno:2,errmsg:"请确认邮件链接是否完整!"});
        }else{
            let Geetest = think.service("geetest"); //加载 commoon 模块下的 geetset service
            let geetest = new Geetest();
            let res = await geetest.validate(this.post());
            if("success" != res.status){
                return this.json({status:0,errno:2,errmsg:"验证码错误!"});
            }else{
                let result = await this.model('home').updateRecord('user',{forget_uuidCode:uuidCode},{password:password});
                return this.json({status:1,errno:0,errmsg:"成功重重置密码，请用新密码重新登录"});
            }
        }
    }

}
