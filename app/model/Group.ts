export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const GroupSchema = new Schema({
        userID: String,
        targetID: String,
        lastTalkDate: Number,
        groupMsgList: [
            {
                userID: String,
                msg: String
            }
        ],
    })

    return db.model('group', GroupSchema)
}

