import React, { useState } from 'react';
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { Spin, Card, Input, message, Button } from 'antd';
import { history } from 'umi';
import { AIP_Login } from '@/services/login';

import styles from './style.less';

const Login: React.FC<{}> = () => {
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

    // 接口调用
    AIP_Login(dataProps).then((res) => {
      setIsLoading(false)
      if (res.data === '登录成功') {
        localStorage.setItem('openId', res.openId)
        history.replace('/statistics');
      } else {
        message.error('用户名密码错误')
      }
    })
  }

  return (
    <div className={styles.login_div}>
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
  );
};

export default Login;
