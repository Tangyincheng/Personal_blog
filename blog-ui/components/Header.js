/*
 * @Description:
 * @Author: tangyincheng
 */
import React, { useState, useEffect } from 'react'

import { Row, Col } from 'antd'
import { createFromIconfontCN, LeftOutlined, RightOutlined } from '@ant-design/icons'

import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

import '../public/style/components/header.css'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  const [iconLink, setIconLink] = useState('')

  useEffect(() => {
    const fetchIconData = async () => {
      const result = await axios(servicePath.getBlogIcon).then((res) => {
        return res.data.data[0].icon_link
      })
      setIconLink(result)
    }

    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data
      })
      setNavArray(result)
    }
    fetchIconData()
    fetchData()
  }, [])

  //跳转到列表页
  const handleClick = (e) => {
    if (e.Id == 0) {
      Router.push('/')
    } else {
      Router.push('/List?id=' + e.Id + '&type=' + e.typeName)
    }
  }

  const MyIcon = createFromIconfontCN({
    scriptUrl: iconLink, // 在 iconfont.cn 上生成
  })

  return (
    <div className="header">
      <div className="header-content">
        <Row type="flex" justify="center">
          <Col xs={24} sm={24} md={18} lg={12} xl={12} style={{ position: 'relative' }}>
            <Link href={{ pathname: '/' }}>
              <img src="http://114.117.209.134/static/header.png" style={{ width: '100px' }} />
              {/* <span className="header-logo"><strong>tangyincheng</strong></span> */}
            </Link>
            <span className="header-txt">
              <strong className="header-font">The Future Depends on You</strong>
            </span>
          </Col>
          <Col xs={0} sm={0} md={6} lg={12} xl={12}>
            <div className="my_resume">{/* <Link href={{ pathname: '/myResume' }}>
                <span>我的简历</span>
              </Link> */}</div>
          </Col>
        </Row>

        <Row justify={'space-around'}>
          <Col xs={24} sm={24} md={0} lg={0} xl={0}>
            <div className="headerItem">
              <ul className="NavBar">
                <li className="NavBarItemleft">
                  <LeftOutlined />
                </li>
                {navArray.map((item) => {
                  return (
                    <li
                      onClick={() => {
                        handleClick(item)
                      }}
                      key={item.Id}
                      xs={6}
                      sm={4}
                      className="NavBarItem"
                    >
                      <MyIcon type={item.icon} />
                      {item.typeName}
                    </li>
                  )
                })}
                <li className="NavBarItemright">
                  <RightOutlined />
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Header
