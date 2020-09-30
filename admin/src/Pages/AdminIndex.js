import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  PieChartOutlined,
  FileOutlined,
  DiffOutlined,
  ReadOutlined,
  PlusSquareOutlined
} from '@ant-design/icons';
import { Route } from "react-router-dom";

import AddArticle from './AddArticle';
import ArticleList from './ArticleList';
import CountInfo from './CountInfo';
import LeaveMessage from './LeaveMessage';
import '../static/css/AdminIndex.css';
import { OmitProps } from 'antd/lib/transfer/ListBody';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const [firstBreadcrumb, setFirstBreadcrumb] = useState('');
  const [secondtBreadcrumb, setSecondBreadcrumb] = useState('');

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  const handleClickMenu = (e) => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add');
      setFirstBreadcrumb('文章管理');
      setSecondBreadcrumb('添加文章');
    } else if (e.key === 'articleList') {
      props.history.push('/index/list');
      setFirstBreadcrumb('文章管理');
      setSecondBreadcrumb('文章列表');
    } else if (e.key === 'countInfo') {
      props.history.push('/index/countInfo');
      setFirstBreadcrumb('统计信息');
      setSecondBreadcrumb('');
    } else if (e.key === 'leaveMessage') {
      props.history.push('/index/leaveMessage');
      setFirstBreadcrumb('留言管理');
      setSecondBreadcrumb('');
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="countInfo" icon={<PieChartOutlined />} onClick={handleClickMenu}>
            统计信息
          </Menu.Item>
          <SubMenu key="sub1" icon={<DiffOutlined />} title="文章管理" onClick={handleClickMenu}>
            <Menu.Item key="addArticle" icon={<PlusSquareOutlined />}>添加文章</Menu.Item>
            <Menu.Item key="articleList" icon={<ReadOutlined />}>文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="leaveMessage" icon={<FileOutlined />} onClick={handleClickMenu}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '20px 0' }}>
            <Breadcrumb.Item>{firstBreadcrumb}</Breadcrumb.Item>
            <Breadcrumb.Item>{secondtBreadcrumb}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list/" exact component={ArticleList} />
              <Route path="/index/countInfo/" exact component={CountInfo} />
              <Route path="/index/leaveMessage/" exact component={LeaveMessage} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>蜀ICP备20009871号</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;