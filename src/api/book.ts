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

export async function searchBook() {
  const { data } = await request({
    url: '/api/book',
    method: 'get'
  });
  return data.data as SearchBookPayload;
}
