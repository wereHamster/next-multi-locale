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
            as="/en"
            href={{ pathname: "/[locale]", query: { locale: "en" } }}
          >
            <Button component="a" href="/en">EN</Button>
          </Link>
        </li>
        <li>
          <Link
            as="/de"
            href={{ pathname: "/[locale]", query: { locale: "de" } }}
          >
            <Button component="a" href="/de">DE</Button>
          </Link>
        </li>
      </ul>
      <div>
        msg: <FormattedMessage id="k" defaultMessage="K" />
      </div>
    </div>
  );
};
