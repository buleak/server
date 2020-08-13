import { Service } from 'egg';
import { GroupMemeberInfo } from '../interface';

export default class GroupService extends Service {
    /**
     * 查询 群信息
     */
    async getGroup(groupID: string, groupName: string) {
        return await this.ctx.model.Group.findOne({ groupID, groupName })
        //! 原本是查询没有该群, 则自动创建一个群
        // await this.createGroup(userID, groupID, groupName, groupType) 
        // return this.ctx.model.Group.findOne({ groupID })
    }
    /**
     * 创建 群
     * @param groupType 群类型: 1-公共群; 2-私聊群
     * @param memberList 群成员
     * @param groupProfile 群简介
     */
    async createGroup(userID: string, groupID: string, groupName: string = '聊天室', groupType: number = 1, groupAvatar: string = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', memberList: string[] = [], groupProfile: string = '暂无简介') {
        const result = await this.ctx.model.Group.findOne({ groupID })
        if(result) { return false }
        // 查询 群主信息
        const { avatar, userName } = await this.ctx.model.User.findOne({ userID })
        // 创建群成员列表
        let list: GroupMemeberInfo[] = [{ avatar, userID, userName, joinGroupDate: new Date().getTime(), userIdentity: 'master', userAuthority: 4 }]
        for (let id of memberList) {
            const { avatar, userID, userName } = await this.ctx.model.User.findOne({ userID: id })
            list.push({ avatar, userID, userName, joinGroupDate: new Date().getTime(), userIdentity: 'member', userAuthority: 2 })
        }
        // 创建 群
        await this.ctx.model.Group.insertMany({
            groupID, groupType, groupName, groupAvatar, groupProfile, groupCreateDate: new Date().getTime(),
            memberList: list
        })
        // 将 groupID添加到所有群成员的群关系列表中
        this.service.address.joinGroup(userID, groupID)
        for (let id of memberList) {
            this.service.address.joinGroup(id, groupID)
        }
        // 创建 群对应的 <Msg>数据库
        await this.service.msg.createMsg(groupID)
    }
    /**
     * 查询 userID用户加入的所有群
     */
    async getHistoryGroupList(userID: string) {
        return await this.ctx.model.Group.find().elemMatch('memberList', { userID })
    }
}

