import { Button, Descriptions, Divider, Form, Input, List, message, Steps, Table } from 'antd';
import React, { useState } from 'react';
import styles from './style.module.scss';
import NavBar from '../../components/GlobalNavBar';
import { GetServerSideProps } from 'next';
import { CartItem, clearCart, getCartList } from '../../utils/cart';
import { findBook } from '../../api/book';
import Book from '../../models/Book';
import Decimal from 'decimal.js';
import { LeftOutlined, RightOutlined, CheckOutlined } from '@ant-design/icons';
import { getMyOrders, submitOrder } from '../../api/order';
import Router from 'next/router';
import Order from '../../models/Order';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cartList = getCartList(context.req.cookies);
  const books = await Promise.all(
    cartList.map((item) =>
      findBook(item.id, context.req.cookies).then((res) => {
        res.count = cartList.find((item) => item.id === res.id)?.count ?? 0;
        return res;
      })
    )
  );

  const orders = await getMyOrders(context.req.cookies);

  return {
    props: {
      orders,
      books,
      cartList,
      totalPrice: books
        .map((book) => new Decimal(book.price).mul(new Decimal(book.count)))
        .reduce((pre, cur) => pre.add(cur))
        .toString()
    }
  };
};

export default function CheckoutPage({ orders, cartList, books, totalPrice }: { orders: Order[]; cartList: CartItem[]; books: Book[]; totalPrice: string }) {
  const [form] = Form.useForm();
  const [info, setInfo] = useState({
    targetPlace: '',
    creditCard: ''
  });

  const ConfirmBookList = (
    <Table<Book> dataSource={books} footer={() => '总价：' + totalPrice} pagination={false}>
      <Table.Column<Book> key='title' title='标题' dataIndex='title' />
      <Table.Column<Book> key='isbn' title='ISBN' dataIndex='isbn' />
      <Table.Column<Book> key='price' title='单价' dataIndex='price' render={(text) => `${text} 元`} />
      <Table.Column<Book> key='count' title='购买数量' dataIndex='count' />
    </Table>
  );

  const FillInformation = (
    <Form form={form} style={{ margin: '0 20%' }} onFinish={(values) => setInfo(values)}>
      <Form.Item name='targetPlace' label='收货地址' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name='creditCard' label='银行卡号' rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Form>
  );

  const FinalConfirm = (
    <div style={{ marginBottom: '20px' }}>
      <Descriptions bordered title='收货信息' size='middle'>
        <Descriptions.Item label='收货地址'>{info.targetPlace}</Descriptions.Item>
        <Descriptions.Item label='银行卡号'>{info.creditCard}</Descriptions.Item>
      </Descriptions>
    </div>
  );

  const [currentStep, setCurrentStep] = useState(0);

  const handleNextPage = async () => {
    if (currentStep == 1) {
      await form.validateFields();
      form.submit();
    }
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async () => {
    await submitOrder(info.targetPlace, info.creditCard, cartList);
    message.success('提交成功');
    clearCart();

    setTimeout(() => {
      Router.reload();
    }, 1000);
  };

  const HistoryOrders = (
    <List
      pagination={{
        pageSize: 3
      }}
      itemLayout='vertical'
      size='large'
      dataSource={orders}
      renderItem={(order) => (
        <List.Item>
          <Descriptions title={order.book.title}>
            <Descriptions.Item label='价格'>{order.book.price}</Descriptions.Item>
            <Descriptions.Item label='作者'>
              {order.book.authors.map((author) => (
                <span key={author.id} className={styles.bookAuthor}>
                  {author.country && `[${author.country}]`} {author.name} {author.role}
                </span>
              ))}
            </Descriptions.Item>
            <Descriptions.Item label='购买数量'>{order.number}</Descriptions.Item>
            <Descriptions.Item label='送货地址'>{order.targetPlace}</Descriptions.Item>
            <Descriptions.Item label='银行卡号'>{order.creditCard}</Descriptions.Item>
          </Descriptions>
        </List.Item>
      )}
    />
  );

  return (
    <>
      <NavBar />
      <div className={styles.checkoutWrapper}>
        <Steps size='small' current={currentStep} style={{ marginBottom: '10px' }}>
          <Steps.Step title='确认书单' />
          <Steps.Step title='填写信息' />
          <Steps.Step title='最终确认' />
        </Steps>

        {currentStep == 0 && ConfirmBookList}

        {currentStep == 1 && FillInformation}

        {currentStep == 2 && FinalConfirm}
        {currentStep == 2 && ConfirmBookList}

        <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Button
            disabled={currentStep == 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            shape='round'
            icon={<LeftOutlined />}
            size='large'
            style={{ marginRight: '40px' }}
          >
            上一页
          </Button>
          {currentStep < 2 ? (
            <Button onClick={() => handleNextPage()} shape='round' icon={<RightOutlined />} size='large'>
              下一页
            </Button>
          ) : (
            <Button onClick={() => handleSubmit()} shape='round' icon={<CheckOutlined />} size='large'>
              提交
            </Button>
          )}
        </div>

        <Divider>以下为历史订单</Divider>

        {HistoryOrders}
      </div>
    </>
  );
}
