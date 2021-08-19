import React, { Fragment } from 'react';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';
import { List, Input, Image, Button } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Search } = Input;
import { GetServerSideProps } from 'next';
import { searchBook } from '../../api/book';
import SearchBookPayload from '../../models/SearchBookPayload';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchData = await searchBook();

  return {
    props: {
      searchData
    }
  };
};

export default function SearchPage({ searchData }: { searchData: SearchBookPayload }) {
  const router = useRouter();
  console.log(searchData);

  return (
    <>
      <NavBar />

      <div className={styles.searchWrapper}>
        <div style={{ display: 'flex' }}>
          <Search prefix={<SearchOutlined />} placeholder='书名、作者、出版社、ISBN' enterButton='搜索' size='large' />
          <Button onClick={() => router.push('/add')} style={{ marginLeft: '10px' }} size='large'>
            添加书籍
          </Button>
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
                    <List.Item key={item.id} className={styles.leftPaneListItem}>
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
                    <div className={styles.bookTitle}>{book.title}</div>
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
                    <Button icon={<PlusOutlined />} className={styles.bookAddCartBtn}>
                      加入购物车
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}
