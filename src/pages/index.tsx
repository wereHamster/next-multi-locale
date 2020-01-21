import { NextPageContext } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { getLocale } from "../locale";
import Index from "./[locale]/index";

const Page = ({ locale }) => {
  const router = useRouter();

  console.log("Index Page", { locale });
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
  const locale = await getLocale(pageContext.query, pageContext.req);

  // if (!process.browser && pageContext.res && pageContext.res.writeHead) {
  //   pageContext.res.writeHead(302, {
  //     Location: `/${locale}`,
  //     Vary: "Accept-Language"
  //   });
  //   pageContext.res.end();
  // }

  console.log("Index Page getInitialProps");
  return { locale };
};

export default Page;
