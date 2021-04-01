/*
 * @Description: 素材上传API
 * @Author: tangyincheng
 */

const path = require('path')
const fs = require('fs')
const awaitWriteStream = require('await-stream-ready').write
const sendToWormhole = require('stream-wormhole')
const mkdirp = require('mkdirp')

const Controller = require('egg').Controller

class upLoadMaterial extends Controller {
  // 素材-查询
  async getBlogMaterial() {
    const currentPage = this.ctx.params.currentPage
    const pageSize = this.ctx.params.pageSize

    // console.log(currentPage, pageSize);

    const totalSQL = 'SELECT COUNT(*) AS material_total FROM blog_material'
    const total = await this.app.mysql.query(totalSQL)

    // console.log(total)

    const sql = `SELECT * FROM blog_material ORDER BY id LIMIT ${pageSize} OFFSET ${pageSize * (currentPage - 1)}`

    const resType = await this.app.mysql.query(sql)
    for (const i in resType) {
      resType[i].key = resType[i].id
    }
    this.ctx.body = {
      code: 1,
      total_count: total[0].material_total,
      currentPage: parseInt(currentPage),
      data: resType,
      total_pages: Math.ceil(total[0].material_total / pageSize),
    }
  }

  // 素材-上传
  async upLoadMaterial() {
    const typeName = this.ctx.request.url.split('=')[1]

    let insertSuccess = false
    let insertId

    console.log('typeName', typeName)
    // 获取文件流
    const stream = await this.ctx.getFileStream()
    // 目标文件夹
    const targetFolder = path.join(path.resolve(), `../image/${typeName}`)
    // 目标文件
    const target = path.join(path.resolve(), `../image/${typeName}`, stream.filename)
    // const target = path.join(__dirname, `../../../material`, stream.filename);
    // 不存在就创建目录
    await mkdirp(targetFolder)

    const writeStream = fs.createWriteStream(target)
    try {
      const material = {
        material_link: `http://www.tangyincheng.com:8001/${target.split('image/')[1]}`,
        material_type: typeName,
        material_name: stream.filename,
      }
      const result = await this.app.mysql.insert('blog_material', material)

      insertSuccess = result.affectedRows === 1
      insertId = result.insertId
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream))
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream)
      // 自定义方法
      throw new Error('--------------------------------', err)
    }
    this.ctx.body = {
      // code: 1,
      isScuccess: insertSuccess,
      insertId,
    }
  }

  // 素材-删除
  async deleteBlogMaterial() {
    const id = this.ctx.params.id
    const res = await this.app.mysql.delete('blog_material', { id })
    this.ctx.body = { data: res }
  }
}

module.exports = upLoadMaterial
