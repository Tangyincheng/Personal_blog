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

  // 添加事件
  async addBlogEvent() {
    const tmpArticleType = this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('blog_event', tmpArticleType)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    }
  }

  // 修改事件
  async upDateBlogEvent() {
    const tmpArticleType = this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.update('blog_event', tmpArticleType)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
    }
  }

  // 删除事件
  async delBlogEvent() {
    const id = this.ctx.params.id
    const res = await this.app.mysql.delete('blog_event', { id })
    this.ctx.body = { data: res }
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

  // 添加链接
  async addFrindLink() {
    const tmpArticleType = this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('friends_link', tmpArticleType)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    }
  }

  // 修改链接
  async updateFrindLink() {
    const tmpArticleType = this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.update('friends_link', tmpArticleType)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
    }
  }

  // 删除链接
  async deleteFindLink() {
    const id = this.ctx.params.id
    const res = await this.app.mysql.delete('friends_link', { id })
    this.ctx.body = { data: res }
  }

  // blog  icon
  async getBlogIcon() {
    const resType = await this.app.mysql.select('blog_icon')
    for (const i in resType) {
      resType[i].key = resType[i].id
    }
    this.ctx.body = { code: 1, data: resType }
  }

  // blog  icon
  async updataBlogIcon() {
    const tmpBlogIconType = this.ctx.request.body
    // console.log('--------------', tmpBlogIconType)
    const result = await this.app.mysql.update('blog_icon', tmpBlogIconType)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    }
  }
}

module.exports = BlogConfigController
