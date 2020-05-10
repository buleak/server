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
     * 添加好友接口：
     */
    async create() {
        
    }
}
