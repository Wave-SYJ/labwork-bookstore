import React from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss';

export default function LoginPage() {
  return (
    <>
      <NavBar />

      <div className={styles.loginWrapper}>
        <Card title='登录' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} initialValues={{ remember: true }}>
            <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名！' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码！' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 4, span: 20 }}>
              <Checkbox style={{ lineHeight: '32px' }}>记住我</Checkbox>

              <Button type='link' style={{ float: 'right' }}>
                忘记密码
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Button type='primary'>登录</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
