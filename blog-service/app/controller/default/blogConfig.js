/*
 * @Description: 博客配置API
 * @Author: tangyincheng
 */

const Controller = require('egg').Controller

class BlogConfigController extends Controller {
  // 博客大事件
  async getBlogEvent() {
    const resType = await this.app.mysql.select('blog_event', {
      orders: [['id']],
    })
    for (const i in resType) {
      resType[i].key = resType[i].id
    }
    this.ctx.body = { data: resType }
  }

  // 友情链接
  async getFrindsLink() {
    const resType = await this.app.mysql.select('friends_link', {
      orders: [['id']],
    })
    for (const i in resType) {
      resType[i].key = resType[i].id
    }
    this.ctx.body = { data: resType }
  }

  // blog  icon
  async getBlogIcon() {
    const resType = await this.app.mysql.select('blog_icon')
    for (const i in resType) {
      resType[i].key = resType[i].id
    }
    this.ctx.body = { code: 1, data: resType }
  }
}

module.exports = BlogConfigController
