import React, { useState, useEffect } from 'react';
import { Modal, message, Button, Table } from 'antd';
import axios from 'axios';
import moment from 'moment';

import servicePath from '../config/apiUrl';
import '../static/css/ArticleList.css';

const { confirm } = Modal;

function ArticleList(props) {

  const [list, setList] = useState([]);

  const articleColumns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '40%'
    },
    {
      title: '类别',
      dataIndex: 'typeName',
      key: 'typeName',
      sorter: (a, b) => a.typeName.length - b.typeName.length
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
      sorter: (a, b) => moment(a.addTime) - moment(b.addTime)
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
      key: 'view_count',
      sorter: (a, b) => a.view_count - b.view_count
    },
    {
      title: '操作',
      render: (item) => (
        <>
          <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>&nbsp;
          <Button onClick={() => { delArticle(item.id) }}>删除 </Button>
        </>
      )
    },
  ];

  //得到文章列表
  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        let data = res.data.list
        for (let i in data) {
          data[i].key = data[i].id
        }
        setList(data)
      }
    )
  }

  //删除文章的方法
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
      onOk() {
        axios(servicePath.delArticle + id, { withCredentials: true }).then(
          res => {
            message.success('文章删除成功')
            getList()
          }
        )
      },
      onCancel() {
        message.success('没有任何改变')
      },
    });
  }

  //修改文章
  const updateArticle = (id, checked) => {
    props.history.push('/index/add/' + id)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <Table
        columns={articleColumns}
        dataSource={list}
      />
    </div>
  )

}

export default ArticleList;