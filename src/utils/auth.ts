import { login as loginApi } from '../api/auth';
import Cookies from 'js-cookie';
import useSWR from 'swr';

export async function login(form: { username: String; password: String }, rememberMe: boolean) {
  const token = await loginApi(form, rememberMe);
  Cookies.set('token', token.data, {
    expires: 365 // token 何时过期由后端决定，这里赋一足够长的时间
  });
}

export async function logout() {
  Cookies.remove('token');
}

export function getToken() {
  return Cookies.get('token');
}

export function useUser() {
  const { data, error } = useSWR('/api/user');

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  };
}
