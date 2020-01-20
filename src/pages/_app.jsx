import App from "next/app";
import dynamic from "next/dynamic";
import * as React from "react";
import { IntlProvider } from "react-intl";

export default function MyApp({ Component, pageProps, router }) {
  const { locale } = router.query;
  console.log("App", { locale });

  const LocaleProvider = localeProvider[locale];
  if (!LocaleProvider) {
    return null;
  }


  return (
    <LocaleProvider>
      <Component {...pageProps} />
    </LocaleProvider>
  );
}

MyApp.getInitialProps = async appContext => {
  return { ...(await App.getInitialProps(appContext)) };
};

const localeProvider = (() => {
  const mkProvider = locale => m => ({ children }) => (
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
