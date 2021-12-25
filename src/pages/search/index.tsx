import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';
import { List, Input, Image, Button, Pagination, InputNumber, Modal, message } from 'antd';
import { SearchOutlined, PlusOutlined, CloseOutlined, ExclamationCircleOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Search } = Input;
import { GetServerSideProps } from 'next';
import { deleteBook, searchBook, updateBookCount } from '../../api/book';
import SearchBookPayload from '../../models/SearchBookPayload';
import { makeUrl } from '../../utils/url';
import { useUser } from '../../api/auth';
import Book from '../../models/Book';
import { addBookToCart, CartItem, getCartList, removeBookFromCart } from '../../utils/cart';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pageNum = +(context.query?.pageNum || 1);
  const pageSize = +(context.query?.pageSize || 10);
  const keyword = context.query?.keyword as string;

  const searchData = await searchBook(keyword, pageNum, pageSize, context.req.cookies);

  return {
    props: {
      searchData,
      keyword: keyword ?? null
    }
  };
};

export default function SearchPage({ searchData, keyword }: { searchData: SearchBookPayload; keyword?: string }) {
  const router = useRouter();
  const { user } = useUser();
  const [cartList, setCartList] = useState([] as CartItem[]);

  useEffect(() => {
    setCartList(getCartList());
  }, []);

  const handlePageChange = (pageNum: number, pageSize?: number) => {
    router.push(
      makeUrl('/search', {
        pageNum: pageNum,
        pageSize,
        keyword
      })
    );
  };

  const handleSearch = (value: string) => {
    router.push(
      makeUrl('/search', {
        pageNum: searchData.pageNum,
        pageSize: searchData.pageSize,
        keyword: value
      })
    );
  };

  const handleDeleteBook = (book: Book) => {
    Modal.confirm({
      title: '确认',
      content: `是否要删除书籍《${book.title}》？`,
      icon: <ExclamationCircleOutlined />,
      async onOk() {
        handleRemoveFromCart(book.id);
        await deleteBook(book.id);
        router.reload();
      }
    });
  };

  const handleAddToCart = (bookId: string) => {
    addBookToCart(bookId);
    setCartList(getCartList());
  };

  const handleRemoveFromCart = (bookId: string) => {
    removeBookFromCart(bookId);
    setCartList(getCartList());
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [tmpBookInfo, setTmpBookInfo] = useState({
    bookId: '',
    count: 0
  });

  const handleUpdateBookNumber = async () => {
    await updateBookCount(tmpBookInfo.bookId, tmpBookInfo.count);
    message.success('修改成功');
    router.reload();
  };

  return (
    <>
      <NavBar />

      <Modal title='设置书籍数量' visible={modalVisible} onOk={handleUpdateBookNumber} onCancel={() => setModalVisible(false)}>
        <InputNumber
          size='large'
          min={1}
          value={tmpBookInfo.count}
          onChange={(value) =>
            setTmpBookInfo({
              ...tmpBookInfo,
              count: value
            })
          }
        />
      </Modal>

      <div className={styles.searchWrapper}>
        <div style={{ display: 'flex' }}>
          <Search
            defaultValue={keyword}
            prefix={<SearchOutlined />}
            placeholder='书名、作者、出版社、ISBN'
            enterButton='搜索'
            size='large'
            onSearch={handleSearch}
          />
          {user?.role === 1 && (
            <Button onClick={() => router.push('/add')} style={{ marginLeft: '10px' }} size='large'>
              添加书籍
            </Button>
          )}
        </div>
        <div className={styles.paneWrapper}>
          <div className={styles.leftPanes}>
            {searchData.statistics.map((paneData) => (
              <Fragment key={paneData.type}>
                <div className={styles.leftPaneTitle}>{paneData.title}</div>
                <List
                  className={styles.leftPaneList}
                  size='small'
                  bordered
                  dataSource={paneData.items}
                  renderItem={(item) => (
                    <List.Item key={item.id || item.category} className={styles.leftPaneListItem}>
                      <span className={styles.category}>{item.category}</span>
                      <span className={styles.count}>{item.count}</span>
                    </List.Item>
                  )}
                />
              </Fragment>
            ))}
          </div>
          <div className={styles.rightPane}>
            <div className={styles.rightTitle}>{searchData.total} 条结果</div>

            <List
              itemLayout='vertical'
              size='large'
              dataSource={searchData.list}
              renderItem={(book) => (
                <List.Item className={styles.book} key={book.id}>
                  <Image height={175} width={175} alt='book image' src={book.image} />
                  <div className={styles.bookDesc}>
                    <a onClick={()=>{router.push(`/book/${book.id}`)}} className={styles.bookTitle}>{book.title}</a>
                    <div className={styles.bookPrice}>¥ {book.price}</div>
                    <div className={styles.bookAuthors}>
                      {book.authors.map((author) => (
                        <span key={author.id} className={styles.bookAuthor}>
                          {author.country && `[${author.country}]`} {author.name} {author.role}
                        </span>
                      ))}
                      <span style={{ marginRight: '1em' }}>/</span>
                      <span>{book.press}</span>
                    </div>
                    <div className={styles.bookLanguageIsbn}>
                      <span>语言：{book.language}</span>
                      <span style={{ marginLeft: '1em' }}>ISBN：{book.isbn}</span>
                    </div>
                    <div className={styles.bookCategories}>
                      分类：
                      {book.categories.map((category) => (
                        <span className={styles.bookCategory} key={category.id}>
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <div className='styles.bookCount'>数量：{book.count}</div>

                    {cartList.findIndex((item) => item.id === book.id) === -1 ? (
                      <Button icon={<PlusOutlined />} className={styles.bookAddCartBtn} onClick={() => handleAddToCart(book.id)}>
                        加入购物车
                      </Button>
                    ) : (
                      <Button icon={<CheckOutlined />} className={styles.bookAddCartBtn} onClick={() => handleRemoveFromCart(book.id)}>
                        已加入购物车
                      </Button>
                    )}
                    {user?.role === 1 && (
                      <>
                        <Button
                          icon={<EditOutlined />}
                          onClick={() => {
                            setTmpBookInfo({
                              bookId: book.id,
                              count: book.count
                            });
                            setModalVisible(true);
                          }}
                          className={styles.deleteBookBtn}
                        >
                          修改数量
                        </Button>
                        <Button danger icon={<CloseOutlined />} onClick={() => handleDeleteBook(book)} className={styles.deleteBookBtn}>
                          删除
                        </Button>
                      </>
                    )}
                  </div>
                </List.Item>
              )}
            />

            <Pagination
              onChange={handlePageChange}
              showSizeChanger
              defaultCurrent={searchData.pageNum}
              total={searchData.total}
              defaultPageSize={searchData.pageSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
