import { Button, Card, Divider, Form, Input, InputNumber, Select } from 'antd';
import React, { ReactNode, useState } from 'react';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss';
import InputAuthors from '../../components/InputAuthors';
import Language from '../../models/Language';
import { getLanguagesByName } from '../../api/language';
import Press from '../../models/Press';
import { getPressesByName } from '../../api/press';
import { getTypesByName } from '../../api/type';
import Category from '../../models/Category';

export default function CheckoutPage() {
  const handleSearchLanguages = async (value: string) => {
    const { data } = await getLanguagesByName(value);
    return data;
  };

  const handleSearchPress = async (value: string) => {
    const { data } = await getPressesByName(value);
    return data;
  };

  const handleSearchType = async (value: string) => {
    const { data } = await getTypesByName(value);
    return data;
  };

  const [languageList, setLanguageList] = useState([] as Language[]);
  const [pressList, setPressList] = useState([] as Press[]);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <NavBar />
      <div className={styles.addWrapper}>
        <Card title='添加书籍' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form onFinish={handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='作者' name='title' rules={[{ required: true, message: '请输入作者' }]}>
              <InputAuthors name='authors' />
            </Form.Item>
            <Form.Item label='语言' name={['language', 'id']}>
              <Select
                showSearch
                placeholder='输入语言名以搜索'
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={async (value: string) => setLanguageList(await handleSearchLanguages(value))}
                notFoundContent={null}
              >
                {languageList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='ISBN' name='isbn' rules={[{ required: true, message: '请输入 ISBN' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='价格' name='price' rules={[{ required: true, message: '请输入 ISBN' }]}>
              <InputNumber min={0} precision={2} step={0.01} />
            </Form.Item>
            <Form.Item label='图片' name='image'>
              <Input />
            </Form.Item>
            <Form.Item label='出版社' name={['press', 'id']}>
              <Select
                showSearch
                placeholder='输入出版社名以搜索'
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={async (value: string) => setPressList(await handleSearchPress(value))}
                notFoundContent={null}
              >
                {pressList.map((item) => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* <Form.Item label='分类' name='categories'>
              <SearchSelect placeholder='输入分类名以搜索' mode='tags' onSearch={handleSearchType} />
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  );
}
