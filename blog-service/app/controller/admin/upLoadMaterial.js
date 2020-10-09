/*
 * @Description: 素材上传API
 * @Author: yctang
 */

const path = require('path');
const fs = require('fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const mkdirp = require('mkdirp');

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

    let insertSuccess = false;
    let insertId

    console.log('typeName', typeName)
    // 获取文件流
    const stream = await this.ctx.getFileStream();
    // 目标文件
    const target = path.join(path.resolve(), `../image/${typeName}`, stream.filename);
    // 不存在就创建目录
    await mkdirp(target);

    const writeStream = fs.createWriteStream(target);
    try {
      // console.log('target.split()[1]', target.split('image/')[1])
      const material = {
        material_link: `http://www.yctang.club:8001/${target.split('image/')[1]}`,
        material_type: typeName,
        material_name: stream.filename
      }
      const result = await this.app.mysql.insert('blog_material', material);
      console.log('result', result)
      insertSuccess = result.affectedRows === 1;
      insertId = result.insertId;
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));

      // const material_link = `http://www.yctang.club:8001/${target.split('image/')[1]}`;
      // const material_type = typeName;
      // const material_name = stream.filename;


      // this.ctx.body = {
      //   code: 1,
      //   // isScuccess: insertSuccess,
      //   // insertId: insertId
      // }
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      // 自定义方法
      throw new Error('--------------------------------',err);

    }
    this.ctx.body = {
      // code: 1,
      isScuccess: insertSuccess,
      insertId: insertId
    }
  }
}

module.exports = upLoadMaterial;