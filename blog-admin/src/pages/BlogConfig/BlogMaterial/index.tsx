import React from 'react';
import {
  Card,
  Upload,
  Button,
  message
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';

import { ipUrl } from '@/utils/utils';

const BlogMaterial: React.FC<{}> = () => {

  const newBlogMaterial = () => { }

  const props = {
    name: 'file',
    action: 'http://localhost:7001/admin/upLoadMaterial',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info: any) {
      console.log('1111111111', info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败！`);
      }
    },
  };

  return (
    <PageContainer>
      <Card title="图片素材" extra={
        <Upload {...props}>
          <Button type="primary" icon={<UploadOutlined />} >添加素材</Button>
        </Upload>
      }>
        待开发...
      </Card>
    </PageContainer>
  )
}

export default BlogMaterial;