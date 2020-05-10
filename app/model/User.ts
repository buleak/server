// 数据库映射
export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const UserSchema = new Schema({
        avatar: String,
        userID: String,
        userName: String,
        passWord: String,
        sex: String,
        star: Number,
        score: Number,
        msgNum: Number,
        registerDate: Number,
        lastOnlineMsg: String,
        lastOnlineDate: Number,
    })

    return db.model('user', UserSchema)
}

