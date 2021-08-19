import { Typography } from 'antd';
const { Title, Paragraph } = Typography;
import React from 'react';
import HelpLayout from '../../components/HelpLayout';

export default function ContactPage() {
  return (
    <HelpLayout>
      <Typography>
        <Title>联系我们</Title>
        <Paragraph>71119115 孙雨佳</Paragraph>
        <Paragraph>sun1yu1jia1@outlook.com</Paragraph>
      </Typography>
    </HelpLayout>
  );
}
