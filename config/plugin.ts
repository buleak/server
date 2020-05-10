import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: { // 解决跨域问题
    enable: true,
    package: 'egg-cors'
  },
  snowflake: { // 生成唯一标识 
    enable: true,
    package: 'egg-snowflake'
  },
  mongoose: { // mongodb数据库
    enable: true,
    package: 'egg-mongoose'
  },
  jwt: { // [jsonWebToken]生成 token
    enable: true,
    package: 'egg-jwt'
  },
  redis: { // redis内存数据库，读写速度快于一般数据库
    enable: true,
    package: 'egg-redis'
  },
  io: { // socket.io
    enable: true,
    package: 'egg-socket.io'
  }
};

export default plugin;
