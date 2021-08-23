import Book from '../models/Book';
import SearchBookPayload from '../models/SearchBookPayload';
import request from '../utils/request';

export async function insertBook(book: Book) {
  await request({
    url: '/api/book',
    method: 'put',
    data: book
  });
}

export async function searchBook(keyword?: string, pageNum?: number, pageSize?: number) {
  pageNum = pageNum ?? 1;
  pageSize = pageSize ?? 10;
  const { data } = await request({
    url: '/api/book',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      keyword
    }
  });
  return data.data as SearchBookPayload;
}
