import request from '../utils/request';

export async function getTypesByName(name: string) {
  const { data } = await request({
    method: 'get',
    url: '/api/type?name=' + name
  });
  return data;
}
