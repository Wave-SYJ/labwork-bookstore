import request from '../utils/request';

export async function register(form: { username: String; password: String }) {
  await request({
    url: '/api/register',
    method: 'post',
    data: form
  });
}
