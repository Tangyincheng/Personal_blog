import React from 'react';

import { Timeline } from 'antd';

import '../public/style/components/blogEvent.css';

const BlogEvent = () => {

  return (
    <div className="comm-box blogEvent-div">
      <div className="blogEvent-header"><strong>博客大事件</strong></div>
      <div className="blogEvent-content">
        <Timeline>
          <Timeline.Item>2020-09-01 博客上线</Timeline.Item>
          {/* <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item> */}
        </Timeline>
      </div>
    </div>
  )
}

export default BlogEvent;