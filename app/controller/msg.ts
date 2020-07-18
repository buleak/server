'use strict';
import { Controller } from 'egg'
import { GroupSchema, MsgInfo, MsgSchema } from '../interface'
export default class Msg extends Controller {
    /**
     * 获取 groupID群的聊天记录
     */
    async index() {
        const { ctx, service } = this
        const { userID, groupID, groupType } = ctx.query
        const groupInfo: GroupSchema = await service.group.getGroup(userID, groupID, groupType)
        const msg: MsgSchema = await service.msg.getMsg(groupID)
        const msgList: MsgInfo[] = msg.msgList
        ctx.body = {groupInfo, msgList}
    }
    /**
     * 添加好友接口：
     */
    async create() {

    }
}
