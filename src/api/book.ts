import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Book from '../models/Book';
import SearchBookPayload from '../models/SearchBookPayload';
import request, { withAuth } from '../utils/request';

export async function insertBook(book: Book) {
  await request({
    url: '/api/book',
    method: 'put',
    data: book
  });
}

export async function searchBook(keyword?: string, pageNum?: number, pageSize?: number, cookies?: NextApiRequestCookies) {
  pageNum = pageNum ?? 1;
  pageSize = pageSize ?? 10;
  const { data } = await withAuth(
    request,
    {
      url: '/api/book',
      method: 'get',
      params: {
        pageNum,
        pageSize,
        keyword
      }
    },
    cookies
  );
  return data.data as SearchBookPayload;
}

export async function deleteBook(bookId: string) {
  await request({
    url: '/api/book?id=' + bookId,
    method: 'delete'
  });
}

export async function findBook(bookId: string, cookies?: NextApiRequestCookies) {
  const { data } = await withAuth(
    request,
    {
      url: '/api/book/' + bookId,
      method: 'get'
    },
    cookies
  );
  return data.data as Book;
}
