'use strict';
import { Controller } from 'egg'
import { LoginRes, UserBaseInfo } from '../interface'
export default class Login extends Controller {
    /**
     * 登录接口：判断该用户是否存在于 mongoDB数据库
     */
    async index() { 
        const { app, ctx, service } = this
        const { userName, passWord } = ctx.query
        const hasCustomer: boolean = await service.user.hasCustomer(userName) // service/user.ts/isCustomer()
        let body: LoginRes

        if(hasCustomer) { // 该账号存在于数据库
            const isCustomer: boolean = await service.user.isCustomer(userName, passWord)
            if(isCustomer) {
                const {sex, userID, avatar, registerDate} = await service.user.findUserInfo(userName)
                const token = app.jwt.sign({ // jwt设置 token
                    userName // 需要储存的 token数据
                 }, app.config.jwt.secret, { expiresIn: '1h' }); 
                await app.redis.set(`token_${userName}`, token) // redis储存 token
                body = { status: true, msg: '登陆成功', token, userInfo: {sex, userName, userID, avatar, registerDate} }
            }else {
                body = { status: false, msg: '账号密码错误' }
            }
        }else {
            body = { status: false, msg: '该账号不存在' }
        }
        
        ctx.body = body
    }
    /**
     * 注册接口：获取用户输入的 [userName, passWord, sex]，进行账号注册
     */
    async create() { 
        const { ctx, service } = this
        const { userName, passWord, sex } = ctx.request.body
        const hasCustomer:boolean = await service.user.hasCustomer(userName)
        const isRegistered:boolean = await service.user.register(userName, passWord, sex)
        let body: LoginRes;
        if(hasCustomer) { 
            body = { status: false, msg: '该账号已存在' } 
        }else {
            if (isRegistered) { 
                body = { status: true, msg: '注册成功' } 
            } else { 
                body = { status: false, msg: '注册失败，请稍后重试' } 
            }
        }
        ctx.body = body
    }
    /**
     * 查询接口：获取用户输入的 search关键词，返回符合要求的用户列表
     */
    async new() {
        const { ctx, service } = this
        const {value, userID} = ctx.query
        const searchResult: UserBaseInfo[] | [] = await service.user.searchUserList(value)
        const {becomeFriendList} = await service.address.getAddressObj(userID)
        // TODO 优化 数组查重
        let searchUserList: UserBaseInfo[] = []
        for(let item of searchResult) {
            let isFriend = false
            if(item.userID === userID) { 
                continue 
            }
            for(let i=0; i<becomeFriendList.length; i++) {
                if(item.userID === becomeFriendList[i].userID) {
                    isFriend = true
                    continue
                } 
            }
            searchUserList.push({isFriend, avatar: item.avatar, userID: item.userID, userName: item.userName })
        }
        ctx.body = searchUserList
    }
}
