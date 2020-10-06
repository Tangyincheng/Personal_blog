'use strict';

const Controller = require('egg').Controller;

class ArticleTypeController extends Controller {

  // 添加文章分类
  async addArticleType() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.insert('type', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }

  async upDateArticleType() {
    let tmpArticleType = this.ctx.request.body;
    // tmpArticle.
    const result = await this.app.mysql.update('type', tmpArticleType);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isScuccess: insertSuccess,
    }
  }

  // 删除文章分类
  async delArticleType() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete('type', { 'Id': id })
    this.ctx.body = { data: res }
  }


}

module.exports = ArticleTypeController;