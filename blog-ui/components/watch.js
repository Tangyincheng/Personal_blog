const watch = () => {
  var cav = document.getElementById("mycanvas");
  var cxt = cav.getContext("2d");

  // beginPath 开始一个新的路径
  // save 保存当前canvas画布状态并放在栈的最上面
  // translate 对canvas坐标系进行整体位移，实际开发常用来改变其它变换方法的变换中心点
  // lineWidth 线宽
  // strokeStyle 设置描边样式
  // fillStyle 填充样式
  // arc 绘制圆弧（圆心x，圆心y，半径r，圆弧开始角度，圆弧结束角度，true 逆时针绘制）
  // stroke 绘制路径
  // fill 路径填充
  // restore 从堆栈的上方弹出存储的canvas状态
  // closePath 闭合路径，把路径最后位置和开始点直线相连，形成闭合区域
  // fillText 填充文字，fillText(文本，横坐标，纵坐标，文本占据最大宽度)
  // rotate 给canvas画布添加旋转矩阵，顺时针方向，单位弧度
  // moveTo 路径绘制的起点
  // lineTo 绘制直线

  const drawClock = () =>  {
    cxt.clearRect(0, 0, 250, 500) // 清除画布 

    var now = new Date()
    let sec = now.getSeconds()
    let min = now.getMinutes()
    let hour = now.getHours()
    hour = hour + min / 60
    hour = hour > 12 ? hour - 12 : hour

    // 画表盘
    cxt.beginPath()
    cxt.strokeStyle = '#999';
    cxt.lineWidth = 1;
    cxt.arc(125, 250, 100, 0, 2 * Math.PI, false)
    cxt.stroke()
    cxt.closePath()

    cxt.beginPath()
    cxt.strokeStyle = '#000';
    cxt.lineWidth = 2;
    cxt.arc(125, 250, 90, 0, 2 * Math.PI, false)
    cxt.stroke()
    cxt.closePath()

    // 画时刻度
    for(var i  =  0; i < 12; i++){
      cxt.beginPath()
      cxt.save()
      cxt.translate(125, 250)
      cxt.lineWidth = 2
      cxt.strokeStyle = '#000'
      cxt.rotate(i * 30 * Math.PI / 180)
      cxt.moveTo(0, -90)
      cxt.lineTo(0, -70)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }

    // 画分刻度
    for(var i  =  0; i < 60; i++){
      cxt.beginPath()
      cxt.save()
      cxt.translate(125,250)
      cxt.lineWidth = 1
      cxt.strokeStyle = 'black'
      cxt.rotate(i * 6 * Math.PI / 180)
      cxt.moveTo(0, -90)
      cxt.lineTo(0, -80)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }

    //表盘数字
    for(var i  =  0; i < 12; i++){
      var num = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2]
      cxt.beginPath()
      cxt.save()
      cxt.translate(120, 255)
      cxt.fillStyle = '#adb5bd'
      cxt.font = "20px 黑体"
      var x = Math.cos(2 * Math.PI / 12 * i) * 60;
      var y = Math.sin(2 * Math.PI / 12 * i) * 60;
      cxt.fillText(num[i], x, y)
      cxt.stroke()
      cxt.restore()
      cxt.closePath()
    }

    // 画时针
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 250)
    cxt.lineWidth = 5
    cxt.strokeStyle = '#000'
    cxt.rotate(30 * hour * Math.PI / 180)
    cxt.moveTo(0, -40)
    cxt.lineTo(0, 10)
    cxt.stroke()
    cxt.restore()
    cxt.closePath()

    // 画分针
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 250)
    cxt.lineWidth = 3
    cxt.strokeStyle = '#000'
    cxt.rotate(min * 6 * Math.PI / 180)
    cxt.moveTo(0, -60)
    cxt.lineTo(0, 17)
    cxt.stroke()
    cxt.restore()
    cxt.closePath()

    // 画秒针
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 250)
    cxt.lineWidth = 1
    cxt.strokeStyle = 'red'
    cxt.rotate(sec * 6 * Math.PI / 180)
    cxt.moveTo(0, -70)
    cxt.lineTo(0, 25)
    cxt.stroke()
    cxt.restore()
    cxt.closePath()

    // 画圆心
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 250)
    cxt.lineWidth = 1
    cxt.strokeStyle = 'red'
    cxt.fillStyle = "#ccc"
    cxt.arc(0, 0, 6, 0, 2 * Math.PI, true)
    cxt.stroke()
    cxt.fill()
    cxt.restore()
    cxt.closePath()

    // 画秒针末端圆圈
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 250)
    cxt.lineWidth = 1
    cxt.strokeStyle = 'red'
    cxt.fillStyle = "#ccc"
    cxt.rotate(sec * 6 * Math.PI / 180)
    cxt.arc(0, -50, 4, 0, 2 * Math.PI, true)
    cxt.stroke()
    cxt.fill()
    cxt.restore()
    cxt.closePath()

    // 表带扣环
    cxt.beginPath()
    cxt.save()
    cxt.translate(125, 150)
    cxt.lineWidth = 4
    cxt.strokeStyle = '#268cae'
    cxt.arc(0, 0, 10, Math.PI, 2 * Math.PI)
    cxt.stroke()
    cxt.restore()
    cxt.closePath()

    // 表带
    cxt.beginPath()
    cxt.moveTo(125, 0)
    cxt.lineTo(125, 140)
    cxt.lineWidth = 2;
    cxt.strokeStyle = "#268cae"
    // cxt.bezierCurveTo(58, 182, 123, 42, 123, 142) // 贝塞尔曲线
    cxt.stroke()
    cxt.restore()
    cxt.closePath()

    // cxt.beginPath()
    // cxt.moveTo(126, 0)
    // cxt.lineTo(126, 140)
    // // cxt.bezierCurveTo(60, 178, 123, 38, 127, 142)
    // cxt.stroke()
    // cxt.restore()
    // cxt.closePath()
  }
  setInterval(drawClock, 1000)
}

export default watch