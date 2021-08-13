import Author from './Author';
import Category from './Category';
import Language from './Language';
import Press from './Press';

export default interface Book {
  id: string;
  title: string;
  authors: Author[];
  language: Language;
  isbn: string;
  price: number;
  image: string;
  press: Press;
  categories: Category[];
}
