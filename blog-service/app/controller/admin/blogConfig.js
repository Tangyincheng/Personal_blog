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

  // 添加事件
  async addBlogEvent() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('blog_event', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }

  // 修改事件
  async upDateBlogEvent() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.update('blog_event', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
    }
  }

  // 删除事件
  async delBlogEvent() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('blog_event', { 'id': id })
    this.ctx.body = { data: res }
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

  // 添加链接
  async addFrindLink() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('friends_link', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }

  // 修改链接
  async updateFrindLink() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.update('friends_link', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
    }
  }

  // 删除链接
  async deleteFindLink() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('friends_link', { 'id': id })
    this.ctx.body = { data: res }
  }
}

module.exports = BlogConfigController;