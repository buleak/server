const PREFIX = 'room';

export default () => {
    return async (ctx, next) => {
        // app, 日志， socket， helper扩展
        const {app, logger, socket, helper} = ctx

        // id，命名空间，数据
        const id = socket.id, 
            nsp = app.io.of('/chat'),
            query = socket.handshake.query;
        console.log('id & query', id, query)

        // 用户信息，房间列表
        const { room, userID} = query;
        const rooms = [room];
        logger.debug('#userInfo', id, room, userID)

        // 方法：踢出用户
        const tick = (id, msg) => {
            logger.debug('#tick', id, msg);
            socket.emit(id, helper.parseMsg('deny', msg))
            socket.disconnect()
            // nsp.adapter.remoteDisconnect(id, true, err => {logger.error(err)})
        }

        // redis查询有无该房间，没有则踢出用户，断开连接
        await app.redis.set(`${PREFIX}:${room}`)
        const hasRoom = await app.redis.get(`${PREFIX}:${room}`)
        logger.debug('#hasExist', hasRoom)
        if(!hasRoom) {
            tick(id, {
                type: 'deleted',
                message: 'deleted, room has been deleted.',
            })
            return;
        }

        // 加入房间 
        logger.debug('#join', room)
        socket.join(room)

        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            logger.debug('#onlineJoin', clients)
            if(err) {logger.error('#error', err)}
            nsp.to(room).emit('online', {
                clients,
                action: 'join',
                target: 'participator',
                message: `User(${id}) joined.`
            })
        })
        // 上面是用户加入
        await next();
        // 下面是用户离开
        logger.debug('#leave', room)
        nsp.adapter.clients(rooms, (err, clients) => {
            logger.debug('#onlineLeave', clients)
            if(err) {logger.error('#error', err)}
            nsp.to(room).emit('online', {
                clients,
                action: 'leave',
                target: 'participator',
                message: `User(${id}) leaved.`
            })
        })
    }
}