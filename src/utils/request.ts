import axios from 'axios';
import RestResult from '../models/RestResult';
import { getToken, logout } from './token';
import { message } from 'antd';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL
});

instance.interceptors.request.use(function (request) {
  const token = getToken();
  if (token)
    request.headers = {
      ...request.headers,
      'Security-Token': token
    };
  return request;
});

instance.interceptors.response.use(
  function (response) {
    const data: RestResult = response.data;
    if (data && !data.success) {
      if (data.code === 401) logout();

      if (typeof document !== 'undefined') message.error(data.data);
      return Promise.reject(response);
    }
    return response;
  },
  function (error) {
    if (typeof document !== 'undefined') message.error('服务器未知错误');
    else console.error(error);
    return Promise.reject({ success: false, code: 500, message: 'Internal Server Error', data: '服务器未知错误' } as RestResult);
  }
);

export default instance;
