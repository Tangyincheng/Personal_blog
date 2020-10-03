import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Affix, Breadcrumb, Spin } from 'antd';
import { CalendarOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import classNames from 'classnames';
import { withRouter } from 'next/router'

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ArticleType from '../components/ArticleType';
import '../public/style/pages/index.css';

import servicePath from '../config/apiUrl';

const myList = (list) => {
  const [mylist, setMylist] = useState();
  const [top, setTop] = useState(0);
  const [advert, setAdvert] = useState(54);
  const [loading, setLoading] = useState(false)
  // console.log('mylist', mylist)
  const [navItem, setNavItem] = useState('') // 导航栏
  const id = list.router.query.id;
  const loadingProps = list.router.query.loading;
  const propleNum = classNames({
    'propleFire': true
  })

  useEffect(() => {

    if (id) {
      switch (id) {
        case '1':
          setNavItem('JavaScript')
          break;
        case '2':
          setNavItem('TypeScript')
          break;
        case '3':
          setNavItem('Vue')
          break;
        case '4':
          setNavItem('React')
          break;
        case '5':
          setNavItem('HTML&CSS')
          break;
        case '6':
          setNavItem('小程序')
          break;
        case '7':
          setNavItem('其他')
          break;
        default: break;
      }
    }
  }, [id])

  useEffect(() => { setMylist(list.data) })

  return (
    < div className="container" >
      <Head>
        <title>首页 | yctang-The Future Depends on You</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="yctang" />
        <meta name="description" content="首页 | yctang-The Future Depends on You" />
        <meta name="robots" content="all" />
        <meta name="author" content="yctang" />
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={top}>
        <Header />
      </Affix>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={18} lg={18} xl={18}>

          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/" style={{ color: '#007ca3' }} onClick={() => setLoading(true)}>首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{navItem}</Breadcrumb.Item>
              {/* <Breadcrumb.Item>{}</Breadcrumb.Item> */}
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Spin tip="加载中..." spinning={loading}>
                  <div className="list-title" onClick={() => setLoading(true)}>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.addTime.split(' ')[0]}</span>
                    <span><CalendarOutlined />{item.typeName}</span>
                    <span className={propleNum}><FireOutlined />{item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                  {/* {
                  index < mylist.length - 1 &&
                  <div style={{ border: '1px solid #eee' }} />
                  } */}
                  {/* <div style={{border: '1px solid #eee'}} /> */}
                </Spin>
              </List.Item>
            )}
          />

        </Col>
        <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={6}>
          <Author />

          <Affix offsetTop={advert}>
            {/* <Advert /> */}
            <ArticleType loading={loadingProps} />
          </Affix>
        </Col>
        <Footer />
      </Row>

    </div >
  )
}

myList.getInitialProps = async (context) => {
  let id = context.query.id;
  // console.log('context', context)

  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      res => resolve(res.data)
    )
  })
  return await promise
}

export default withRouter(myList)
