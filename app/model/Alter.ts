export default app => {
    const db = app.mongoose, Schema = db.Schema;
    const UserSchema = new Schema({
        user: { type: String },
        pwd: { type: String }
    })
    
    /**
     * db.model(xxx, Schema)
     * xxx: 对应的数据库集合，集合名是 xxx的【复数形式】
     *  1. 绝大多数可数名词：-s
     *      user -> users
     *  2. s、z、x、ch、sh结尾的词：-es
     *      box -> boxes
     *  3. 辅音字母 +y结尾的名词：变 y为 i，-es
     *      baby -> babies
     *  4. o结尾的名词：-es (外来词或缩写 -s)
     *      tomato -> tomatoes
     *      反例：photo -> photos
     *  5. f或 fe结尾的词：-ves，有例外
     *      life -> lives
     *      反例：roof -> roofs、staff -> staffs
     *  6. us结尾的名词：-i
     *      focus -> foci
     *  7. 部分单纯复数形式不变
     *      fish -> fish
     *  8. 一些特殊词复数无规律
     *      man -> men
     *      child -> children
     *      louse -> lice
     *  
     * Schema: 指定数据库集合内数据格式
     */
    return db.model('life', UserSchema) 
}

