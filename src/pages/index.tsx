import { NextPageContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { getLocale } from "../locale";
import Index from "./[locale]/index";

const Page = ({ locale }) => {
  const router = useRouter();

  React.useEffect(() => {
    // const navigatorLanguage = navigator.language.split("-")[0];
    // const locale = supportedLanguages.includes(navigatorLanguage)
    //   ? navigatorLanguage
    //   : defaultLanguage;
    // window.location.pathname = `/${locale}`;
    router.replace(`/${locale}`);
  });

  return <Index />;
};

Page.getInitialProps = async (pageContext: NextPageContext) => {
  if (pageContext.res) {
    pageContext.res.setHeader(
      "Vary",
      [pageContext.res.getHeader("Vary"), "Accept-Language"]
        .filter(Boolean)
        .join(",")
    );
  }

  return { locale: await getLocale(pageContext.query, pageContext.req) };
};

export default Page;
