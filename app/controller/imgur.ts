import { Controller } from 'egg'
// import glob from 'glob'
import glob = require('glob')
// import fs = require('fs')
// import url = require('url')

export default class Imgur extends Controller {
    public async index() {
        const { ctx } = this;
        const files = glob.sync(`${__dirname}/../public/imgs/*`)
        console.log('item >>> ', `${__dirname}/../public/imgs/*`, files)
        const result = files.map(item => {
            return `http://localhost:7001/public${item.split('public')[1]}`
        })
        // console.log('config', config)
        ctx.body = {
            state: 200,
            result
        }
    }

    public async create() {
        const { ctx } = this;
        // const page = ctx.query.page || 0;
        // const result = await service.test.sayHello(page)

        // let stream = await ctx.getFileStream(),
        //     filename = new Date().getTime() + stream.filename;
        // const result = new Promise((resolve, reject) => {
        //     const imgPath = url.resolve(__dirname, '../public/imgs'),
        //         ws = fs.createWriteStream(imgPath);

        //     stream.pipe(ws)

        //     let errFlag;
        //     ws.on('error', err => {
        //         errFlag = true
        //         console.log('err', err)
        //         reject(err)
        //     })
        //     ws.on('finish', () => {
        //         if (errFlag) { return }
        //         resolve({ filename, name: stream.fieldname })
        //     })
        // })
        console.log('ctx.request.body', ctx.request.body)
        ctx.body = {...ctx.request.body, name: 'buleak'}
    }
}