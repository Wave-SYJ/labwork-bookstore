import type { AppProps } from 'next/app';
import React from 'react';
import '../assets/style/global.scss';

React.useLayoutEffect = React.useEffect;

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default App;
