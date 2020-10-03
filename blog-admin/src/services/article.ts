import { request } from 'umi';
import { stringify } from 'qs';

import { ipUrl, ipUrlDefault } from '../utils/utils';

import { articleType } from './API.d';

/**
 * 文章列表
 */
export async function getArticleList() {
  return request(`${ipUrl}getArticleList`);
};

/**
 * 文章类型
 */
export async function getArticleType() {
  return request(`${ipUrl}getTypeInfo`);
};

/**
 * 删除文章
 */
export async function deleteArticle(params: string) {
  return request(`${ipUrl}delArticle/${params}`);
};

/**
 * 添加文章
 */
export async function addArticle(params: articleType) {
  return request(`${ipUrl}addArticle`, {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params: articleType) {
  return request(`${ipUrl}updateArticle`, {
    method: 'POST',
    data: params,
  });
}

export async function getArticleById(params: string) {
  return request(`${ipUrl}getArticleById/${params}`);
}