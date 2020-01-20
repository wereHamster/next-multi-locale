import { NextPageContext } from "next";
import * as React from "react";
import { supportedLanguages, defaultLanguage, getLocale } from "../locale";

const Page = ({ locale }) => {
  console.log("Index Page", { locale });
  React.useEffect(() => {
    const navigatorLanguage = navigator.language.split("-")[0];
    const locale = supportedLanguages.includes(navigatorLanguage)
      ? navigatorLanguage
      : defaultLanguage;
    // window.location.pathname = `/${locale}`;
  });

  return null;
};

Page.getInitialProps = async (pageContext: NextPageContext) => {
  const locale = await getLocale(pageContext.query, pageContext.req);

  if (!process.browser && pageContext.res && pageContext.res.writeHead) {
    pageContext.res.writeHead(302, {
      Location: `/${locale}`,
      Vary: "Accept-Language"
    });
    pageContext.res.end();
  }

  console.log("Index Page getInitialProps");
  return { locale };
};

export default Page;
