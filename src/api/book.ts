import Book from '../models/Book';
import request from '../utils/request';

export async function insertBook(book: Book) {
  await request({
    url: '/api/book',
    method: 'put',
    data: book
  });
}
