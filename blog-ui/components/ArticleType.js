/*
 * @Description: 文章类型组件
 * @Author: yctang
 */
import React, { useState, useEffect } from 'react';

import { Spin } from 'antd';
import '../public/style/components/ArticleType.css';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import { createFromIconfontCN } from '@ant-design/icons';
import Router from 'next/router';

const ArticleType = (props) => {

  const [navArray, setNavArray] = useState([]);
  const [typeNum, setTypeNum] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)

  // 取消loading状态
  useEffect(() => {
    if (props.loading) {
      if (props.loading === "false") {
        setLoading(false)
      }
    }
  }, [props])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        (res) => {
          return res.data.data;
        }
      )
      setNavArray(result);
    }
    const fetchTypeNum = async () => {
      const result = await axios(servicePath.getTypeNum).then(
        (res) => {
          // console.log('res', res)
          return res.data.data;
        }
      )
      setTypeNum(result)
    }
    fetchTypeNum()
    fetchData()
  }, [])

  useEffect(() => {
    const temp = navArray
    if (typeNum.length > 0 && navArray.length > 0) {
      for (let i in navArray) {
        for (let j in typeNum) {
          // console.log('navArray[i].orderNum == typeNum[j].type_id', navArray[i].orderNum == typeNum[j].type_id)
          if (navArray[i].orderNum == typeNum[j].type_id) {
            temp[i].typeNum = typeNum[j].num
            // console.log('temp[i].typeNum', temp[i])
          }
        }
      }
      for (let i in temp) {
        if (!temp[i].typeNum) {
          temp.typeNum = ''
        }
      }
      setData(temp)
      // console.log('temp', temp)
    }
  }, [typeNum, navArray])

  //跳转到列表页
  const handleClick = (e) => {
    // console.log('e', e)
    if (e.key == 0) {
      Router.push('/');
    } else {
      Router.push('/List?id=' + e.orderNum + '&loading=' + loading);
    }
  }

  const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1950182_4y2sddv63yx.js', // 在 iconfont.cn 上生成
  });

  return (
    <div className="articleType-div comm-box" style={{ backgroundClip: '#ccc' }}>
      <div className="articleType-header"><strong>博客分类</strong></div>
      <Spin tip="加载中..." spinning={loading}>
        {
          data && data.map((item) => (
            <div
              key={item.orderNum}
              onClick={() => { handleClick(item); setLoading(true) }}
              className="articleType-items"
            >
              <MyIcon type={item.icon} style={{ marginRight: '.5rem' }} />
              {item.typeName}
              {item.typeNum
                ? <span>({item.typeNum}篇)</span>
                : null
              }
            </div>
          ))
        }
      </Spin>
    </div>
  )
}

export default ArticleType