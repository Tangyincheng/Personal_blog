/*
 * @Description: 博客配置API
 * @Author: yctang
 */

const Controller = require('egg').Controller;

class BlogConfigController extends Controller {

  // 博客大事件
  async getBlogEvent() {
    let resType = await this.app.mysql.select('blog_event', {
      orders: [['id']]
    })
    for (let i in resType) {
      resType[i].key = resType[i].id;
    }
    this.ctx.body = { data: resType }
  }

  // 友情链接
  async getFrindsLink() {
    let resType = await this.app.mysql.select('friends_link', {
      orders: [['id']]
    })
    for (let i in resType) {
      resType[i].key = resType[i].id;
    }
    this.ctx.body = { data: resType }
  }
}

module.exports = BlogConfigController;