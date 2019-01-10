import crontab from 'node-crontab';

let sendMail = () => {
    //定时任务具体逻辑，用一个 Action
    // console.log('000000000000000000000')
    think.http('/home/index/sendmailday',true);

}
/* 1 分钟执行一次*/
// let jobId = crontab.scheduleJob( '*/1 * * * *', fn);
/*每天8:00发送邮件*/
let jobId = crontab.scheduleJob( '00 08 * * *', sendMail);
//开发环境下立即执行一次看效果
// if(think.env === 'development'){
//     fn();
// }
