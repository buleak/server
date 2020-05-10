export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const MsgSchema = new Schema({
        groupID: String,
        groupName: String,
        groupAvatar: String,
        msgProfile: String,
        msgList: [
            {
                avatar: String,
                userID: String,
                userName: String,
                msg: String,
                msgID: String,
                msgDate: Number,
            }
        ],
    })

    return db.model('msg', MsgSchema)
}

