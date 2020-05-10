'use strict';
import { Controller } from 'egg'
export default class Token extends Controller {
    /**
     * 通过 ctx.params.id 获取 :id
     * 通过 ctx.query 获取 get请求的参数
     * 通过 ctx.request.body 获取 post请求的参数
     * 
     * 请求接口：GET - /user - user：列出所有用户
     */
    async index() { 
        this.ctx.body = 'index'
    }
    /**
     * 响应接口：POST - /user - user：新建一个用户
     */
    async create() { 
        this.ctx.body = 'create'
    }
    /**
     * 
     */
    async new() { // GET - /user/new - new_post
        this.ctx.body = 'new post'
    }
    /**
     * 查询接口：GET - /user/:id - post：获取指定用户的信息
     */
    async show() { 
        this.ctx.body = 'show'
    }
    async edit() { // GET - /user/:id/edit - edit_post
        this.ctx.body = 'edit'
    }
    /**
     * 更新接口：PUT - /user/:id - post：更新指定用户的信息
     */
    async update() { 
        this.ctx.body = 'update'
    }
    /**
     * 删除接口：DELETE - /user/:id - post：删除指定用户
     */
    async destroy() { 
        this.ctx.body = 'destroy'
    }
}
