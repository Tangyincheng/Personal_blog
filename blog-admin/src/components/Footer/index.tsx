import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 yctang博客管理系统"
    links={[
      {
        key: 'yctang',
        title: 'yctang',
        href: 'http://www.yctang.club',
        blankTarget: true,
      }
    ]}
  />
);
