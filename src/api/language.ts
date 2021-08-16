import request from '../utils/request';

export async function getLanguagesByName(name: string) {
  const { data } = await request({
    method: 'get',
    url: '/api/language?name=' + name
  });
  return data;
}
