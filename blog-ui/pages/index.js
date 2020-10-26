import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Affix, Spin } from 'antd';
import { CalendarOutlined, FireOutlined } from '@ant-design/icons';
import axios from 'axios';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Header from '../components/Header';
import Author from '../components/Author';
import Advert from '../components/Advert';
import Footer from '../components/Footer';
import ArticleType from '../components/ArticleType';
import Statistics from '../components/Statistics';
import BlogEvent from '../components/BlogEvent';
import FriendsLink from '../components/FriendsLink';
import Quotes from '../components/Quotes';

import '../public/style/pages/index.css';

import servicePath from '../config/apiUrl'

const Home = (list) => {

  const [mylist, setMylist] = useState(list.data);

  const [top, setTop] = useState(0);
  const [advert, setAdvert] = useState(54);
  const [loading, setLoading] = useState(false)

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: true,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    < div className="container" >
      <Head>
        <title>首页 | yctang-The Future Depends on You</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="yctang" />
        <meta name="description" content="首页 | yctang-The Future Depends on You" />
        <meta name="robots" content="all" />
        <meta name="author" content="yctang" />
        <meta name="google-site-verification" content="b7XdkZDn_li_SpxcgFM9oQLFUhVjXw6fqu_r84jo9wY" />
        <link rel="icon" href="../static/favicon.ico" mce_href="../static/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={top}>
        <Header />
      </Affix>

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={23} sm={23} md={18} lg={18} xl={18}>

          <List
            header={<div style={{ marginLeft: '.5rem' }}><strong>最新文章</strong></div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <Spin tip="加载中..." spinning={loading}>
                  <div className="list-title" onClick={() => setLoading(true)}>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a style={{ color: '#007ca3' }}>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined />{item.addTime.split(' ')[0]}</span>
                    <span><CalendarOutlined />{item.typeName}</span>
                    <span><FireOutlined />{item.view_count}人</span>
                  </div>
                  <div className="list-context" dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
                  {/* <Divider /> */}
                  {/* {
                    index < mylist.length - 1 &&
                    <div style={{ border: '1px solid #eee' }} />
                  } */}
                </Spin>
              </List.Item>
            )}
          />
          {/* </Spin> */}
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={6}>
          <Author />
          <Statistics />

          {/* <Quotes /> */}

          <Affix offsetTop={advert}>
            {/* <Advert /> */}
            <ArticleType />
            <BlogEvent />
            <FriendsLink />
          </Affix>
        </Col>
        <Footer />
      </Row>

    </div >
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home
