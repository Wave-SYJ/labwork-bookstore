import React from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss';

export default function RegisterPage() {
  return (
    <>
      <NavBar />
      <div className={styles.registerWrapper}>
        <Card title='注册' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={{ remember: true }}>
            <Form.Item label='用户名' name='username' hasFeedback rules={[{ required: true, message: '请输入用户名！' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item label='密码' name='password' hasFeedback rules={[{ required: true, message: '请输入密码！' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item
              label='确认密码'
              name='confirm'
              hasFeedback
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
              <Button type='primary'>注册</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
