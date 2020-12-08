/*
 * @Description: 首页API
 * @Author: yctang
 */
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // 获取用户表的数据
    let result = await this.app.mysql.get('blog_content', {});
    this.ctx.body = result;
  }

  // 获取文章列表
  async getArticleList() {
    let sql = 'SELECT article.Id as id ,' +
      'article.title as title ,' +
      'article.introduce as introduce ,' +
      "article.addTime as addTime ," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article  LEFT JOIN type ON article.type_id = type.Id WHERE STATUS = 1 ORDER BY UNIX_TIMESTAMP(addTime) DESC, view_count DESC LIMIT 10';

    // let sql = 'SELECT * FROM article';

    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  async getArticleById() {
    //先配置路由的动态传值，然后再接收值
    let id = this.ctx.params.id;

    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "article.addTime as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);
    // console.log('result', result);
    this.ctx.body = { data: result };
  }

  //得到类别名称和编号
  async getTypeInfo() {
    const sql = 'SELECT * FROM type ORDER BY Id ';
    // console.log()
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  //根据类别ID获得文章列表
  async getListById() {
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "article.addTime as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE STATUS = 1 AND type_id=' + id + '  ORDER BY addTime DESC'
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  //根据类别ID获得置顶文章列表
  async getListTopById(){
    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "article.addTime as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE STATUS = 1 AND TOP = 1 AND type_id=' + id + '  ORDER BY addTime DESC'
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  // 更新文章访问量
  async updateArticleView() {
    let data = this.ctx.request.body;
    const row = {
      id: data.id,
      view_count: data.view + 1
    };
    const result = await this.app.mysql.update('article', row);
    this.ctx.body = { data: result };
  }

  //文章分类数量
  async getTypeNum() {
    const sql = 'SELECT type_id, COUNT(CASE WHEN type_id THEN 1 END ) AS num FROM article WHERE STATUS = 1 GROUP BY type_id ';
    // console.log()
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

  //博客文章信息统计
  async getBlogCountNum() {
    const sql = 'SELECT COUNT(*) AS blog_count, SUM(view_count) AS view_count FROM article';
    // console.log()
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }

}
module.exports = HomeController;