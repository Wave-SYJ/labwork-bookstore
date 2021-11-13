import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import '../assets/style/global.scss';
import request from '../utils/request';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import 'antd/dist/antd.css';

React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url) => request.get(url).then((res) => res.data)
      }}
    >
      <ConfigProvider locale={zhCN}>
        <Component {...pageProps} />
      </ConfigProvider>
    </SWRConfig>
  );
}
export default App;
