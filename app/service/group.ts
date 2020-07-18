import { Service } from 'egg';
import { GroupMemeberInfo } from '../interface';

export default class GroupService extends Service {
    async getGroup(userID:string, groupID: string, groupType: number) {
        const result = await this.ctx.model.Group.findOne({ groupID })
        if(result) {
            return result 
        }else {
           await this.createGroup(userID, groupID, groupType) 
           return this.ctx.model.Group.findOne({ groupID })
        }
        // if (result) {
        //     return result
        // } else {
        //     const { userName, avatar } = await this.ctx.model.User.findOne({ userID })
        //     await this.ctx.model.Address.insertMany({
        //         avatar,
        //         userID,
        //         userName,
        //         joinGroupList: [],
        //         becomeFriendList: [],
        //     })
        //     return {
        //         avatar,
        //         userID,
        //         userName,
        //         joinGroupList: [],
        //         becomeFriendList: [],
        //     }
        // }
    }
    /**
     * 
     * @param userID 用户ID
     * @param groupID 群ID
     * @param groupType 群类型: 1-公共群; 2-私聊群
     * @param groupName 群名称
     * @param groupAvatar 群头像
     * @param memberList 群成员
     * @param groupProfile 群简介
     */
    async createGroup(userID: string, groupID:string, groupType:number=1, groupName:string='聊天室',groupAvatar:string='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', memberList:string[]=[], groupProfile:string='暂无简介') {
        // TODO 重复建群问题, [群ID每次都变化]
        const {avatar, userName} = await this.ctx.model.User.findOne({userID})
        let list:GroupMemeberInfo[] = [{avatar, userID, userName, joinGroupDate: new Date().getTime(), userIdentity: 'master', userAuthority: 4}]
        for(let id of memberList) {
            const {avatar, userID, userName} = await this.ctx.model.User.findOne({userID:id})
            list.push({avatar, userID, userName, joinGroupDate: new Date().getTime(), userIdentity: 'member', userAuthority: 2})
        }
        await this.ctx.model.Group.insertMany({
            groupID, groupType, groupName, groupAvatar, groupProfile, groupCreateDate: new Date().getTime(),
            memberList: list
        })
        for(let id of memberList) {
            await this.service.address.joinGroup(id, groupID)
        }
        await this.service.msg.createMsg(groupID)
    } 
    /**
     * 查询 群成员中含有 userID的群列表
     * @param userID 用户ID
     * @param userName 用户名称
     */
    async getHistoryGroupList(userID: string) {
        const result = await this.ctx.model.Group.find().elemMatch('memberList', { userID })
        if (result) {
            return result
        } else {
            return []
        }
    }
}

