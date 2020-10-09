import { request } from 'umi';

import { ipUrl, ipUrlDefault } from '../utils/utils';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function AIP_Login(params: LoginParamsType) {
  return request<API.LoginStateType>(`${ipUrl}checkLogin`, {
    method: 'POST',
    data: params,
    credentials: 'include'
  });
}
