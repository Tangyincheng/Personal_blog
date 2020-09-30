import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import axios from 'axios';

import '../static/css/Login.css';
import servicePath from '../config/apiUrl';
import useKeyPress from '../hooks/useKeyPress'

function Login(props) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const CheckLogin = () => {
    setIsLoading(true)
    if (!userName) {
      message.error('用户名不能为空');
      setTimeout(() => { setIsLoading(false) }, 500);
      return;
    }
    if (!password) {
      message.error('密码不能为空');
      setTimeout(() => { setIsLoading(false) }, 500);
      return;
    }
    let dataProps = {
      'userName': userName,
      'password': password
    }
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true
    }).then(
      res => {
        setIsLoading(false)
        // console.log(res)
        if (res.data.data === '登录成功') {
          sessionStorage.setItem('openId', res.data.openId)
          props.history.push('/index')
        } else {
          message.error('用户名密码错误')
        }
      }
    )
  }

  const enterPressed = useKeyPress(13);

  useEffect(() => {
    if (enterPressed) {
      CheckLogin()
    }
  })

  return (
    <div className="login-div">
      <Spin tip="loading..." spinning={isLoading}>
        <Card title="yctang-个人博客后台管理系统" bordered={true} style={{ width: 400 }}>
          <Input
            id="userName"
            size="large"
            placeholder="请输入账号"
            prefix={<UserOutlined />}
            onChange={(e) => { setUserName(e.target.value) }}
          />
          <br />
          <br />
          <Input.Password
            id="passWord"
            size="large"
            placeholder="请输入密码"
            prefix={<KeyOutlined />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={CheckLogin}>登录</Button>
        </Card>
      </Spin>
    </div>
  )
}

export default Login;