/*
 * @Description: 作者组件
 * @Author: yctang
 */
import { Avatar, Divider, Tooltip } from 'antd'
import { QqOutlined, WechatOutlined } from '@ant-design/icons';
import '../public/style/components/author.css';
// import logo from '../public/logo.jpg';

const Author = () => {

  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src="http://www.yctang.club/static/logo.png" alt="yctang" className="author-logo"/>
      </div>
      <div className="author-introduction">
        <strong className="author-font">The Future Depends on You</strong>
        <Divider>社交账号</Divider>
        {/* <Tooltip title="">
          <Avatar size={28} icon={<GithubOutlined />} className="account" />
        </Tooltip> */}
        <Tooltip title="1069252020" color='#007ca3'>
          <Avatar size={28} icon={<QqOutlined />} className="account" />
        </Tooltip>
        {/* <Tooltip title="TYC1069252020" color='#007ca3'> */}
        <Avatar size={28} icon={<WechatOutlined />} className="accountweixin" />
        {/* </Tooltip> */}
        {/* <div className="qqImg" >
          <img src="http://www.yctang.club/static/QQ.png" className="qqImgContent" />
        </div> */}
        <div className="weixinImg" >
          <img
            src="http://www.yctang.club/static/weixin.jpg"
            className="weixinImgContent"
            alt="yctang"
          />
        </div>
      </div>
    </div>
  )
}

export default Author