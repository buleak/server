// 数据库映射
export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const UserSchema = new Schema({
        avatar: String,
        userID: String,
        userName: String,
        passWord: String,
        sex: String,
        msgNum: Number,
        registerDate: Number,
    })

    return db.model('user', UserSchema)
}

