import request from '../utils/request';

export async function getPressesByName(name: string) {
  const { data } = await request({
    method: 'get',
    url: '/api/press?name=' + name
  });
  return data;
}
