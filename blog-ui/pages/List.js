import React, { useState, useEffect } from 'react'
import Head from 'next/head'
// import Link from 'next/link'
import Router from 'next/router'
import { Row, Col, List, Affix, Breadcrumb, Spin, Pagination } from 'antd'
import { CalendarOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'
import classNames from 'classnames'
import { withRouter } from 'next/router'

import Header from '../components/Header'
import Author from '../components/Author'
// import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ArticleType from '../components/ArticleType'
import '../public/style/pages/index.css'
// import watch from '../components/watch'

import servicePath from '../config/apiUrl'

const myList = (list) => {
  const { type: typeName, loading: loadingProps, id: typeId } = list.router.query
  const top = 0
  const advert = 54
  const pageSize = 10
  const [toplist, settoplist] = useState([])
  const [mylist, setMylist] = useState()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(1)

  // const loadingProps = list.router.query.loading;
  const propleNum = classNames({
    propleFire: true,
  })

  const onChange = (value) => {
    axios(`${servicePath.getListById + typeId}/${value}/${pageSize}`).then((res) => {
      setMylist(res.data.data)
      setTotal(list.total_count)
    })
  }

  useEffect(() => {
    setMylist(list.data)
    setTotal(list.total_count)
  }, [list.data])

  useEffect(() => {
    axios(servicePath.getListTopById + typeId).then((res) => settoplist(res.data.data))
  }, [typeId])

  // useEffect(() => {
  //   document && document?.removeEventListener('mousedown')
  // }, [])

  // useEffect(() => {
  //   watch()
  // }, [])

  const onGoToDetail = (id) => {
    Router.push({
      pathname: '/detailed',
      query: { id: id }
    })
  }

  return (
    <div className="container">
      <Head>
        <title>首页 | tangyincheng-The Future Depends on You</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="tangyincheng" />
        <meta name="description" content="首页 | tangyincheng-The Future Depends on You" />
        <meta name="robots" content="all" />
        <meta name="author" content="tangyincheng" />
        <meta name="google-site-verification" content="b7XdkZDn_li_SpxcgFM9oQLFUhVjXw6fqu_r84jo9wY" />
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={top}>
        <Header />
      </Affix>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={18} lg={18} xl={18}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/" style={{ color: '#007ca3' }} onClick={() => setLoading(true)}>
                  首页
                </a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
              {/* <Breadcrumb.Item>{}</Breadcrumb.Item> */}
            </Breadcrumb>
          </div>
          {/* 置顶列表 */}
          {toplist.length > 0 && (
            <div>
              <List
                itemLayout="vertical"
                dataSource={toplist}
                renderItem={(item, index) => (
                  <List.Item key={index} className="article-top-item">
                    <Spin tip="加载中..." spinning={loading}>
                      <div onClick={() => { onGoToDetail(item.id) }}>
                        <div className="list-title" onClick={() => setLoading(true)}>
                          <div className="list-top">置顶</div>
                          {/* <Link href={{ pathname: '/detailed', query: { id: item.id } }}> */}
                          <span style={{ color: '#007ca3', fontWeight: 'bold' }}>{item.title}</span>
                          {/* </Link> */}
                        </div>
                        <div className="list-icon">
                          <span>
                            <CalendarOutlined />
                            {item.addTime.split(' ')[0]}
                          </span>
                          <span>
                            <CalendarOutlined />
                            {item.typeName}
                          </span>
                          <span className={propleNum}>
                            <FireOutlined />
                            {item.view_count}人
                          </span>
                        </div>
                        <div className="list-context">{item.introduce}</div>
                      </div>
                    </Spin>
                  </List.Item>
                )}
              />
              {/* <div className="split-line"></div> */}
            </div>
          )}
          {/* <canvas id = "mycanvas" width = "250" height = "500" ></canvas> */}
          <List
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item, index) => (
              <List.Item key={index} className="article-item">
                <Spin tip="加载中..." spinning={loading}>
                  <div onClick={() => { onGoToDetail(item.id) }}>
                    <div className="list-title" onClick={() => setLoading(true)}>
                      {/* <Link href={{ pathname: '/detailed', query: { id: item.id } }}> */}
                      <span style={{ color: '#007ca3', fontWeight: 'bold' }}>{item.title}</span>
                      {/* </Link> */}
                    </div>
                    <div className="list-icon">
                      <span>
                        <CalendarOutlined />
                        {item.addTime.split(' ')[0]}
                      </span>
                      <span>
                        <CalendarOutlined />
                        {item.typeName}
                      </span>
                      <span className={propleNum}>
                        <FireOutlined />
                        {item.view_count}人
                      </span>
                    </div>
                    <div className="list-context">{item.introduce}</div>
                    {/* {
                  index < mylist.length - 1 &&
                  <div style={{ border: '1px solid #eee' }} />
                  } */}
                    {/* <div style={{border: '1px solid #eee'}} /> */}
                  </div>
                </Spin>
              </List.Item>
            )}
          />
          {total > 10 && (
            <div className="list-content">
              <Pagination defaultCurrent={1} total={total} onChange={onChange} />
            </div>
          )}
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
    </div>
  )
}

myList.getInitialProps = async (context) => {
  let id = context.query.id
  const currentPage = 1
  const pageSize = 10
  // console.log('context', context)

  const promise = new Promise((resolve) => {
    axios(`${servicePath.getListById + id}/${currentPage}/${pageSize}`).then((res) => resolve(res.data))
  })
  return await promise
}

export default withRouter(myList)
