'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * websocket 建立连接时处理
     * @return {Promise} []
     */
    openAction(self){
        var socket = self.http.socket;
        var id = socket.id;
        this.broadcast('new message', {
            username: socket.username,
            message: self.http.data
        });
        console.log(self, '-------------------')
        console.log(socket.username, self.http.data, '00000000000000')

    }
}
