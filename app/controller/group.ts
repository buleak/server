'use strict';
import { Controller } from 'egg'
import { GroupSchema } from '../interface'
export default class Group extends Controller {
    /**
     * 获取首页聊天记录列表接口：查询 群成员中包含 userID的 group表
     */
    async show() { 
        const { ctx, service } = this
        const {id:userID} = ctx.params
        const historyGroup:GroupSchema[] = await service.group.getHistoryGroupList(userID)
        // console.log('ctx.params', ctx.params)
        ctx.body = historyGroup
    }
    /**
     * 创建群聊接口：
     */
    async create() {
        const { app, ctx, service } = this
        const groupID = await app.snowflake.uuid()
        console.log('body', ctx.request.body)
        const {userID, groupName, groupType, groupAvatar, memberList} = ctx.request.body
        await service.group.createGroup(userID, groupID, groupName, groupType, groupAvatar, memberList)
        ctx.body = {
            status: true,
            msg: '建群成功'
        }
    }
}
