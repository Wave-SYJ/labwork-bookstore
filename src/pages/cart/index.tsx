import React, { Fragment, useEffect, useState } from 'react';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';
import { List, Input, Image, Button, Pagination, InputNumber, Modal, message, Tag } from 'antd';
import { SearchOutlined, PlusOutlined, CloseOutlined, ExclamationCircleOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
const { Search } = Input;
import { GetServerSideProps } from 'next';
import { deleteBook, searchBook, updateBookCount, findBook } from '../../api/book';
import SearchBookPayload from '../../models/SearchBookPayload';
import { makeUrl } from '../../utils/url';
import { useUser } from '../../api/auth';
import Book from '../../models/Book';
import { addBookToCart, CartItem, getCartList, removeBookFromCart } from '../../utils/cart';
import Item from 'antd/lib/list/Item';

export default function CartPage() {
  useEffect(() => {
      console.log(getCartList());
    }
  )
  return (
    <>
      <NavBar />
      
    </>
  );
}
