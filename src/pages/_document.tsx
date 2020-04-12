import Document, { DocumentContext, Head, Main, NextScript } from "next/document";
import React from "react";
import { getLocale, Locale } from "../locale";

export default class extends Document<{ locale: Locale }> {
  static async getInitialProps(context: DocumentContext) {
    return {
      ...(await super.getInitialProps(context)),
      locale: await getLocale(context.query, context.req),
    };
  }

  render() {
    const { locale } = this.props;

    return (
      <html lang={locale}>
        <Head />
        <body>
          <Main />
          <script
            src={`https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${locale}`}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
