'use strict';
import { Controller } from 'egg'
export default class UserSearch extends Controller {
    /**
     * 判断该用户是否存在于 mongoDB数据库
     */
    async index() { // GET - /XXX - XXX
        const {ctx, service} = this;
        const searchText:string = ctx.query;
        const resultList = await service.blog.searchBlog(searchText)  
        console.log('resultList', resultList)
        ctx.body = 'index'
    }
    async create() { // POST - /XXX - XXX
        this.ctx.body = 'create'
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
