import { IncomingMessage } from "http";
import dynamic from "next/dynamic";
import React from "react";
import { IntlProvider, IntlConfig } from "react-intl";

export type Locale = keyof typeof localeProviders;
export const isLocale = (x: unknown): x is Locale => x in localeProviders;

const defaultLocale: Locale = "en";

/**
 * Extracts the locale from the query or incomming request. Query takes precedence
 * over the incoming request. If the extracted locale is not supported by
 * the application (as defined by 'isLocale()'), then the default locale is returned.
 */
export const getLocale = async (
  query: Record<string, string | string[]>,
  req?: IncomingMessage
): Promise<Locale> => {
  if (isLocale(query.locale)) {
    return query.locale;
  }

  if (!process.browser && req) {
    const { default: accepts } = await import("accepts");
    const locale = accepts(req).language(Object.keys(localeProviders));
    if (isLocale(locale)) {
      return locale;
    }
  }

  return defaultLocale;
};

/**
 * This record defines which locales are supported by the application. The keys
 * in this record are the locales, and values are ReactIntl providers.
 */
export const localeProviders = (() => {
  const mkProvider = (locale: string) => (m: {
    default: IntlConfig["messages"];
  }) => ({ children }: { children?: React.ReactNode }) => (
    <IntlProvider locale={locale} messages={m.default}>
      {children}
    </IntlProvider>
  );

  return {
    en: dynamic(() =>
      import(/* webpackChunkName: "locale/en" */ "./locales/en").then(
        mkProvider("en")
      )
    ),
    de: dynamic(() =>
      import(/* webpackChunkName: "locale/de" */ "./locales/de").then(
        mkProvider("de")
      )
    ),
  };
})();
