import { Controller } from 'egg';
export default class ChatController extends Controller {
  async clientMsg() { // 接收到聊天信息
    const { ctx, app } = this;
    const nsp = app.io.of('/chat'); // 命名空间
    const {target, message} = ctx.args;
    const {msgList} = await this.service.chat.ClientEmitMsg(message)
    nsp.emit(target, msgList)
  }

  async clientOnline() { // 1. 接收到用户信息，添加该用户到在线列表
    const {ctx, app, service} = this;
    const nsp = app.io.of('/chat'); // 命名空间
    const [target, roomInfo, userInfo] = ctx.args;
    const {onlineList} = await service.chat.ChatRoom(roomInfo, userInfo) 
    nsp.emit(target, onlineList)
  }

  async disconnect() {
    const { ctx } = this;
    const message = ctx.args[0] || {};
    console.log('socket_disconnect >>', message)
  }

  async error() {
    console.log('socket_error >>')
  }
}
