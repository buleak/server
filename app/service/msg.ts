import { Service } from 'egg';

export default class MsgService extends Service {
    async getMsg(groupID: string) {
        const result = await this.ctx.model.Msg.findOne({ groupID })
        if (result) {
            return result
        } else {
            await this.createMsg(groupID)
            return this.ctx.model.Msg.findOne({ groupID })
        }
    }
    async createMsg(groupID: string) {
        const { groupName, groupAvatar } = await this.ctx.model.Group.findOne({ groupID })
        await this.ctx.model.Msg.insertMany({
            groupID, groupName, groupAvatar,
            msgList: []
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

