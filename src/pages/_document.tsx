import Document, {
  DocumentContext,
  Head,
  Main,
  NextScript
} from "next/document";
import { getLocale } from "../locale";

export default class extends Document<{ locale: undefined | string }> {
  static async getInitialProps(context: DocumentContext) {
    return {
      ...(await super.getInitialProps(context)),
      locale: await getLocale(context.query, context.req)
    };
  }

  render() {
    const { locale } = this.props;

    return (
      <html lang={locale}>
        <Head />
        <body>
          <Main />
          {locale && (
            <script
              src={`https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${locale}`}
            />
          )}
          <NextScript />
        </body>
      </html>
    );
  }
}
