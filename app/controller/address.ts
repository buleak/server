'use strict';
import { Controller } from 'egg'
import { FriendInfo, GroupJoinInInfo } from '../interface'
export default class Address extends Controller {
    /**
     * 获取好友列表 & 群列表接口：根据 userID查询好友列表
     */
    async show() { 
        interface resultObj {
            becomeFriendList: FriendInfo[],
            joinGroupList: GroupJoinInInfo[], 
        }
        const { ctx, service } = this
        const {id:userID} = ctx.params
        const result:resultObj = await service.address.getAddressObj(userID)
        ctx.body = result
    }
    /**
     * 添加好友接口：
     */
    async create() {
        const { ctx, service } = this
        const { userID, targetID } = ctx.request.body
        const result:boolean = await service.address.addFriend(userID, targetID)
        ctx.body = {
            status: result,
            msg: '添加成功'
        }
    }
}
