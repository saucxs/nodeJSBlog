import crontab from 'node-crontab';

let sendMail = () => {
    //定时任务具体逻辑，用一个 Action
    think.http('/crontab/index/sendmailday',true);
}

let sendArticle = () => {
    //定时任务具体逻辑，用一个 Action
    think.http('/crontab/index/baiducrontab',true);
}
/* 1 分钟执行一次*/
// let jobId = crontab.scheduleJob( '*/1 * * * *', fn);
/*每天8:00发送邮件*/
let jobId = crontab.scheduleJob( '00 08 * * *', sendMail);

/*每天晚上十一点五十推送baidu*/
let baidu_daily = crontab.scheduleJob('40 23 * * *', sendArticle)

//开发环境下立即执行一次看效果
if(think.env === 'development'){
    // sendArticle();
}
