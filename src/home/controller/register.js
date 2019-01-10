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
                        subject: name+'用户激活邮件-sau交流学习社区',
                        html: name+'-用户激活邮件，请点击链接进行激活用户，<a style="color: #5579EE" href="https://www.mwcxs.top/activateuser/code=' + newData.activate_uuidCode + '">https://www.mwcxs.top/activateuser/code='+ newData.activate_uuidCode +'</a>'
                    },function (err, res) {
                        console.log(err,res);
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
                    from: mailer.account,
                    to: email,
                    subject: result.name+'成功完善个人信息-sau交流学习社区',
                    html: '成功完善个人信息，欢迎来到<a href="https://www.mwcxs.top">交流学习社区</a>，'
                },function (err, res) {
                    console.log(err,res);
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
