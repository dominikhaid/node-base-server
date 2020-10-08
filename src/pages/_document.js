import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    //console.log('Document Loaded', initialProps)
    return {...initialProps};
  }

  render() {
    return (
      <Html lang="de">
        <Head>
          <meta charSet="UTF-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link
            href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
