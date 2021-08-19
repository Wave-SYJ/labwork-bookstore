import React from 'react';
import { useRouter } from 'next/router';
import NavBar from '../../components/GlobalNavBar';
import styles from './style.module.scss';
import { Button } from 'antd';
import logoImg from '../../assets/img/book.svg';
import Image from 'next/image';
import { useUser } from '../../api/auth';

export default function HomePage() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <>
      <NavBar />

      <div className={styles.homePage}>
        <div className={styles.homeTitleContainer}>
          <Image className={styles.homeLogo} width={150} height={150} src={logoImg} alt='logo' />

          <div className={styles.homeTitles}>
            <header className={styles.homeTitle}>欢迎来到网上书城</header>
            <div className={styles.homeSubtitle}>The more you read, the more you know</div>
            {!user && (
              <div className={styles.homeBtnGroup}>
                <Button
                  style={{ marginRight: '32px' }}
                  className={styles.homeBtn}
                  type='primary'
                  shape='round'
                  size='large'
                  onClick={() => router.push('/login')}
                >
                  登录
                </Button>
                <Button className={styles.homeBtn} shape='round' size='large' onClick={() => router.push('/register')}>
                  注册
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
