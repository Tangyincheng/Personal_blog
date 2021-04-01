/*
 * @Description: 博客详情
 * @Author: tangyincheng
 */
import React, { useState, useEffect } from 'react'
import cookies from 'next-cookies'
import Head from 'next/head'
import { Row, Col, Icon, Breadcrumb, Affix, BackTop, Spin } from 'antd'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { CalendarOutlined, FolderOpenOutlined, FireOutlined } from '@ant-design/icons'

import Counter from '../utils/counter'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import ArticleType from '../components/ArticleType'
import '../public/style/pages/detailed.css'

import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

const Detailed = (props) => {
  // console.log('props', props)
  const [top, setTop] = useState(0)
  const [loading, setLoading] = useState(false)
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  let count = cookies(props) || '' // 用户是否第一次进入

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}"href="#${anchor}" class="ahchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true, // 允许 Git Hub标准的markdown
    pedantic: true, // 尽可能地兼容 markdown.pl的晦涩部分。
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法。该选项要求 gfm 为true
    breaks: false, // 允许回车换行。该选项要求 gfm 为true。
    smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉。
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    },
  })

  let html = marked(props.article_content)

  // 计算访问量
  useEffect(() => {
    let exp = new Date()
    exp.setTime(exp.getTime() + 2 * 60 * 60 * 1000) //过期时间 2 小时
    if (!count) {
      Counter({ view: props.view_count, id: props.id })
      document.cookie = `count-${props.id}=${props.id};expires=${exp.toGMTString()}`
    } else if (count) {
      if (!count[`count-${props.id}`]) {
        Counter({ view: props.view_count, id: props.id })
        document.cookie = `count-${props.id}=${props.id};expires=${exp.toGMTString()}`
      }
    }
  }, [])
  return (
    <>
      <Head>
        <title>tangyincheng-{props.title}</title>
        <meta charSet="UTF-8" />
        <meta name="keywords" content="tangyincheng" />
        <meta name="description" content={props.title} />
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
          <div>
            <Spin tip="加载中..." spinning={loading}>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <a href="/" style={{ color: '#007ca3' }} onClick={() => setLoading(true)}>
                      首页
                    </a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <div className="detailed-title">{props.title}</div>
                <div className="list-icon center">
                  <span>
                    <CalendarOutlined />
                    上次更新时间：{props.addTime.split(' ')[0]}
                  </span>
                  <span>
                    <FolderOpenOutlined /> 文章分类：{props.typeName}
                  </span>
                  <span>
                    <FireOutlined /> 阅读人数：{props.view_count}人
                  </span>
                </div>
                <div className="detailed-content" dangerouslySetInnerHTML={{ __html: html }} />
                <BackTop style={{ zIndex: '999' }} />
              </div>
            </Spin>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={6} lg={6} xl={6}>
          <Author />
          <ArticleType />
          {/* <Advert /> */}
          <Affix offsetTop={54}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">
                <strong>文章目录</strong>
              </div>
              {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

Detailed.getInitialProps = async (context) => {
  // console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById + id).then((res) => {
      resolve(res.data.data[0])
    })
  })

  return await promise
}

export default Detailed
