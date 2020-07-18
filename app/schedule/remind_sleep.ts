// import { Subscription } from 'egg'

export default {
    schedule: {
        interval: '5d', // 间隔 5天执行一次
        // cron: '5 5 1 * * * ' // 在特定时刻执行一次: '秒(0-59) 分钟(0-59) 小时(0-23) 天(1-31) 月(1-12) 星期(0-7, 0 or 7是 Sun)'
        // env: [], // 仅在指定的环境下才启动该定时任务
        // disable: true, // 为 true时, 这个定时任务不会被启动
        // immediate: true, // 为 true时, 应用启动并 ready后立刻执行一次
        type: 'all', // all: 每台机器上所有的 worker都需要执行, worker: 每台机器上只有一个 worker会执行这个定时任务，每次执行定时任务的 worker是随机的。
    },
    async task() { // 定时任务
        // const res = await ctx.curl('http://www.api.com/cache', {
        //     dataType: 'json',
        // });
        // ctx.app.cache = res.data;
        console.log('new', new Date().getTime())
    },
}