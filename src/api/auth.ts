import request from '../utils/request';
import useSWR, { mutate } from 'swr';
import { getToken } from '../utils/token';
import { MutatorCallback } from 'swr/dist/types';

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

export function useUser() {
  const { data, error, mutate } = useSWR('/api/user', (url) => (getToken() ? request.get(url).then((res) => res.data) : null));

  return {
    user: data && data.data,
    loading: !error && !data,
    error: error,
    mutate
  };
}

export function mutateUser(data?: any | Promise<any> | MutatorCallback<any>, shouldRevalidate?: boolean) {
  mutate('/api/user', data, shouldRevalidate);
}
