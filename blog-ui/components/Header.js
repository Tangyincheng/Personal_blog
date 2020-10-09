/*
 * @Description: 
 * @Author: yctang
 */
import React, { useState, useEffect } from 'react';

import { Row, Col } from 'antd';
import { createFromIconfontCN, LeftOutlined, RightOutlined } from '@ant-design/icons';

import Router from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import servicePath from '../config/apiUrl';

import '../public/style/components/header.css';

const Header = () => {

  const [navArray, setNavArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          return res.data.data;
        }
      )
      setNavArray(result);
    }
    fetchData();
  }, [])

  //跳转到列表页
  const handleClick = (e) => {
    if (e.Id == 0) {
      Router.push('/');
    } else {
      Router.push('/List?id=' + e.Id + '&type=' + e.typeName);
    }
  }

  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1950182_4y2sddv63yx.js', // 在 iconfont.cn 上生成
  });

  return (
    <div className="header">
      <div className="header-content">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={18} lg={12} xl={12} style={{ position: 'relative' }}>
            <Link href={{ pathname: '/' }}>
              <img src="http://www.yctang.club/static/header.png" style={{ width: '100px' }} />
              {/* <span className="header-logo"><strong>yctang</strong></span> */}
            </Link>
            <span className="header-txt"><strong className="header-font">The Future Depends on You</strong></span>
          </Col>
          <Col xs={0} sm={0} md={6} lg={12} xl={12} />
        </Row>

        <Row justify={'space-around'}>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <div className="headerItem">
              <ul className='NavBar'>
                <li className='NavBarItemleft'><LeftOutlined /></li>
                {
                  navArray.map((item) => {
                    return <li onClick={() => { handleClick(item) }} key={item.Id} xs={6} sm={4} className='NavBarItem'>
                      <MyIcon type={item.icon} />
                      {item.typeName}
                    </li>
                  })
                }
                <li className='NavBarItemright'><RightOutlined /></li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div >
  )
}

export default Header;