import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt, io } = app;
 
  // router.动作(别名, 路径, ...中间件, 映射的控制器)
  // 动作: head; options; get; put; post; patch; delete[del]; redirect;
  // controller:
  // 1. 具体的 controller: app.controller.home.index
  // 2. 简写的 字符串: 'home.index'
  // 3. Controller文件中可以定义多个 controller, 也支持子目录

  router.get('/', controller.demo.index);
  router.get('hello', '/demo/:id', controller.demo.hello);
  // router.post('createPost', '/api/demo', 'demo.hello.create')
  // router.redirect('/', '/demo/:id', 302); // 内部重定向：首页重定向到 /demo
  // router.get(demo, '/demo', gizp, controller.demo.hi);

  // DEMO API
  router.resources('posts', '/api/posts', controller.restful)
  // 用户查询 API
  router.resources('user', '/user', controller.user)
  router.resources('token', '/token', jwt, controller.token)
  router.resources('search', '/search', jwt, controller.search)
  // 排序 // 只有在需要 token验证的路由才加 jwt
  router.resources('/rank', jwt, controller.rank)
  // 图床应用 API
  router.resources('/imgur', jwt, controller.imgur)


  // ------ socket.io ------
  router.resources('/chatHistory', jwt, controller.chatHistory)
 
  // 对于在命名空间 [/chat]下，监听到的 [server]事件，将由 [app/io/controller/nsp]中的[exchange]方法处理
  // 前端通过调用 socket.emit('server', {data})将数据传输到 [exchange]方法中进行处理
  // io.of('/chat').route('server', io.controller.nsp.exchange)
  
  io.of('/chat').route('error', io.controller.chat.error)
  io.of('/chat').route('disconnect', io.controller.chat.disconnect)
  io.of('/chat').route('client_msg', io.controller.chat.clientMsg)
  io.of('/chat').route('client_online', io.controller.chat.clientOnline)
};
