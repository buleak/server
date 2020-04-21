import {Context} from 'egg'

export default ():any => {
    return async (ctx: Context, next: () => Promise<any>) => {
        // 你可以获取 config的配置
        const config = ctx.app.config;
        config.mycon = 12
        await next();
    }
}