export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const GroupSchema = new Schema({
        // avatar: String,
        // userID: String,
        // userName: String,
        groupID: String,
        groupName: String,
        groupType: Number, // 1-公共群 2-私聊群
        groupLevel: Number,
        groupAvatar: String,
        groupProfile: String,
        groupCreateDate: Number,
        memberList: [
            {
                avatar: String,
                userID: String,
                userName: String,
                userIdentity: String, // 群员身份[群主/管理员/普通群员/禁言群员]
                userAuthority: String, // 群员权限[4/3/2/1]
                joinGroupDate: Number,
            }
        ],
    })

    return db.model('group', GroupSchema)
}

