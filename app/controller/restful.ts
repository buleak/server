'use strict';
import { Controller } from 'egg'
/**
 * GET：读取，一般用于幂等操作[不会产生副作用]
 * POST：提交
 * DELETE：删除
 * PUT：更新整个资源
 * PATCH：更新部分资源
 * CONNECT：将连接改为管道方式的代理服务器
 * HEAD：请求服务器响应头
 * OPTIONS：测试服务器功能是否正常，返回所服务器支持的 HTTP请求方法
 */
export default class RESTful extends Controller {
    async index() { // 请求 GET - /XXX - XXX
        this.ctx.body = {"data": "index"}
    }
    async new() { // GET - /XXX/new - new_post
        this.ctx.body = 'new post'
    }
    async show() { // 查询 GET - /XXX/:id - post
        this.ctx.body = 'show'
    }
    async edit() { // GET - /XXX/:id/edit - edit_post
        this.ctx.body = 'edit'
    }
    async create() { // POST - /XXX - XXX
        const {app, ctx} = this;
        console.log('app', app)
        console.log('body', ctx.request.body)
        this.ctx.body = {"name": "zwz", "age": 24}
    }
    async update() { // PUT - /XXX/:id - post
        this.ctx.body = 'update'
    }
    async destroy() { // DELETE - /XXX/:id - post
        this.ctx.body = 'destroy'
    }
}
