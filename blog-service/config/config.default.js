/*
 * @Description:
 * @Author: tangyincheng
 */
/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {})

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591337490989_9917'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'host',
      // port
      port: 'port',
      // username
      user: 'user',
      // password
      password: 'password',
      // database
      database: 'database',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  }

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:3000', 'http://localhost:8000'],
    // domainWhiteList: ['http://www.tangyincheng.com', 'http://www.tangyincheng.com:81'],
    // domainWhiteList: ['http://114.117.209.134', 'http://114.117.209.134:81'],
  }

  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true, // 允许Cook跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }

  return {
    ...config,
    ...userConfig,
  }
}
