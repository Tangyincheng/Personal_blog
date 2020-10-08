/*
 * @Description: admin路由
 * @Author: yctang
 */
module.exports = app => {
  const { router, controller } = app;
  var adminauth = app.middleware.adminauth()
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', controller.admin.main.addArticle);
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', controller.admin.main.getArticleList);
  router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
  router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById);

  // articleType
  router.post('/admin/addArticleType', controller.admin.articleType.addArticleType);
  router.post('/admin/upDateArticleType', controller.admin.articleType.upDateArticleType);
  router.get('/admin/delArticleType/:id', controller.admin.articleType.delArticleType);

  // BlogConfig-博客大事件
  router.get('/admin/getBlogEvent', controller.admin.blogConfig.getBlogEvent); // 查
  router.post('/admin/addBlogEvent', controller.admin.blogConfig.addBlogEvent);// 增
  router.get('/admin/delBlogEvent/:id', controller.admin.blogConfig.delBlogEvent); // 删
  router.post('/admin/upDateBlogEvent', controller.admin.blogConfig.upDateBlogEvent); // 改

  // // BlogConfig-友情链接
  router.get('/admin/getFrindsLink', controller.admin.blogConfig.getFrindsLink); // 查
  router.post('/admin/addFrindLink', controller.admin.blogConfig.addFrindLink);// 增
  router.get('/admin/deleteFindLink/:id', controller.admin.blogConfig.deleteFindLink); // 删
  router.post('/admin/updateFrindLink', controller.admin.blogConfig.updateFrindLink); // 改
}