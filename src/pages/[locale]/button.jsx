import * as React from "react";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { Button } from "@material-ui/core"

export default () => {
  return (
    <div>
      <ul>
        <li>
          <Link
            as="/en/button"
            href={{ pathname: "/[locale]/button", query: { locale: "en" } }}
          >
            <Button component="a" href="/en/button">EN</Button>
          </Link>
        </li>
        <li>
          <Link
            as="/de/button"
            href={{ pathname: "/[locale]/button", query: { locale: "de" } }}
          >
            <Button component="a" href="/de/button">DE</Button>
          </Link>
        </li>
      </ul>
      <div>
        msg: <FormattedMessage id="k" defaultMessage="K" />
      </div>
    </div>
  );
};
