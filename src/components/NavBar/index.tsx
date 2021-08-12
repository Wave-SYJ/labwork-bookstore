import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'antd';
import styles from './style.module.scss';
import logoImg from '../../assets/img/book.svg';
import { useRouter } from 'next/router';
import { useUser } from '../../utils/auth';

export default memo(function NavBar() {
  const router = useRouter();
  const pathMatch = router.pathname.match(/^\/[^\/]*/);

  console.log(useUser());

  const handleMenuClicked = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <Link href='/home' passHref>
          <div className={styles.navbarLogo}>
            <Image height={20} width={20} src={logoImg} alt='logo' />
            <span style={{ marginLeft: '5px' }}>BOOKSTORE</span>
          </div>
        </Link>

        <Menu
          className={styles.navbarMenu}
          mode='horizontal'
          selectedKeys={pathMatch ? [pathMatch[0]] : undefined}
          style={{ fontSize: '16px', borderBottom: 'none' }}
          onClick={handleMenuClicked}
        >
          <Menu.Item key='/home'>主页</Menu.Item>
          <Menu.Item key='/search'>搜索</Menu.Item>
          <Menu.Item key='/cart'>购物车</Menu.Item>
          <Menu.Item key='/checkout'>结帐</Menu.Item>
          <Menu.Item key='/help'>帮助</Menu.Item>
          <Menu.Item key='/login'>登录</Menu.Item>
          <Menu.Item key='/register'>注册</Menu.Item>
        </Menu>
      </div>
    </div>
  );
});
