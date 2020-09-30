import React, { useState, useEffect } from 'react';
import { Statistic, Row, Col } from 'antd';
import servicePath from '../config/apiUrl';
import axios from 'axios';


function CountInfo() {

  const [blogInfo, setBlogInfo] = useState({})

  useEffect(() => {
    axios({
      method: 'get',
      url: servicePath.getBlogCountNum,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        setBlogInfo(res.data.data[0])
      }
    )
  }, [])

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="总文章数" value={blogInfo.blog_count} />
      </Col>
      <Col span={12}>
        <Statistic title="总访问人数" value={blogInfo.view_count} />
      </Col>
    </Row>
  )
}

export default CountInfo;