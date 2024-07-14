import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="scrollbar scrollbar-thick">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
