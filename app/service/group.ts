import { Service } from 'egg';

class UserService extends Service {
    async getGroup(groupID: string, groupType: number) {
        const result = await this.ctx.model.Group.findOne({ groupID })
        return result 
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
    async createGroup(userID: string, groupID:string, groupName:string='聊天室',groupAvatar:string='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', groupType:number=1, groupProfile:string='暂无简介') {
        const {avatar, userName} = await this.ctx.model.User.findOne({userID})
        await this.ctx.model.Group.insertMany({
            avatar, userID, userName,
            groupID, groupType, groupName, groupAvatar, groupProfile,
            memberList: [
                {avatar, userID, userName, joinGroupList: new Date().getTime()}
            ]
        })
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

export default UserService