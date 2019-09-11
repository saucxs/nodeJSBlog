'use strict';

import Base from './base.js';
import request from "request";

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async robotchatAction() {
        console.log('9999999999999999999999999')
        let data = await this.post();
        console.log(data, '0000000')
        let params = {
            key: "2524eac7da754706a295ecc4047d9bdf",
            info: "" + data.message,
            userid: "407552"
        }
        const options = {
            method: "POST",
            uri: "http://www.tuling123.com/openapi/api",
            body: params,
            json: true // Automatically stringifies the body to JSON
        };
        let _this = this;
        request(options, function (err, res, body) {
            console.log(body,'robot666666666666666666666666666666666666666666666666666666666666666daily')
            if(body&&body.code===100000){
                return _this.json({errno: 0, data: body.text,	user: "saucxs"});
            }else if(body&&body.code===200000){
                return _this.json({errno: 0, data: body.text,	user: "saucxs"});
            }else{
                let params2 = {
                    key: "89f0072a57ba422c9615f5bdc47b137b",
                    info: "" + data.message,
                    userid: "error407553"
                }
                let options2 = {
                    method: "POST",
                    uri: "http://www.tuling123.com/openapi/api",
                    body: params2,
                    json: true // Automatically stringifies the body to JSON
                };
                request(options2, function (err, res, body) {
                    if(body&&body.code===100000){
                        return _this.json({errno: 0, data: body.text,	user: "saucxs"});
                    }else if(body&&body.code===200000){
                        return _this.json({errno: 0, data: body.text,	user: "saucxs"});
                    }else{
                        let params3 = {
                            key: "ecca6ae8cce54343b1c912de39d54c45",
                            info: "" + data.message,
                            userid: "error407554"
                        }
                        let options3 = {
                            method: "POST",
                            uri: "http://www.tuling123.com/openapi/api",
                            body: params3,
                            json: true // Automatically stringifies the body to JSON
                        };
                        request(options3, function (err, res, body) {
                            if(body&&body.code===100000){
                                return _this.json({errno: 0, data: body.text,	user: "saucxs"});
                            }else if(body&&body.code===200000){
                                return _this.json({errno: 0, data: body.text,	user: "saucxs"});
                            }else{
                                return _this.json({errno: 1, data: '暂不支持此类对话',user: "saucxs"});
                            }
                        })
                    }
                })
            }
        })
    }
}
