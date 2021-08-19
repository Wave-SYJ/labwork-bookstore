import Book from './Book';

export interface StatisticsItem {
  id: string;
  category: string;
  count: number;
}

export interface Statistics {
  type: string;
  title: string;
  items: StatisticsItem[];
}

export default interface SearchBookPayload {
  total: number;

  pageNum: number;
  pageSize: number;
  pageCount: number;

  list: Book[];
  statistics: Statistics[];
}
