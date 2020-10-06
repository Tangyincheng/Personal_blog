import { request } from 'umi';

import { ipUrl, ipUrlDefault } from '../utils/utils';
import { articleStateType, newType } from './API';

// 添加分类
export async function addArticleType(params: newType) {
  return request<articleStateType>(`${ipUrl}addArticleType`, {
    method: 'POST',
    data: params,
  });
}

// 删除分类
export async function deleteArticle(params: number) {
  return request(`${ipUrl}delArticleType/${params}`);
}

// 修改分类
export async function upDateType(params: newType) {
  return request<articleStateType>(`${ipUrl}upDateArticleType`, {
    method: 'POST',
    data: params,
  });
}