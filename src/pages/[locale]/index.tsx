import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export default () => {
  return (
    <div>
      <ul>
        <li>
          <Link as="/" href={{ pathname: "/" }}>
            <a href="/">index</a>
          </Link>
        </li>
        <li>
          <Link
            as="/en"
            href={{ pathname: "/[locale]", query: { locale: "en" } }}
          >
            <a href="/en">EN</a>
          </Link>
        </li>
        <li>
          <Link
            as="/de"
            href={{ pathname: "/[locale]", query: { locale: "de" } }}
          >
            <a href="/de">DE</a>
          </Link>
        </li>
      </ul>
      <div>
        msg: <FormattedMessage id="k" defaultMessage="K" />
      </div>
    </div>
  );
};
