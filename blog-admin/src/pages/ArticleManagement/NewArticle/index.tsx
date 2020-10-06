import React, {
  useState,
  useEffect
} from 'react';
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  DatePicker,
  message,
  Card,
} from 'antd';
import marked from 'marked';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';

import styles from './index.less';
import {
  getArticleType,
  addArticle,
  updateArticle,
  getArticleById
} from '@/services/article';
import { typeInfoType } from './data.d';
import { articleType } from '@/services/API.d';
import { isLogin } from '@/utils/utils'

const { Option } = Select;
const { TextArea } = Input;

const NewArticle: React.FC<{}> = (props) => {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState('')            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState('')   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectedType] = useState("请选择文章类别") //选择的文章类别

  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    // tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  // 保存文章
  const saveArticle = (status: number): Boolean => {
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

    let dataProps: articleType = {
      type_id: '',
      title: '',
      introduce: '',
      addTime: 0,
      article_content: '',
      status: 0,
    };   //传递到接口的参数

    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    dataProps.status = status;
    let datetext = showDate.replace('-', '/'); //把字符串转换成时间戳
    dataProps.addTime = (new Date(datetext).getTime()) / 1000;

    if (articleId === 0) {
      dataProps.view_count = 1;
      addArticle(dataProps).then(
        res => {
          setArticleId(res.insertId);
          if (res.isScuccess) {
            message.success('文章添加成功');
            history.push('/article/articleList')  // 跳转至文章列表
          } else {
            message.error('文章添加失败');
          }
        }
      )
    } else {
      dataProps.id = articleId
      updateArticle(dataProps).then(
        res => {
          if (res.isScuccess) {
            message.success('文章保存成功')
            history.push('/article/articleList')  // 跳转至文章列表
          } else {
            message.error('保存失败');
          }
        })
    }
    return true;
  }

  //从中台得到文章类别信息
  const getTypeInfo = () => {
    getArticleType().then(
      res => {
        if(isLogin(res)){
          setTypeInfo(res.data)
        }
        // if (res.data === "没有登录") {
        //   sessionStorage.removeItem('openId')
        //   history.push('/user/login')
        // } else {
        //   setTypeInfo(res.data)
        // }
      })
  }

  //选择类别
  const selectTypeHandler = (value: string) => {
    setSelectedType(value)
  }

  const changeContent = (e: any) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e: any) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  useEffect(() => {
    getTypeInfo()
    // 获取文章id
    let tempId = props.match.params.id;
    if (tempId) {
      setArticleId(tempId);
      getArticleById(tempId).then(
        res => {
          setArticleTitle(res.data[0].title)
          setArticleContent(res.data[0].article_content)
          let html = marked(res.data[0].article_content)
          setMarkdownContent(html)
          setIntroducemd(res.data[0].introduce)
          let tmpInt = marked(res.data[0].introduce)
          setIntroducehtml(tmpInt)
          setShowDate(res.data[0].addTime)
          setSelectedType(res.data[0].typeId)
        });
    }
  }, [])

  return (
    <PageContainer>
      <Card>
        <Row gutter={5}>
          <Col span={24}>
            <Row gutter={10} >
              <Col span={14}>
                <Input
                  placeholder="博客标题"
                  size="large"
                  value={articleTitle}
                  onChange={(e) => { setArticleTitle(e.target.value) }}
                />
              </Col>
              <Col span={5}>
                <Select
                  defaultValue={selectedType}
                  size="large"
                  onChange={(value) => selectTypeHandler(value)}
                  style={{ width: '100%' }}
                >
                  {
                    typeInfo.map((item: typeInfoType, index: number) => {
                      return (
                        <Option value={item.Id} key={index}>{item.typeName}</Option>
                      )
                    })
                  }
                </Select>
              </Col>
              <Col span={5}>
                <Button
                  size="large"
                  onClick={() => saveArticle(0)}
                  style={{ width: '49%' }}
                >
                  暂存文章
                  </Button>&nbsp;
                <Button
                  type="primary"
                  size="large"
                  onClick={() => saveArticle(1)}
                  style={{ width: '49%' }}
                >
                  发布文章
                </Button>
                <br />
              </Col>
            </Row>
            <br />
            <Row gutter={10}>
              <Col span={20}>
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
                    <div className={styles.introduce_html} dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }} />
                  </Col>
                </Row>
              </Col>
              <Col span={3} offset={1}>
                <div className={styles.date_select}>
                  <DatePicker
                    placeholder="发布日期"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(date, dateString: any) => { setShowDate(dateString) }}
                  />
                </div>
              </Col>
            </Row>
            <br />
            <Row gutter={10} >
              <Col span={10}>
                <TextArea
                  value={articleContent}
                  className={styles.markdown_content}
                  rows={35}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  placeholder="文章内容"
                />
              </Col>
              <Col span={14}>
                <div className={styles.show_html} dangerouslySetInnerHTML={{ __html: markdownContent }} />
              </Col>
            </Row>
          </Col>

        </Row>
      </Card>
    </PageContainer>
  )
}

export default NewArticle;