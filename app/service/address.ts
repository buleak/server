import { Service } from 'egg';

export default class AddressService extends Service {
    /** 
     * 查询 <Address数据库> 中是否存在该用户
     * @param userID 用户ID
     */
    async getAddress(userID: string) {
        const result = await this.ctx.model.Address.findOne({ userID })
        if (result) {
            return result
        } else {
            const { userName, avatar } = await this.ctx.model.User.findOne({ userID })
            await this.ctx.model.Address.insertMany({
                avatar,
                userID,
                userName,
                joinGroupList: [],
                becomeFriendList: [],
            })
            return {
                avatar,
                userID,
                userName,
                joinGroupList: [],
                becomeFriendList: [],
            }
        }
    }
    /**
     * 查询 userID的好友列表，若无则创建一个新表
     * @param userID 用户ID
     * @param userName 用户名称
     */
    async getAddressObj(userID: string) {
        // const result = await this.ctx.model.Address.findOne({ userID })
        const result = await this.getAddress(userID)
        return {
            joinGroupList: result.joinGroupList,
            becomeFriendList: result.becomeFriendList,
        }
        // if(result) {
        //     return {
        //         joinGroupList: result.joinGroupList, 
        //         becomeFriendList: result.becomeFriendList,
        //     }
        // }else {
        //     await this.ctx.model.Address.insertMany({ 
        //         userID,
        //         userName,
        //         avatar: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K`,
        //         joinGroupList: [],
        //         becomeFriendList: [],
        //      })
        //     return {
        //         joinGroupList: [],
        //         becomeFriendList: [],
        //     }
        // }
    }
    /**
     * 用户和目标互相添加好友 [//TODO: 应该是用户发送好友申请, 目标同意后才成为好友. 现在是直接互相添加为好友.]
     * @param userID 用户ID
     * @param targetID 目标好友ID
     */
    async addFriend(userID: string, targetID: string) {
        const { userName, avatar } = await this.getAddress(userID)
        const { userName: targetName, avatar: targetAvatar } = await this.ctx.model.User.findOne({ userID: targetID })
        await this.ctx.model.Address.updateOne({ userID }, {
            '$addToSet': {
                becomeFriendList: {
                    avatar: targetAvatar,
                    userID: targetID,
                    userName: targetName,
                    becomeFriendDate: new Date().getTime(),
                }
            }
        })
        await this.ctx.model.Address.updateOne({ userID: targetID }, {
            '$addToSet': {
                becomeFriendList: {
                    avatar,
                    userID,
                    userName,
                    becomeFriendDate: new Date().getTime(),
                }
            }
        })
        return true
    }
    /**
     * 将用户加入的群信息收录到 joinGroupList里面
     * @param userID 用户ID
     * @param groupID 群ID
     */
    async joinGroup(userID: string, groupID: string) {
        const { groupName, groupType, groupAvatar } = await this.ctx.model.Group.findOne({ groupID })
        console.log('object', groupName, groupType, groupAvatar)
        await this.ctx.model.Address.updateOne({ userID }, {
            '$addToSet': {
                joinGroupList: {
                    groupID,
                    groupName,
                    groupType,
                    groupAvatar,
                    joinGroupDate: new Date().getTime(),
                }
            }
        })
    }
}
