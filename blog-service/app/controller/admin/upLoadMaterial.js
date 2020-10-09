/*
 * @Description: 素材上传API
 * @Author: yctang
 */

const path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const mkdirp = require('mkdirp');
const await = require('await-stream-ready/lib/await');

const Controller = require('egg').Controller;

class upLoadMaterial extends Controller {

  // 素材
  async getBlogMaterial() {
    let resType = await this.app.mysql.select('blog_material', {
      orders: [['id']]
    })
    for (let i in resType) {
      resType[i].key = resType[i].id;
    }
    this.ctx.body = { code: 1, data: resType }
  }

  // 素材上传
  async upLoadMaterial() {
    let typeName = this.ctx.request.url.split("=")[1];

    console.log('typeName', typeName)
    // 获取文件流
    const stream = await this.ctx.getFileStream();
    // 目标文件
    const target = path.join(path.resolve(), `../image/${typeName}`, stream.filename);
    // 不存在就创建目录
    await mkdirp(target);
    
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      // 自定义方法
      // this.error(err);

    }

    this.ctx.body = { data: 'ok' }
  }
}

module.exports = upLoadMaterial;