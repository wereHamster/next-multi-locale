Locale is selected through (in order of priority)

- Query Param: `/en/page?locale=fr` will serve the page in french, ie. the explicit query param (`?locale=…`) overwrites the implicit query param in the path (`/[locale]/…`). This form is not expect to be used outside of development or debugging sessions.
- Path: `/en/page` will serve the page in english.
- `Accept-Language` header when rendering the page on the server (SSR).

TODO: What if the locale is not one which is supported? (eg. when accessing `/favicon.ico`)?

The purposes of `_document` and `_app` are pretty straight forward:

- \_document: Uses the locale to render the appropriate HTML document (`<html lang=…>`), and injects required Intl polyfills.
- \_app: Loads translations and wraps the page in a `<IntlProvider>`.

Because _document emits locale-specific output, you should do a full page reload when switching locales. While it's possible to do a soft reload (_app handles changing locales just fine), the user will end up with the wrong markup in the document and potententially missing polyfills.

For the main index page (`/`) we have two options:

 - 1. Render an empty page and redirect:
   - SSR: Redirect the client (HTTP 302) to the locale-specific index page (eg. `/en`).
   - SSG: Redirect to the locale-specific page using `window.location.pathname = …`.

 - 2. Render the index page in the correct locale, and use `Router.replace()` on the client to fix the path.

Option 1 is simple, but incurs a around-trip. Option 2 immediately renders the page, but in case of SSG the user will be presented the page in the default locale instead of their preferred locale (because we have to decide at SSG time what to render).
