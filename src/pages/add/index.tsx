import { Button, Card, Form, Input, InputNumber, message } from 'antd';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';
import InputAuthors from '../../components/InputAuthors';
import { insertBook } from '../../api/book';

export default function CheckoutPage() {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    if (values && values.categories)
      values.categories = values.categories
        .split(' ')
        .filter((category: string) => !!category)
        .map((category: string) => ({ name: category }));
    await insertBook(values);
    form.resetFields();
    message.success('添加书籍成功！');
  };

  return (
    <>
      <NavBar />
      <div className={styles.addWrapper}>
        <Card title='添加书籍' headStyle={{ textAlign: 'center' }} style={{ width: 500 }}>
          <Form form={form} onFinish={handleSubmit} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='作者' name='title' rules={[{ required: true, message: '请输入作者' }]}>
              <InputAuthors name='authors' />
            </Form.Item>
            <Form.Item label='语言' name='language'>
              <Input placeholder='语言名，如“中文”“英文”或“德文”等' />
            </Form.Item>
            <Form.Item label='ISBN' name='isbn' rules={[{ required: true, message: '请输入 ISBN' }]}>
              <Input />
            </Form.Item>
            <Form.Item label='价格' name='price' rules={[{ required: true, message: '请输入 ISBN' }]}>
              <InputNumber min={0} precision={2} step={0.01} />
            </Form.Item>
            <Form.Item label='数量' name='count' rules={[{ required: true, message: '请输入数量' }]}>
              <InputNumber min={1} precision={0} step={1} />
            </Form.Item>
            <Form.Item label='图片' name='image'>
              <Input />
            </Form.Item>
            <Form.Item label='出版社' name='press'>
              <Input placeholder='出版社名' />
            </Form.Item>
            <Form.Item label='分类' name='categories'>
              <Input placeholder='分类名，以空格分割' />
            </Form.Item>
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
