'use strict';
import { Controller } from 'egg'
import { GroupSchema, MsgInfo, MsgSchema } from '../interface'
export default class Msg extends Controller {
    /**
     * 获取 groupID群的聊天记录
     */
    async index() {
        const { ctx, service } = this
        const { groupID, groupName } = ctx.query
        const groupInfo: GroupSchema = await service.group.getGroup(groupID, groupName)
        const msg: MsgSchema = await service.msg.getMsg(groupID)
        const msgList: MsgInfo[] = msg.msgList
        if(!groupInfo) {
            ctx.body = {
                status: 400,
                msg: '未找到该群'
            }
        }
        ctx.body = {groupInfo, msgList}
    }
    /**
     * 添加好友接口：
     */
    async create() {

    }
}
