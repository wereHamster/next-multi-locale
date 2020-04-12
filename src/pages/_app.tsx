import App, { AppContext } from "next/app";
import React from "react";
import { getLocale, Locale, localeProviders } from "../locale";

export default class extends App<{ locale: Locale }> {
  static getInitialProps = async (appContext: AppContext) => {
    return {
      ...(await App.getInitialProps(appContext)),
      locale: await getLocale(appContext.router.query, appContext.ctx.req),
    };
  };

  render() {
    const { Component, pageProps, locale } = this.props;
    const LocaleProvider = localeProviders[locale];

    return (
      <LocaleProvider>
        <Component {...pageProps} />
      </LocaleProvider>
    );
  }
}
