import React, { useEffect, useState } from 'react'
import axios from 'axios'

import '../public/style/components/friendsLink.css'
import servicePath from '../config/apiUrl'

const FriendsLink = () => {
  const [frindsLink, setFrindsLink] = useState([])

  useEffect(() => {
    const getFrindsLinkData = async () => {
      const result = await axios(servicePath.getFrindsLink).then((res) => {
        return res.data.data
      })
      setFrindsLink(result)
    }

    getFrindsLinkData()
  }, [])

  return (
    <div className="comm-box friendsLink-div">
      <div className="friendsLink-header">
        <strong>友情链接</strong>
      </div>
      <div className="lineMove"></div>
      <div className="friendsLink-content">
        {frindsLink.map((item) => {
          return (
            <div key={item.key} className="content-item">
              <a href={item.link} target="_blank">
                {item.content}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FriendsLink
