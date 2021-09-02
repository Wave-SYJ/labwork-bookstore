import React from 'react';
import { Card, Form, Input, Checkbox, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';

import { login } from '../../utils/token';
import router from 'next/router';

export default function LoginPage() {
  const handleSubmit = async (values: any) => {
    await login(values, values.remember);
    router.push('/cart');
    message.success('登录成功');
  };

  return (
    <>
      <NavBar />

      <div className={styles.loginWrapper}>
        <Card title='登录' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form onFinish={handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }}>
            <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名！' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码！' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox style={{ lineHeight: '32px' }}>记住我</Checkbox>
              </Form.Item>

              <Button type='link' style={{ float: 'right' }}>
                忘记密码
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type='primary' htmlType='submit'>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
