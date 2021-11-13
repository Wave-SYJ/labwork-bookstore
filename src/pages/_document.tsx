import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react';

// https://github.com/ant-design/ant-design/issues/30396#issuecomment-927299855
React.useLayoutEffect = React.useEffect;

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
