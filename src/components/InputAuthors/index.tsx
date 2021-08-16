import { Col, Input, Row, Form, Button, Space } from 'antd';
import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export default function InputAuthors(props: { name: string }) {
  return (
    <>
      <Form.List name={props.name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} align='baseline'>
                {console.log(restField)}
                <Form.Item {...restField} name={[name, 'country']} fieldKey={[fieldKey, 'country']}>
                  <Input placeholder='国家' />
                </Form.Item>

                <Form.Item {...restField} name={[name, 'name']} fieldKey={[fieldKey, 'name']}>
                  <Input placeholder='姓名' />
                </Form.Item>

                <Form.Item {...restField} name={[name, 'role']} fieldKey={[fieldKey, 'role']}>
                  <Input placeholder='角色，如“著”' />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item style={{ marginBottom: '0' }}>
              <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                添加一项
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
}
