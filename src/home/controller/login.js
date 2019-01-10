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
                    smtpTransport.sendMail({
                        from: mailer.from,
                        to: email,
                        subject: result.name+'登陆成功-sau交流学习社区',
                        html: '<div style="font-size: 18px;">登陆成功，欢迎来到<a href="https://www.mwcxs.top">交流学习社区</a></div>'
                    },function (err, res) {
                        console.log(err,res);
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
                let result = await this.model('home').updateRecord('user',{email:email},{forgetFlag: true, forget_uuidCode:newUuid});
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
                smtpTransport.sendMail({
                    from: mailer.from,
                    to: email,
                    subject: result.name+'密码重置邮件-sau交流学习社区',
                    html: '密码重置邮件，请点击链接进行重置密码，<a style="color: #5579EE" href="https://www.mwcxs.top/forgetcomplete/code=' + newUuid + '">https://www.mwcxs.top/forgetcomplete/code='+ newUuid +'</a>欢迎来到交流学习社区,请尽快登陆修改密码'
                },function (err, res) {
                    console.log(err,res);
                })
                return this.json({status:1,errno:0,uname:result.name,errmsg:"重置密码链接已经发到您邮箱!点击链接后修改密码！"});
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
