import React, { useEffect, useState } from 'react';
import {
  Card,
  Upload,
  Button,
  message,
  Table,
  Image,
  Modal,
  Select
} from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined } from '@ant-design/icons';

import {
  getBlogMaterial,
} from '@/services/BlogConfig';
import { getArticleType } from '@/services/article';
import { materialType } from './data';
import { articleType } from '../../../components/BlogClassification/data';
import { ipUrl } from '@/utils/utils';

const { Option } = Select;

const BlogMaterial: React.FC<{}> = () => {

  const [materialData, setMaterialData] = useState<materialType[]>([]);
  const [articleType, setArticleType] = useState<articleType[]>([]);
  const [typeName, setTypeName] = useState<string>('');
  const [addVisible, setAddVisible] = useState<boolean>(false);

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: materialType, b: materialType) => a.id - b.id
    },
    {
      title: '缩略图',
      dataIndex: 'material_link',
      key: 'material_link',
      render: ((item: string) => {
        return <Image src={item} alt="" width={100} />
      })
    },
    {
      title: '链接',
      dataIndex: 'material_link',
      key: 'material_link',
    },
    {
      title: '名称',
      dataIndex: 'material_name',
      key: 'material_name',
    },
    {
      title: '分类',
      dataIndex: 'material_type',
      key: 'material_type',
      sorter: (a: materialType, b: materialType) => a.material_type.localeCompare(b.material_type)
    },
  ]

  const props = {
    name: 'file',
    action: `${ipUrl}upLoadMaterial?typeName=${typeName}`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info: any) {
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

  useEffect(() => {
    getBlogMaterial().then(res => {
      if (res.code == 1) {
        setMaterialData(res.data);
      }
    })

    getArticleType().then(res => {
      setArticleType(res.data);
    })
  }, [])


  return (
    <PageContainer>
      <Card title="图片素材" extra={
        <Button type="primary" icon={<UploadOutlined />} onClick={() => setAddVisible(true)}>添加素材</Button>
      }>
        <Table dataSource={materialData} columns={columns} />

        <Modal
          title="添加素材"
          visible={addVisible}
          // onOk={}
          onCancel={() => setAddVisible(false)}
          footer={null}
        >
          <div>
            <div>请选择素材分类:</div>
            <Select
              style={{ width: '200px', margin: '10px 0' }}
              onChange={e => setTypeName(e)}
            >
              {
                articleType.map(item => (
                  <Option
                    value={item.subTypeName}
                    key={item.Id}
                  >
                    {item.typeName}
                  </Option>
                ))
              }
            </Select>
            {
              typeName &&
              <div>
                <Upload
                  {...props}
                  withCredentials={true}
                >
                  <Button type="primary" icon={<UploadOutlined />} onClick={() => setAddVisible(true)}>选择素材</Button>
                </Upload>
              </div>
            }
          </div>
        </Modal>
      </Card>
    </PageContainer>
  )
}

export default BlogMaterial;