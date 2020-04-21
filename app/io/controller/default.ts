// io的 controller继承 egg的 controller，拥有如下对象：
/**
 * { ctx, app, service, config, logger }
 */

const Controller = require('egg').Controller;
 class Default extends Controller {
    async ping() {
        const { ctx, app } = this;
        const nsp = app.io.of('/chat');
        const message = ctx.args[0] || {};
        const socket = ctx.socket;
        const client = socket.io;
        try {
            const {target, payload} = message;
            if(!target) return;
            const msg = ctx.helper.parseMsg('server', payload, {client, target})
            nsp.emit(target, msg)
        } catch(error) {
            app.logger.error(error)
        }
    }
}
module.exports = Default

