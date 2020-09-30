import React, { useState, useEffect } from 'react';

import axios from 'axios';
import servicePath from '../config/apiUrl';

import '../public/style/components/statistics.css';

const Statistics = () => {

  const [blogCount, setBlogCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getBlogCountNum).then(
        (res) => {
          return res.data.data;
        }
      )
      setBlogCount(result);
    }
    fetchData();
  }, [])

  return (
    <div className="Statistics-div comm-box">
      <div className="Statistics-header">博客数据统计</div>
      <div className="Statistics-content">
        <div className="content-blog-count">
          <div>
            <span>文章总数：</span>
            <span className="count-item">{blogCount.length && blogCount[0].blog_count}</span>
          </div>
        </div>
        <div className="content-access-count">
          <div>
            <span>访问总数：</span>
            <span className="count-item">{blogCount.length && blogCount[0].view_count}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistics;