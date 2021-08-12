import request from '../utils/request';

export async function login(form: { username: String; password: String }, rememberMe: boolean) {
  const { data } = await request({
    url: '/api/auth/login?remember=' + rememberMe,
    method: 'post',
    data: form
  });
  return data;
}

export async function register(form: { username: String; password: String }) {
  await request({
    url: '/api/auth/register',
    method: 'post',
    data: form
  });
}
