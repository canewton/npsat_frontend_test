import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';

import { store } from '../store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <title>NPSAT</title>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
        <link
          rel="apple-touch-icon"
          href="/images/apple-touch-icon.png"
          key="apple"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
          key="icon32"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
          key="icon16"
        />
        <link rel="icon" href="/images/favicon.ico" key="favicon" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  );
}
export default MyApp;
