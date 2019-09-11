export default {
    on: true, //是否开启 WebSocket
    type: 'socket.io', //使用的 WebSocket 库类型，默认为 socket.io
    allow_origin: '', //允许的 origin
    adp: undefined, // socket 存储的 adapter，socket.io 下使用
    path: '', //url path for websocket
    messages: {
        open: 'home/socketio/open', // WebSocket 建立连接时处理的 Action
        close: 'home/socketio/close', // WebSocket 关闭时处理的 Action
        adduser: 'home/socketio/adduser', //adduser 事件处理的 Action
    }
};