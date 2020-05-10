export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const ChatSchema = new Schema({
        roomID: String,
        roomName: String,
        onlineList: [
            {
                //avatar: String,
                userID: String,
                userName: String,
                //nickName: String,
                lastOnLineDate: Number,
            }
        ]
    })

    return db.model('chat', ChatSchema)
}

