import { Service } from 'egg';

class UserService extends Service {
    /**
     * 
     
    // this.ctx.model.Alter对应的是 文件名 model/Alter
    // mode('life', ...)中的 life对应的是数据库(database)[admin]的集合(collection)[kives][life的复数形式]
    let result = await this.ctx.model.Alter.create({
        "user": "--------======++++-",
        "pwd": "text123"
    })

    // this.ctx.model.User对应的是 文件名 model/User
    // mode('user', ...)中的 user对应的是数据库(database)[admin]的集合(collection)[users][user的复数形式]
    let result2 = await this.ctx.model.User.find()
    return result + result2
    */

    /**
     * 根据 rankType请求数据库，对用户进行排行
     * @param rankType  date || star || score
     */
    async searchBlog(keyWord: string) {
        const Blogs = this.ctx.model.Blog.find({ keyWord });
        return Blogs
    }

}

export default UserService