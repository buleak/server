export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const BlogSchema = new Schema({
        author: { type: String }, // 作者
        avatar: {type: String}, // 头像
        date: {type: Number}, // 时间
        level: {type: Number}, // 等级
        starCount: {type: Number}, // 点赞数
        commentCount: {type: Number}, // 评论数
        title: {type: String}, // 标题
        category: {type: Array}, // 分类
        keyWord: { type: String }, // 关键词
        content: {type: String}, // 内容
        starList: {type:Array}, // 点赞列表
        commentList: {type:Array}, // 评论列表
    })

    return db.model('blogs', BlogSchema)
}

