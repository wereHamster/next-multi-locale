import App, { AppContext } from "next/app";
import dynamic from "next/dynamic";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { getLocale } from "../locale";

export default function MyApp({ Component, pageProps, router, locale }) {
  console.log("AppLocale", { locale, pageProps });

  const LocaleProvider = localeProvider[locale];
  if (!LocaleProvider) {
    return <Component {...pageProps} />;
  }

  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    ...(await App.getInitialProps(appContext)),
    locale: await getLocale(appContext.router.query, appContext.ctx.req)
  };
};

const localeProvider = (() => {
  const mkProvider = (locale: string) => (m: {
    default: Record<string, string>;
  }) => ({ children }: { children?: React.ReactNode }) => (
    <IntlProvider locale={locale} messages={m.default}>
      {children}
    </IntlProvider>
  );

  return {
    en: dynamic(() =>
      import(/* webpackChunkName: "locale/en" */ "../locales/en").then(
        mkProvider("en")
      )
    ),
    de: dynamic(() =>
      import(/* webpackChunkName: "locale/de" */ "../locales/de").then(
        mkProvider("de")
      )
    )
  };
})();
