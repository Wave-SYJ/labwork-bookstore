import Book from '../../models/Book';

const data = {
  total: 98280,
  pageNum: 1,
  pageSize: 20,
  pageCount: 100,
  list: [] as Book[],
  statistics: [
    {
      type: 'language',
      title: '语言',
      items: [
        { id: '1', catagory: '英语', count: 1222 },
        { id: '12', catagory: '英语', count: 1222 },
        { id: '3', catagory: '英语', count: 1222 },
        { id: '43', catagory: '英语', count: 1222 }
      ]
    },
    {
      type: 'catagory',
      title: '分类',
      items: [
        { id: '1', catagory: '综合性图书', count: 4519 },
        { id: '2', catagory: '综合性图书', count: 4519 },
        { id: '3', catagory: '综合性图书', count: 4519 },
        { id: '4', catagory: '综合性图书', count: 4519 },
        { id: '5', catagory: '综合性图书', count: 45195 }
      ]
    },
    {
      type: 'press',
      title: '出版社',
      items: [
        { id: '1', catagory: '商务印书馆', count: 3473 },
        { id: '2', catagory: '商务印书馆', count: 34739 },
        { id: '3', catagory: '商务印书馆', count: 34739 },
        { id: '4', catagory: '商务印书馆', count: 34739 },
        { id: '5', catagory: '商务印书馆', count: 34739 },
        { id: '6', catagory: '商务印书馆', count: 34739 },
        { id: '7', catagory: '商务印书馆', count: 34739 }
      ]
    }
  ]
};

export default data;
