import type { AppProps } from 'next/app';
import React from 'react';
import { SWRConfig } from 'swr';
import '../assets/style/global.scss';
import request from '../utils/request';

React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url) => request.get(url).then((res) => res.data)
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
export default App;
