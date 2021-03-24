/*
 * @Description: 文章类型组件
 * @Author: yctang
 */
import React, { useState, useEffect, useRef } from 'react'

import { Spin } from 'antd'
import '../public/style/components/ArticleType.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import { createFromIconfontCN } from '@ant-design/icons'
import Router from 'next/router'

const ArticleType = (props) => {
  const [navArray, setNavArray] = useState([])
  const [typeNum, setTypeNum] = useState([])
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [iconLink, setIconLink] = useState('')
  const typeRef = useRef()

  // 取消loading状态
  useEffect(() => {
    if (props.loading) {
      if (props.loading === 'false') {
        setLoading(false)
      }
    }
  }, [props])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then((res) => {
        return res.data.data
      })
      setNavArray(result)
    }
    const fetchTypeNum = async () => {
      const result = await axios(servicePath.getTypeNum).then((res) => {
        // console.log('res', res)
        return res.data.data
      })
      setTypeNum(result)
    }
    const fetchIconData = async () => {
      const result = await axios(servicePath.getBlogIcon).then((res) => {
        return res.data.data[0].icon_link
      })
      setIconLink(result)
    }
    fetchIconData()
    fetchTypeNum()
    fetchData()
  }, [])

  useEffect(() => {
    const temp = navArray
    if (typeNum.length > 0 && navArray.length > 0) {
      for (let i in navArray) {
        for (let j in typeNum) {
          if (navArray[i].Id == typeNum[j].type_id) {
            temp[i].typeNum = typeNum[j].num
          }
        }
      }
      for (let i in temp) {
        if (!temp[i].typeNum) {
          temp.typeNum = ''
        }
      }
      setData(temp)
    }
  }, [typeNum, navArray])

  // useEffect(() => {
  //   document.querySelectorAll('.articleType-items').forEach((item) => {
  //     item.addEventListener('mousemove', (e) => {
  //       let item = e.target
  //       let itemRect = item.getBoundingClientRect()
  //       let offset = Math.abs(e.clientY - itemRect.top) / itemRect.height

  //       let prev = item.previousElementSibling || null
  //       let next = item.nextElementSibling || null

  //       let scale = 0.6
  //       console.log('offset')
  //       resetScale()

  //       if (prev) {
  //         prev.style.setProperty('--scale', 1 + scale * Math.abs(offset - 1))
  //       }

  //       item.style.setProperty('--scale', 1 + scale)

  //       if (next) {
  //         next.style.setProperty('--scale', 1 + scale * offset)
  //       }
  //     })
  //   })
  //   document.querySelector('.articleType-div').addEventListener('mouseleave', (e) => {
  //     resetScale()
  //   })
  // }, [])

  //跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/')
    } else {
      Router.push('/List?id=' + e.Id + '&loading=' + loading + '&type=' + e.typeName)
    }
  }

  const resetScale = () => {
    document.querySelectorAll('.articleType-items').forEach((li) => {
      li.style.setProperty('--scale', 1)
    })
  }

  const MyIcon = createFromIconfontCN({
    scriptUrl: iconLink, // 在 iconfont.cn 上生成
  })

  return (
    <div className="articleType-div comm-box" style={{ backgroundClip: '#ccc' }} ref={typeRef}>
      <div className="articleType-header">
        <strong>博客分类</strong>
      </div>
      <Spin tip="加载中..." spinning={loading}>
        {data &&
          data.map((item) => (
            <div
              key={item.Id}
              onClick={() => {
                handleClick(item)
                setLoading(true)
              }}
              className="articleType-items"
            >
              <MyIcon type={item.icon} style={{ marginRight: '.5rem' }} />
              {item.typeName}
              {item.typeNum ? <span>({item.typeNum}篇)</span> : null}
            </div>
          ))}
      </Spin>
    </div>
  )
}

export default ArticleType
