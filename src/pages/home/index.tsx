import React from 'react';
import NavBar from '../../components/NavBar';
import styles from './style.module.scss';
import { Button } from 'antd';
import logoImg from '../../assets/img/book.svg';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <NavBar />

      <div className={styles.homePage}>
        <div className={styles.homeTitleContainer}>
          <Image className={styles.homeLogo} width={150} height={150} src={logoImg} alt='logo' />

          <div className={styles.homeTitles}>
            <header className={styles.homeTitle}>欢迎来到网上书城</header>
            <div className={styles.homeSubtitle}>The more you read, the more you know</div>
            <div className={styles.homeBtnGroup}>
              <Button style={{ marginRight: '32px' }} className={styles.homeBtn} type='primary' shape='round' size='large'>
                登录
              </Button>
              <Button className={styles.homeBtn} shape='round' size='large'>
                注册
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
