export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const AddressSchema = new Schema({
        avatar: String,
        userID: String,
        userName: String,
        joinGroupList: [
            {
                groupID: String,
                groupName: String,
                groupType: Number,
                groupAvatar: String,
                joinGroupDate: Number,
            }
        ],
        becomeFriendList: [
            {
                avatar: String,
                userID: String,
                userName: String,
                friendStatus: Number, // 0:
                becomeFriendDate: Number,
            }
        ],
        historyRecordList: [ // 首页展示的历史聊天纪录
            {
                groupAvatar: String,
                groupID: String,
                groupName: String,
                groupType: Number, // 1-群聊 2-私聊
                lastOnlineMsg: String, // 最后一次发言内容
                lastOnlineDate: Number, // 最后一次发言时间
            }
        ]
    })

    return db.model('address', AddressSchema)
}

