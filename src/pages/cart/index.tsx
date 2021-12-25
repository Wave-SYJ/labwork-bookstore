/* eslint-disable react/display-name */
import { Button, Descriptions, Divider, Form, Input, InputNumber, List, message, Steps, Table, Image } from 'antd';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './style.module.scss';
import NavBar from '../../components/GlobalNavBar';
import { GetServerSideProps } from 'next';
import { findBook } from '../../api/book';
import Book from '../../models/Book';
import { addBookToCart, CartItem, getCartList, removeBookFromCart } from '../../utils/cart';
import Decimal from 'decimal.js';
import { LeftOutlined, RightOutlined, CheckOutlined } from '@ant-design/icons';
import { getMyOrders, submitOrder } from '../../api/order';
import Router from 'next/router';
import Order from '../../models/Order';

export const getServerSideProps: GetServerSideProps = async (context) => {
  let cartList = getCartList(context.req.cookies);
  for (let i = 0; i < cartList.length; i++) {
    if (cartList[i].count === 0) continue;
    for (let j = i + 1; j < cartList.length; j++)
      if (cartList[i].id === cartList[j].id) {
        cartList[i].count += cartList[j].count;
        cartList[j].count = 0;
      }
  }
  cartList = cartList.filter((item) => (item.count > 0));
  const books = await Promise.all(
    cartList.map((item) =>
      findBook(item.id, context.req.cookies).then((res) => {
        return { ...res, purNum: item.count }
      })
    )
  );
  console.log("books:", books, cartList, new Date());
  return {
    props: {
      books,
      cartList,
    }
  };
};

export default function CartPage({ cartList, books }: { cartList: CartItem[]; books: Book[] }) {
  const router = useRouter();

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'image',
      key: 'image',
      render: (image: string | undefined) => <Image width={120} alt='book image' src={image} />,
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '商品单价',
      dataIndex: 'price',
      key: 'price',
      render: (price: any) => <span>{`￥${price}`}</span>
    },
    {
      title: '数量',
      dataIndex: 'purNum',
      key: 'purNum',
      render: (purNum: any, record: any) => {
        return <>
          <InputNumber defaultValue={purNum} disabled={true}></InputNumber>
        </>
      }
    },
    {
      title: '小计',
      dataIndex: 'purNum',
      key: 'sum',
      render: (purNum: any, record: any) => {
        return <>
          ￥{(purNum * record.price).toFixed(2)}
        </>
      }
    },
    {
      title: '小计',
      dataIndex: 'id',
      key: 'sum',

      render: (id: any) => {
        const handleRemove = () => {
          removeBookFromCart(id)
          message.success(`删除成功`);
          router.reload();
        }
        return <>
          <Button onClick={handleRemove}>删除</Button>
        </>
      }
    }
  ]
  // const data=[
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //   }
  // ]
  return (
    <>
      <NavBar />
      <main className={styles.cartWrapper}>
        <Table columns={columns} dataSource={books} />
        <div style={{display:'flex',justifyContent:'flex-end',marginTop:"20px"}}>
          <Button type="primary" size='large' onClick={()=>router.push("/checkout")}>提交订单</Button>
        </div>
      </main>
    </>
  );
}
