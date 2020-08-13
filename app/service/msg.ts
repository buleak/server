import { Service } from 'egg';

export default class MsgService extends Service {
    /**
     * 查询 groupID群对应的 <Msg>数据库
     */
    async getMsg(groupID: string) {
        return await this.ctx.model.Msg.findOne({ groupID })
    }
    /**
     * 创建 groupID群对应的 <Msg>数据库
     */
    async createMsg(groupID: string) {
        const { groupName, groupAvatar } = await this.ctx.model.Group.findOne({ groupID })
        await this.ctx.model.Msg.insertMany({
            groupID, groupName, groupAvatar,
            msgList: []
        })
    }
}

