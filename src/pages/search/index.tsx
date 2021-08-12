import React, { Fragment } from 'react';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss';
import searchData from './data';
import { List, Input, Image, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function SearchPage() {
  return (
    <>
      <NavBar />

      <div className={styles.searchWrapper}>
        <Search prefix={<SearchOutlined />} placeholder='书名、作者、出版社、ISBN' enterButton='搜索' size='large' />
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
                      <span className={styles.catagory}>{item.catagory}</span>
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
                  <Image height={150} width={150} src={book.image} />
                  <div className={styles.bookDesc}>
                    <div className={styles.bookTitle}>{book.title}</div>
                    <div className={styles.bookPrice}>¥ {book.price}</div>
                    <div className={styles.bookAuthors}>
                      {book.authors.map((author) => (
                        <span key={author.id} className={styles.bookAuthor}>
                          {author.country && `[${author.country}]`} {author.name} {author.role}
                        </span>
                      ))}
                      <span>/ {book.press.name}</span>
                    </div>
                    <div className={styles.bookLanguage}>语言：{book.language.name}</div>
                    <Button className={styles.bookAddCartBtn}>加入购物车</Button>
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
