import { Menu } from 'antd';
import { useRouter } from 'next/router';
import React, { memo, ReactNode } from 'react';
import GlobalNavBar from '../GlobalNavBar';
import styles from './style.module.scss';

export default memo(function HelpMenuBar(props: { children?: ReactNode }) {
  const router = useRouter();
  const page = router.pathname.match(/^\/[^\/]*\/[^\/]*/);

  const handleMenuClicked = ({ key }: { key: React.Key }) => {
    router.push(key as string);
  };

  return (
    <>
      <GlobalNavBar />
      <div className={styles.mainWrapper}>
        <Menu className={styles.menu} selectedKeys={page ? [page[0]] : undefined} onClick={handleMenuClicked}>
          <Menu.ItemGroup title='帮助中心'>
            <Menu.Item key='/help/introduction'>网站简介</Menu.Item>
            <Menu.Item key='/help/faq'>常见问题</Menu.Item>
            <Menu.Item key='/help/rules'>用户守则</Menu.Item>
            <Menu.Item key='/help/contact'>联系我们</Menu.Item>
          </Menu.ItemGroup>
        </Menu>

        <div className={styles.content}>{props.children}</div>
      </div>
    </>
  );
});
