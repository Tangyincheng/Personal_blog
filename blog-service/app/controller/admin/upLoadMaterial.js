/*
 * @Description: 素材上传API
 * @Author: yctang
 */

const path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

const Controller = require('egg').Controller;

class upLoadMaterial extends Controller {

  // 素材上传
  async upLoadMaterial() {
    console.log('11111111111111')
    // 获取文件流
    const stream = await this.ctx.getFileStream();
    // 目标文件
    const target = path.join(__dirname, '../../../material', stream.filename);
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      // 自定义方法
      this.error(err);
    }
    console.log('stream', stream);
    // let id = this.ctx.params.id;
    // const res = await this.app.mysql.delete('friends_link', { 'id': id })
    this.ctx.body = { data: 'ok' }
  }
}

module.exports = upLoadMaterial;