import { login as loginApi, mutateUser } from '../api/auth';
import Cookies from 'js-cookie';

export async function login(form: { username: String; password: String }, rememberMe: boolean) {
  const token = await loginApi(form, rememberMe);
  Cookies.set('token', token.data, {
    expires: 365 // token 何时过期由后端决定，这里赋一足够长的时间
  });
  mutateUser({ username: form.username });
}

export function logout() {
  Cookies.remove('token');
  mutateUser(null, false);
}

export function getToken() {
  return Cookies.get('token');
}
