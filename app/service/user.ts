import { Service } from 'egg';
import { UserBaseInfo } from '../interface';

class UserService extends Service {
    async hasUser() {
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
    }

    /**
     * 根据 rankType请求数据库，对用户进行排行
     * @param rankType  date || star || score
     */
    async userList(rankType: string) {
        let userNameList: any[] = [], User = this.ctx.model.User;
        switch (rankType) {
            case 'date':
                const dateUserList = await User.find().sort({ date: 1 });
                userNameList = dateUserList.map((val, index: number) => {
                    const {userName, sex, date, star, score} = val;
                    return { id: index, userName, sex, date, star, score, }
                })
                break;
            case 'star':
                const starUserList = await User.find().sort({ star: 1 });
                userNameList = starUserList.map((val, index: number) => {
                    const {userName, sex, date, star, score} = val;
                    return { id: index, userName, sex, date, star, score, }
                })
                break;
            case 'score':
                const scoreUserList = await User.find().sort({ score: 1 });
                userNameList = scoreUserList.map((val, index: number) => {
                    const {userName, sex, date, star, score} = val;
                    return { id: index, userName, sex, date, star, score, }
                })
                break;
            default:
                break;
        }
        return userNameList
    }
    /**
     * 判断数据库中是否有该用户
     * @param userName 用户名
     */
    async hasCustomer(userName: string) {
        const resultList = await this.ctx.model.User.find({ userName });
        return Boolean(resultList.length)
    }
    /**
     * 判断是否为本系统用户
     * @param userName 用户名
     * @param passWord 密码
     */
    async isCustomer(userName: string, passWord: string) {
        const resultList = await this.ctx.model.User.find({ userName })
        if (resultList.length > 0) {
            return resultList.some(val => {
                return val.passWord === passWord
            })
        } else {
            return false
        }
    }
    /**
     * 返回用户信息
     * @param userName 用户名
     */
    async findUserInfo(userName: string) {
        const userInfo = await this.ctx.model.User.findOne({ userName })
        return userInfo;
    }
    /**
     * 返回 search结果
     * @param value 搜索关键词 
     */
    async searchUserList(value: string) {
        const userList:UserBaseInfo[] = await this.ctx.model.User.find({ userName: {$regex: value, $options: 'i'} }, {_id:0, avatar:1, userID:1, userName:1}) || []
        return userList;
    }
    /**
     * 注册账号
     * @param sex 性别
     * @param star 获得点赞数
     * @param score 获得分数
     * @param msgNum 消息数
     * @param avatar 用户头像
     * @param userID 用户唯一标识
     * @param userName 用户名
     * @param registerDate 注册时间
     * @param lastOnlineMsg 最后在线消息
     * @param lastOnlineDate 最后在线时间
     */
    async register(userName: string, passWord: string, sex: string) {
        await this.ctx.model.User.insertMany({ 
            userName,
            passWord, 
            userID: await this.app.snowflake.uuid(), 
            sex, 
            star: 0, 
            score: 0,
            msgNum: 0,
            registerDate: new Date().getTime(), 
            lastOnlineMsg: '',
            lastOnlineDate: new Date().getTime(), 
            avatar: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K`
        })
        return true
    }
}

export default UserService