import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Timeline } from 'antd';

import servicePath from '../config/apiUrl';
import '../public/style/components/blogEvent.css';

const BlogEvent = () => {

  const [blogEventData, setBlogEventData] = useState([]);

  useEffect(() => {
    const getblogEventData = async () => {
      const result = await axios(servicePath.getBlogEvent).then(
        (res) => {
          return res.data.data;
        }
      )
      setBlogEventData(result)
    };

    getblogEventData();
  }, [])

  return (
    <div className="comm-box blogEvent-div">
      <div className="blogEvent-header"><strong>博客大事件</strong></div>
      <div className="blogEvent-content">
        <Timeline>
          {
            blogEventData.map(item => {
              return <Timeline.Item key={item.key}>{item.content}</Timeline.Item>
            })
          }
        </Timeline>
      </div>
    </div>
  )
}

export default BlogEvent;