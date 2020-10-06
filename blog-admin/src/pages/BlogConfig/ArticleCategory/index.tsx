import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import BlogClassification from '@/components/BlogClassification';

const BlogConfig: React.FC<{}> = () => {

  return (
    <PageContainer>
      <BlogClassification />
    </PageContainer>
  )
}

export default BlogConfig;