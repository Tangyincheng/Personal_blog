/*
 * @Description: admin路由
 * @Author: tangyincheng
 */
module.exports = (app) => {
  const { router, controller } = app
  const adminauth = app.middleware.adminauth()
  router.get('/admin/index', controller.admin.main.index)
  router.post('/admin/checkLogin', controller.admin.main.checkLogin)
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo)
  router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)
  router.get('/admin/getArticleList/:currentPage/:pageSize', adminauth, controller.admin.main.getArticleList)
  router.get('/admin/delArticle/:id', adminauth, controller.admin.main.delArticle)
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById)

  // articleType
  router.post('/admin/addArticleType', adminauth, controller.admin.articleType.addArticleType)
  router.post('/admin/upDateArticleType', adminauth, controller.admin.articleType.upDateArticleType)
  router.get('/admin/delArticleType/:id', adminauth, controller.admin.articleType.delArticleType)

  // BlogConfig-博客大事件
  router.get('/admin/getBlogEvent', adminauth, controller.admin.blogConfig.getBlogEvent) // 查
  router.post('/admin/addBlogEvent', adminauth, controller.admin.blogConfig.addBlogEvent) // 增
  router.get('/admin/delBlogEvent/:id', adminauth, controller.admin.blogConfig.delBlogEvent) // 删
  router.post('/admin/upDateBlogEvent', adminauth, controller.admin.blogConfig.upDateBlogEvent) // 改

  // BlogConfig-友情链接
  router.get('/admin/getFrindsLink', adminauth, controller.admin.blogConfig.getFrindsLink) // 查
  router.post('/admin/addFrindLink', adminauth, controller.admin.blogConfig.addFrindLink) // 增
  router.get('/admin/deleteFindLink/:id', adminauth, controller.admin.blogConfig.deleteFindLink) // 删
  router.post('/admin/updateFrindLink', adminauth, controller.admin.blogConfig.updateFrindLink) // 改

  // BlogConfig-素材
  router.get('/admin/getBlogMaterial/:currentPage/:pageSize', adminauth, controller.admin.upLoadMaterial.getBlogMaterial) // 查
  router.post('/admin/upLoadMaterial', adminauth, controller.admin.upLoadMaterial.upLoadMaterial) // 增
  router.get('/admin/deleteBlogMaterial/:id', adminauth, controller.admin.upLoadMaterial.deleteBlogMaterial) // 删

  // blog_icon
  router.get('/admin/getBlogIcon', adminauth, controller.admin.blogConfig.getBlogIcon) // 查
  router.post('/admin/updataBlogIcon', adminauth, controller.admin.blogConfig.updataBlogIcon) // 改
}
