'use strict';
import { Controller } from 'egg'
import { BodyBoolean } from '../interface'
export default class UserSearch extends Controller {
    /**
     * 登录接口：判断该用户是否存在于 mongoDB数据库
     */
    async index() { // GET - /XXX - XXX
        const { app, ctx, service } = this;
        const { userName, passWord } = ctx.query;
        // service/user.ts/isCustomer()
        let hasCustomer: boolean = await service.user.hasCustomer(userName);
        let body: BodyBoolean;

        if(hasCustomer) {
            let isCustomer: boolean = await service.user.isCustomer(userName, passWord);
            if(isCustomer) {
                let {email, userID} = await service.user.findUserInfo(userName);
                const token = app.jwt.sign({ // jwt设置 token
                    userName // 需要储存的 token数据
                 }, app.config.jwt.secret, { expiresIn: '1h' }); 
                await app.redis.set(`token_${userName}`, token) // redis储存 token
                body = { status: true, msg: '登陆成功', token, userInfo: {email, userName, userID} }
            }else {
                body = { status: false, msg: '账号密码错误' }
            }
        }else {
            body = { status: false, msg: '该账号不存在' }
        }
        
        ctx.body = body
    }
    async new() { // GET - /XXX/new - new_post
        this.ctx.body = 'new post'
    }
    async show() { // GET - /XXX/:id - post
        this.ctx.body = 'show'
    }
    async edit() { // GET - /XXX/:id/edit - edit_post
        this.ctx.body = 'edit'
    }
    /**
     * 注册接口：获取用户输入的 [userName, passWord, email, rePassWord]，进行账号注册
     */
    async create() { // POST - /XXX - XXX
        const { ctx, service } = this;
        const { userName, passWord, email } = ctx.request.body;
        let hasCustomer:boolean = await service.user.hasCustomer(userName);
        let isRegistered:boolean = await service.user.register(userName, passWord, email)
        let body: BodyBoolean;
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
    async update() { // PUT - /XXX/:id - post
        this.ctx.body = 'update'
    }
    async destroy() { // DELETE - /XXX/:id - post
        this.ctx.body = 'destroy'
    }
}
