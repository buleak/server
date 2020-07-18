import { Controller } from 'egg';

// 推荐通过 router.js 接收请求；通过 constroller解析用户输入，对请求参数继续处理(校验、转换)；通过 service处理业务
/**
 * Constroller(控制器)：
 *  1. 作用：
 *      1. 获取请求参数
 *      2. 校验、组装、转换参数
 *      3. 调用 Service进行业务处理，转换返回的结果
 *      4. 将结果相应给用户
 *  2. 做法：
 *      1. 所有 Constroller文件必须放到 app/controller目录下，支持多级目录
 *      2. Constroller类 【class】
 *          1. 可以自定义基类 BaseController，封装常用方法
 *      3. Constroller方法 【function】
 */

export default class HomeController extends Controller {
  /**
   * this: {
   *  ctx: 上下文 Context对象的实例, 【可以拿到封装好的处理请求的各种边界属性 & 方法】
   *  app: 应用 Application对象的实例,【可以拿到全局对象 & 方法】
   *  service: 定义的 Service, 【可以访问到抽象出的业务层，等价于 this.ctx.service】
   *  config: 应用运行时的配置项,
   *  logger: { logger对象，打印日志
   *      debug,
   *      info,
   *      warn,
   *      error
   *  }
   * }
   */
  public async index() {
    const { ctx } = this;
    this.app.runSchedule('./remind_sleep.ts').then(data => {
      console.log('sleep', data)
    })
    ctx.body = 'Hello Egg'
  }
  public async prop() {
    const { ctx, service } = this;  
    const createRule = { // 校验参数规则
      title: { type: 'string' },
      age: { type: 'number' }
    }
    ctx.validate(createRule) // 校验参数
    const req = { // 组装参数
      ...ctx.request.body,
      author: ctx.session.userId,
      text: await service.test.sayHi('egg')
    }
    ctx.status = 200
    ctx.body = req // 调用 service进行业务层处理
  }
  async hello() {
    const { ctx } = this;
    ctx.body = `hello egg ts`
  }
}
