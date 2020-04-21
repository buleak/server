// 数据库映射
export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const UserSchema = new Schema({
        userName: { type: String },
        passWord: { type: String },
        userID: { type: String },
        email: { type: String },
        date: { type: Number },
        star: { type: Number },
        score: { type: Number },
    })

    return db.model('user', UserSchema)
}

