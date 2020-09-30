//  let ipUrl = 'http://www.yctang.club:7001/admin/';
//  let ipUrlDefault = 'http://www.yctang.club:7001/default/';
let ipUrl = 'http://localhost:7001/admin/';
let ipUrlDefault = 'http://localhost:7001/default/';


let servicePath = {
  checkLogin: ipUrl + 'checkLogin',  //  检查用户登录
  getTypeInfo: ipUrl + 'getTypeInfo',  //  获得文章类别信息
  addArticle: ipUrl + 'addArticle',  //  添加文章
  updateArticle: ipUrl + 'updateArticle',  //  修改文章第api地址
  getArticleList: ipUrl + 'getArticleList',  //  文章列表
  delArticle: ipUrl + 'delArticle/',  //  删除文章
  getArticleById: ipUrl + 'getArticleById/',  //  根据ID获得文章详情

  getBlogCountNum: ipUrlDefault + 'getBlogCountNum'    // 博客文章信息统计
}

export default servicePath;