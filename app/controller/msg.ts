'use strict';
import { Controller } from 'egg'
import { GroupSchema } from '../interface'
export default class Msg extends Controller {
    /**
     * 获取 groupID群的聊天记录
     */
    async index() { 
        const { ctx, service } = this
        const {groupID, groupType} = ctx.query
        const groupInfo:GroupSchema[] = await service.group.getGroup(groupID, groupType)
        // console.log('ctx.params', ctx.params)
        ctx.body = groupInfo
    }
    /**
     * 添加好友接口：
     */
    async create() {
        
    }
}
