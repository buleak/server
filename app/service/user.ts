import { Service } from 'egg';

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
                    const {userName, email, date, star, score} = val;
                    return { id: index, userName, email, date, star, score, }
                })
                break;
            case 'star':
                const starUserList = await User.find().sort({ star: 1 });
                userNameList = starUserList.map((val, index: number) => {
                    const {userName, email, date, star, score} = val;
                    return { id: index, userName, email, date, star, score, }
                })
                break;
            case 'score':
                const scoreUserList = await User.find().sort({ score: 1 });
                userNameList = scoreUserList.map((val, index: number) => {
                    const {userName, email, date, star, score} = val;
                    return { id: index, userName, email, date, star, score, }
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
     * 判断该用户是否为本系统客户
     * @param userName 用户名
     * @param passWord 密码
     */
    async isCustomer(userName: string, passWord: string) {
        const resultList = await this.ctx.model.User.find({ userName })
        
        if (resultList.length > 0) {
            return resultList.some(val => {
                if(!val.userID) { val.userID = `QAQ${Math.random()}_${new Date().getTime()}`}
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
     * 注册账号
     * @param userName 用户名
     * @param passWord 密码
     * @param email 邮箱地址
     * @param date 注册时间
     * @param userID 用户唯一标识
     * @param star 获得点赞数
     * @param score 获得分数
     */
    async register(userName: string, passWord: string, email: string) {
        const date = new Date().getTime();
        const userID =  `QAQ${Math.random()}_${date}`;
        const isRegistered = await this.ctx.model.User.insertMany({ userName, passWord, email, date, userID, star: 0, score: 0 })
        console.log(`register >> ${userName} : ${passWord}`, isRegistered)
        return true
    }
}

export default UserService