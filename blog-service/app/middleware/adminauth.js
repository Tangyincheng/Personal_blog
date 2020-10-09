module.exports = options => {

  return async function adminauth(ctx, next) {

    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { code: -1, data: '没有登录' }
    }
  }
}