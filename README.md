The purpose of this repository is to provide an example how to set up [Next.js][nextjs] for multi-locale support, with focus on:

- Semantically correct output, eg. sets `<html lang=…>`
- Working bundle splitting. Translation strings and other locale-specific content is loaded dynamically and doesn't increase the main bundle size.

This example uses [react-intl] as the internationalization (i18n) engine. Most of the code is not specific to react-intl though, so it should be possible without too much effort to switch to something else, such as [lingui].

The locale is stored primarily in the first path segment, eg. `/en/about` is used for the english version of the about page.

When switching then locale, this example performs a full page reload. While it certainly would be possible to implement it using a regular Next.js page transition, there are many considirations to take into account. For example the `<html lang=…>` needs to be updated, correct polyfills need to be loaded etc. It's cleaner to forego all of this and do a full page reload.

# Decision Time

There is one decision you have to make, and relates to the first-load behaviour of the index (`/`) page. You have two options:

#### Render an empty page and redirect

- SSR: Redirect the client (HTTP 302) to the locale-specific index page (eg. `/en`).
- SSG: Redirect to the locale-specific page using `window.location.pathname = …`.

#### Render the index page in a specific locale, and use `Router.replace()` on the client to fix the path.

- SSR: Extract the locale from the `Accept-Language` header.
- SSG: Use the default locale.

Option 1 is simple, but incurs a around-trip. Option 2 immediately renders the page, but in case of SSG the user will be presented the page in the default locale instead of their preferred locale (because we have to decide at SSG time what to render).

---

Locale is selected through (in order of priority)

- Query Param: `/en/page?locale=fr` will serve the page in french, ie. the explicit query param (`?locale=…`) overwrites the implicit query param in the path (`/[locale]/…`). This form is not expect to be used outside of development or debugging sessions.
- Path: `/en/page` will serve the page in english.
- `Accept-Language` header when rendering the page on the server (SSR).

TODO: What if the locale is not one which is supported? (eg. when accessing `/favicon.ico`)?

The purposes of `_document` and `_app` are pretty straight forward:

- \_document: Uses the locale to render the appropriate HTML document (`<html lang=…>`), and injects required Intl polyfills.
- \_app: Loads translations and wraps the page in a `<IntlProvider>`.

Because \_document emits locale-specific output, you should do a full page reload when switching locales. While it's possible to do a soft reload (\_app handles changing locales just fine), the user will end up with the wrong markup in the document and potententially missing polyfills.

For the main index page (`/`) we have two options:

[nextjs]: https://nextjs.org
[react-intl]: https://github.com/formatjs/react-intl
[lingui]: https://lingui.js.org