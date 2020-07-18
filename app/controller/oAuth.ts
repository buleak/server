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
    /**
     * 使用前端获得的 Github授权码 + 客户端ID + 客户端密钥获得令牌 data.access_token
     */
    async github() { 
        const {ctx} = this
        const code = ctx.query.code, clientID = 'f4a19c548244724596db', clientSecret = 'bbb3adc3513cad48accb100bb81b9b960115f93c'
        const {status, headers, data} = await ctx.curl(`https://github.com/login/oauth/access_token`, {
            data: {
                client_id: clientID,
                client_secret: clientSecret,
                code: code
            },
            dataType: 'json',
            timeout: 5000,
        })
        console.log(status, headers, data)
        // 拿到令牌后获取 Github数据
        const accessToken = data.access_token
        const {data: userInfo} = await ctx.curl(`https://api.github.com/user`, {
            headers: {
                accept: 'application/json',
                "Authentication": `token ${accessToken}`
            }
        })
        console.log(userInfo)
        this.ctx.body = userInfo
    }
    
}
