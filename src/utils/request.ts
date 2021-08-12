import axios from 'axios';
import RestResult from '../models/RestResult';
import { getToken, logout } from './token';
import { message } from 'antd';

const instance = axios.create();

instance.interceptors.request.use(function (request) {
  request.headers = {
    ...request.headers,
    'Security-Token': getToken()
  };
  return request;
});

instance.interceptors.response.use(
  function (response) {
    const data: RestResult = response.data;
    if (data && !data.success) {
      if (data.code === 401) logout();

      message.error(data.data);
      return Promise.reject(response);
    }
    return response;
  },
  function () {
    message.error('服务器未知错误');
    return Promise.reject({ success: false, code: 500, message: 'Internal Server Error', data: '服务器未知错误' } as RestResult);
  }
);

export default instance;
