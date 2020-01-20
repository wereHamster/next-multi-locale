import { IncomingMessage } from "http";

export const supportedLanguages = ["en", "de"];
export const defaultLanguage = "en";

export const getLocale = async (
  query: Record<string, string | string[]>,
  req?: IncomingMessage
): Promise<string> => {
  if (typeof query.locale === "string") {
    return query.locale;
  } else if (!process.browser && req) {
    const { default: accepts } = await import("accepts");
    return accepts(req).language(supportedLanguages) || defaultLanguage;
  } else {
    return defaultLanguage;
  }
};
