import Book from './Book';
import User from './User';

export default interface Order {
  id: string;
  time: number;
  number: number;
  targetPlace: string;
  creditCard: string;
  book: Book;
  user: User;
}
