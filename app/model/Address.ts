export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const AddressSchema = new Schema({
        avatar: String,
        userID: String,
        userName: String,
        joinGroupList: [
            {
                groupAvatar: String,
                groupID: String,
                groupName: String,
                joinGroupDate: Number,
            }
        ],
        becomeFriendList: [
            {
                avatar: String,
                userID: String,
                userName: String,
                becomeFriendDate: Number,
            }
        ],
    })

    return db.model('address', AddressSchema)
}

