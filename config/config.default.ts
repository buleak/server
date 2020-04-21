import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584775179783_8885';

  // add your egg config in here
  config.middleware = [];

  // 安全验证
  config.security = {
    csrf: { // 关闭 csrf安全验证
      enable: false,
    },
    // domainWhiteList: ['*'] // 白名单,配置 cors.origin后失效
  }

  // 跨域
  config.cors = {
    credentials: true,
    origin: 'http://localhost:3000',
    allowMethods: 'GET, HEAD, PUT, POST, PATCH, DELETE'
  }

  // mongoDB数据库
  config.mongoose = {
    url: 'mongodb://47.94.3.149:27017/admin', // 对应 adminMongo的地址 mongodb://47.94.3.149:27017/admin。[admin是数据库，users是数据表]
    options: {}
  }

  // redis内存数据库 管理存储 token
  config.redis = {
    client: {
      port: 6000,
      host: '47.94.3.149',
      password: 'buleak',
      db: 0
    }
  }

  // jwt token登录鉴权
  config.jwt = {
    secret: '[XXXXX]' // 加密条件字符串
  }

  // socket.io
  config.io = {
    init: {}, // socket.io默认使用 ws引擎
    generateId: () => { //按照自己的规则为每一个 socket 生成唯一ID
      return `QAQ${Math.random()}_${new Date().getTime()}`
    },
    namespace: { // 命名空间
      // 对每一次 socket 连接的建立/断开、每一次消息/数据传递进行预处理
      '/': { 
        connectionMiddleware: [], //['auth']
        packetMiddleware: [],
      },
      '/chat': { 
        connectionMiddleware: [],
        packetMiddleware: [],
      },
      '/example': {
        connectionMiddleware: [],
        packetMiddleware: [],
      }
    }
  }

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
