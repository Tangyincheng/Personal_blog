import { request } from 'umi';

import { ipUrl, ipUrlDefault } from '../utils/utils';

export interface LoginParamsType {
  userName: string;
  password: string;
  // mobile: string;
  // captcha: string;
  // type: string;
}

export async function AIP_Login(params: LoginParamsType) {
  return request<API.LoginStateType>(`${ipUrl}checkLogin`, {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
