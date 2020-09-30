import React, { useState, useEffect } from 'react';
import { Table, Divider } from 'antd';
import axios from 'axios';

function LeaveMessage() {

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      content: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      content: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '昵称',
      dataIndex: 'name',
      key: 'name',
      width: '15%'
    }, {
      title: '评论内容',
      dataIndex: 'content',
      key: 'content',
      width: '70%',
      align: 'center'
    }, {
      title: 'Action',
      key: 'x',
      width: '15%',
      render: (item) => (
        <>
          <a onClick={() => deleteLeaveMessage(item.key)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => replyLeaveMessage(item.key)}>回复</a>
        </>
      ),
    }
  ]

  const deleteLeaveMessage = (e) => {
    console.log(e)
  }

  const replyLeaveMessage = (e) => {
    console.log(e)
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default LeaveMessage;