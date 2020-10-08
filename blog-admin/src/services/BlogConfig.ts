import { request } from 'umi';

import { ipUrl, ipUrlDefault } from '../utils/utils';
import { articleStateType, newType, blogEventType, friendshipLink } from './API';

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

// 博客事件-查询
export async function getBlogEventData() {
  return request(`${ipUrl}getBlogEvent`);
}

// 博客事件-添加
export async function addBlogEvent(params: blogEventType) {
  return request<articleStateType>(`${ipUrl}addBlogEvent`, {
    method: 'POST',
    data: params,
  });
}

// 博客事件-修改
export async function updateBlogEvent(params: blogEventType) {
  return request<articleStateType>(`${ipUrl}upDateBlogEvent`, {
    method: 'POST',
    data: params,
  });
}

// 博客事件-删除
export async function deleteBlogEvent(params: number) {
  return request(`${ipUrl}delBlogEvent/${params}`);
}

// 友情链接-查询
export async function getFrindsLinkData() {
  return request(`${ipUrl}getFrindsLink`);
}

// 友情链接-添加
export async function addFrindLink(params: friendshipLink) {
  return request<articleStateType>(`${ipUrl}addFrindLink`, {
    method: 'POST',
    data: params,
  });
}

// 友情链接-修改
export async function updateFrindLink(params: friendshipLink) {
  return request<articleStateType>(`${ipUrl}updateFrindLink`, {
    method: 'POST',
    data: params,
  });
}

// 友情链接-删除
export async function deleteFindLink(params: number) {
  return request(`${ipUrl}deleteFindLink/${params}`);
}