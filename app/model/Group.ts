export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const GroupSchema = new Schema({
        avatar: String,
        userID: String,
        userName: String,
        groupID: String,
        groupName: String,
        groupAvatar: String,
        groupType: Number, // 1-群聊 2-私聊
        groupProfile: String,
        memberList: [
            {
                avatar: String,
                userID: String,
                userName: String,
                joinGroupDate: Number,
            }
        ],
    })

    return db.model('group', GroupSchema)
}

