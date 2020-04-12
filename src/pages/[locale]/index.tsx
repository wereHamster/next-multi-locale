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
          <a href="/en">EN</a>
        </li>
        <li>
          <a href="/de">DE</a>
        </li>
      </ul>
      <div>
        msg: <FormattedMessage id="k" defaultMessage="K" />
      </div>
    </div>
  );
};
