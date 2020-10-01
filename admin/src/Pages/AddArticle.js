import React, { useState, useEffect } from 'react';
import marked from 'marked';
// import hljs from "highlight.js";
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';
import axios from 'axios';

import servicePath from '../config/apiUrl';
import '../static/css/AddArticle.css';

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState("请选择文章类别") //选择的文章类别

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  // marked.setOptions({
  //   renderer: renderer,
  //   gfm: true,          // 允许 Git Hub标准的markdown
  //   pedantic: true,     // 尽可能地兼容 markdown.pl的晦涩部分。
  //   sanitize: false,    // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  //   tables: true,       // 允许支持表格语法。该选项要求 gfm 为true
  //   breaks: false,      // 允许回车换行。该选项要求 gfm 为true。
  //   smartLists: true,   // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉。
  //   smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号
  //   highlight: function (code) {
  //     return hljs.highlightAuto(code).value
  //   }
  // })

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  //从中台得到文章类别信息
  const getTypeInfo = () => {

    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          sessionStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }

      }
    )
  }

  //选择类别
  const selectTypeHandler = (value) => {
    setSelectType(value)
  }

  // 保存文章
  const saveArticle = () => {
    if (!selectedType) {
      message.error('必须选择文章类别')
      return false
    } else if (!articleTitle) {
      message.error('文章名称不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }
    // message.success('检验通过')
    let dataProps = {};   //传递到接口的参数
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    let datetext = showDate.replace('-', '/'); //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000;
    if (articleId === 0) {
      // console.log('articleId=:' + articleId);
      dataProps.view_count = 1;
      axios({
        method: 'post',
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          setArticleId(res.data.insertId);
          if (res.data.isScuccess) {
            message.success('文章添加成功');
          } else {
            message.error('文章添加失败');
          }
        }
      )
    } else {
      // console.log('articleId:' + articleId)
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servicePath.updateArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.isScuccess) {
            message.success('文章保存成功')
          } else {
            message.error('保存失败');
          }
        }
      )
    }
  }

  const getArticleById = (id) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        //let articleInfo= res.data.data[0]
        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroducehtml(tmpInt)
        setShowDate(res.data.data[0].addTime)
        setSelectType(res.data.data[0].typeId)
      }
    )
  }

  useEffect(() => {
    getTypeInfo()
    // 获取文章id
    let tempId = props.match.params.id;
    if (tempId) {
      setArticleId(tempId);
      getArticleById(tempId);
    }
  }, [])

  return (
    <div>
      <Row gutter={5}>
        <Col span={24}>
          <Row gutter={10} >
            <Col span={12}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={(e) => { setArticleTitle(e.target.value) }}
              />
            </Col>
            <Col span={6}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={(value) => selectTypeHandler(value)} style={{ minWidth: '200px' }}>
                {
                  typeInfo.map((item, index) => {
                    return (
                      <Option value={item.Id} key={index}>{item.typeName}</Option>
                    )
                  })
                }
              </Select>
            </Col>
            <Col span={6}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br />
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={24}>
              <Row>
                <Col span={16}>
                  <Col>
                    <Row gutter={10}>
                      <Col span={12}>
                        <TextArea
                          rows={4}
                          value={introducemd}
                          onChange={changeIntroduce}
                          onPressEnter={changeIntroduce}
                          placeholder="文章简介"
                        />
                      </Col>
                      <Col span={12}>
                        <div className="introduce-html" dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} />
                      </Col>
                    </Row>
                  </Col>
                  {/* <br /> */}
                </Col>
                <Col span={2} />
                <Col span={6}>
                  <div className="date-select">
                    <DatePicker
                      placeholder="发布日期"
                      size="large"
                      onChange={(date, dateString) => { setShowDate(dateString) }}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={10}>
              <TextArea
                value={articleContent}
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容"
              />
            </Col>
            <Col span={14}>
              <div className="show-html" dangerouslySetInnerHTML={{ __html: markdownContent }} />
            </Col>
          </Row>
        </Col>

      </Row>
    </div>
  )
}

export default AddArticle