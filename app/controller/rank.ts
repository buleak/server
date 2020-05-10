'use strict';
import { Controller } from 'egg'
import { LoginRes } from '../interface'
export default class Rank extends Controller {
    /**
     * 排序接口：用户排行榜
     */
    async index() { // GET - /XXX - XXX
        const { ctx, service } = this;
        const { rankType } = ctx.query;
        console.log('ctx.s', ctx.state.user) // 读取 token储存的内容 {userName: 'buleak', iat: 过期时间 }
        let userNameList:any[] = await service.user.userList(rankType)
        ctx.body = {userNameList}
    }
    /**
     * 注册接口：获取用户输入的 [userName, passWord, sex, rePassWord]，进行账号注册
     */
    async create() { // POST - /XXX - XXX
        const { ctx, service } = this;
        const { userName, passWord, sex } = ctx.request.body;
        let hasCustomer:boolean = await service.user.hasCustomer(userName);
        let isRegistered:boolean = await service.user.register(userName, passWord, sex)
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
    async new() { // GET - /XXX/new - new_post
        this.ctx.body = 'new post'
    }
    async show() { // GET - /XXX/:id - post
        this.ctx.body = 'show'
    }
    async edit() { // GET - /XXX/:id/edit - edit_post
        this.ctx.body = 'edit'
    }
    async update() { // PUT - /XXX/:id - post
        this.ctx.body = 'update'
    }
    async destroy() { // DELETE - /XXX/:id - post
        this.ctx.body = 'destroy'
    }
}
