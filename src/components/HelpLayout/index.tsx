import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, ReactNode } from 'react';
import GlobalNavBar from '../GlobalNavBar';
import styles from './style.module.scss';

export default memo(function HelpMenuBar(props: { children?: ReactNode }) {
  const router = useRouter();
  const page = router.query.page as string;

  const handleMenuClicked = ({ key }: { key: React.Key }) => {
    router.push('/help/' + (key as string));
  };

  return (
    <>
      <GlobalNavBar />
      <div className={styles.mainWrapper}>
        <Menu className={styles.menu} selectedKeys={page ? [page] : undefined} onClick={handleMenuClicked}>
          <Menu.ItemGroup title='帮助中心'>
            <Menu.Item key='introduction'>网站简介</Menu.Item>
            <Menu.Item key='faq'>常见问题</Menu.Item>
            <Menu.Item key='rules'>用户守则</Menu.Item>
            <Menu.Item key='contact'>联系我们</Menu.Item>
          </Menu.ItemGroup>
        </Menu>

        {props.children}
      </div>
    </>
  );
});
