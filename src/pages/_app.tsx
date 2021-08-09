import type { AppProps } from 'next/app';
import '../assets/style/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
