import type { AppProps } from 'next/app';
import '../assets/style/global.scss';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default App;
