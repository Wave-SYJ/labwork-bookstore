import Author from './Author';
import Category from './Category';

export default interface Book {
  id: string;
  title: string;
  authors: Author[];
  language: string;
  isbn: string;
  price: number;
  image: string;
  press: string;
  categories: Category[];
  count: number;
}
