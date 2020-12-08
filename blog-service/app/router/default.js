/*
 * @Description: 首页路由
 * @Author: yctang
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  router.get('/default/getListById/:id', controller.default.home.getListById);
  router.get('/default/getListTopById/:id', controller.default.home.getListTopById);
  router.get('/default/getTypeNum', controller.default.home.getTypeNum);
  router.get('/default/getBlogCountNum', controller.default.home.getBlogCountNum);
  router.post('/default/updateArticleView', controller.default.home.updateArticleView);

  router.get('/default/getBlogEvent', controller.default.blogConfig.getBlogEvent);
  router.get('/default/getFrindsLink', controller.default.blogConfig.getFrindsLink);

  router.get('/default/getBlogIcon', controller.default.blogConfig.getBlogIcon);
}