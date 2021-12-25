import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../../components/GlobalNavBar';
import styles from './style.module.scss';
import { List, Input, Image, Button, Pagination, InputNumber, Modal, message, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, CloseOutlined, ExclamationCircleOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Search } = Input;
import { GetServerSideProps } from 'next';
import { deleteBook, searchBook, updateBookCount, findBook } from '../../../api/book';
import SearchBookPayload from '../../../models/SearchBookPayload';
import { makeUrl } from '../../../utils/url';
import { useUser } from '../../../api/auth';
import Book from '../../../models/Book';
import { addBookToCart, CartItem, getCartList, removeBookFromCart } from '../../../utils/cart';
import Item from 'antd/lib/list/Item';


export const getServerSideProps: GetServerSideProps = async (context) => {
  // const pageNum = +(context.query?.pageNum || 1);
  // const pageSize = +(context.query?.pageSize || 10);
  // const keyword = context.query?.keyword as string;
  const bookId = context.query?.id as string;

  let book;

  try {
    book = await findBook(bookId, context.req.cookies);
  } catch (err) {
  }
  console.log("book", book);

  return {
    props: {
      book,
    }
  };
};

export default function BookDetail({ book }: { book: Book }) {
  const router = useRouter();
  const { user } = useUser();
  const [purNum, setPurNum] = useState(1)



  const handleAdd= async()=>{
    await updateBookCount(book.id,purNum);
    message.success(`添加成功${purNum}本${book.title}`);
    router.reload();
  }

  console.log("book", book);

  return (
    <>
      <NavBar />
      <div className={styles.detailWrapper}>
        <div className={styles.tagWrapper}>
          <div style={{ fontSize: "16px", marginRight: "10px", fontWeight: "bold" }}>书籍分类:</div>
          {
            book.categories.map((item: any) => (
              <div style={{ fontSize: "14px", color: "#FFF", backgroundColor: "#2db7f5", padding: "2px 6px", borderRadius: "2px", marginRight: "3px" }} key={item.id}>
                {item.name}
              </div>
            ))
          }
        </div>
        <div className={styles.paneWrapper}>
          <div className={styles.pictureWrapper}>
            <Image width={320} alt='book image' src={book.image} />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.bookTitle}>
              <div className={styles.bookLanguage}>{book.language}</div>
              <div style={{ borderBottom: "2px solid black" }}>{book.title}</div>
            </div>
            <div className={styles.authorWrapper}>
              <div className={styles.lineWrapper}>
                <div className={styles.head}>作者<span></span></div>：
                {book.authors.map((item: any) => (
                  <div key={item.id} className={styles.author}>
                    {(item.country && `[${item.country}]` || "") + ` ${item.name} ${item.role}`}
                  </div>
                ))}
              </div>
              <div className={styles.lineWrapper}>
                <div className={styles.head}>出版社<span></span></div>：
                {`${book.press}`}
              </div>
              <div className={styles.lineWrapper}>
                <div className={styles.head}>书号<span></span></div>：
                {`${book.isbn}`}
              </div>
            </div>
            <div className={styles.priceWrapper}>
              ¥  {book.price}
            </div>
            <div className={styles.pur}>
                <InputNumber style={{marginRight:"10px"}} size="large" min={1} onChange={setPurNum}></InputNumber>
                <Button size="large" onClick={handleAdd}><strong>加入购物车</strong></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
