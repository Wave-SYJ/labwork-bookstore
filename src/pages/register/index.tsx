import React from 'react';
import router from 'next/router';
import { message } from 'antd';
import { Card, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';

import { register } from '../../api/auth';
import { login } from '../../utils/token';

export default function RegisterPage() {
  const handleSubmit = async (values: any) => {
    await register(values);
    await login(values, false);
    message.success('注册成功');
    // router.push('/cart');
  };

  return (
    <>
      <NavBar />
      <div className={styles.registerWrapper}>
        <Card title='注册' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form onFinish={handleSubmit} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }}>
            <Form.Item
              label='用户名'
              name='username'
              rules={[
                { required: true, message: '请输入用户名！' },
                { max: 15, message: '用户名长度需在 3 ~ 15 之间' },
                { min: 3, message: '用户名长度需在 3 ~ 15 之间' }
              ]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
              label='密码'
              name='password'
              rules={[
                { required: true, message: '请输入密码！' },
                { max: 18, message: '密码长度需在 6 ~ 18 之间' },
                { min: 6, message: '用户名长度需在 6 ~ 18 之间' }
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label='确认密码'
              name='confirm'
              dependencies={['password']}
              rules={[
                { required: true, message: '请再次输入一遍密码！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码输入不相同'));
                  }
                })
              ]}
            >
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
              <Button type='primary' htmlType='submit'>
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
