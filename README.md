The purpose of this repository is to provide an example how to set up [Next.js][nextjs] for multi-locale support, with focus on:

- Semantically correct output, eg. sets `<html lang=…>`
- Working bundle splitting. Translation strings and other locale-specific content is loaded dynamically and doesn't increase the main bundle size.

This example uses [react-intl] as the internationalization (i18n) engine. Most of the code is not specific to react-intl though, so it should be possible without too much effort to switch to something else, such as [lingui].

The locale is stored primarily in the first path segment, eg. `/en/about` is used for the english version of the about page.

When switching then locale, this example performs a full page reload. While it certainly would be possible to implement it using a regular Next.js page transition, there are many considirations to take into account. For example the `<html lang=…>` needs to be updated, correct polyfills need to be loaded etc. It's cleaner to forego all of this and do a full page reload.

Not all files in this repository are relevant to the example. For example you can ignore `next-env.d.ts` and `tsconfig.json` if you are not using TypeScript. If you decide to dive right into the code (which I don't recommend, you should read this README to the end), start with these files:

- [src/pages/\_document.tsx](src/pages/_document.tsx)
- [src/pages/\_app.tsx](src/pages/_app.tsx)
- [src/pages/index.tsx](src/pages/index.tsx)
- [src/pages/[locale]/index.tsx](src/pages/[locale]/index.tsx)
- [src/locale.tsx](src/locale.tsx)

# Decision Time

There is one decision you have to make, and relates to the first-load behaviour of the index (`/`) page. You have different options, depending on whether your site uses SSR or not.

#### SSR

Extract the desired locale from the request (`Accept-Language` header), and render the page in that locale. On the client, replace the URL so that it points to the locale-specific page. When the user reloads the page, they will directly get that page.

Make sure to include the `Vary: Accept-Language` header in the response!

Note that this approach prevents Next.js from performing [Automatic Static Optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization).

#### Static Export

#### Option 1: Render an empty page and redirect to a supported locale on the client.

Use `window.location.pathname = …` to redirect the user to an appropriate page.

#### Option 2: Render the index page in a specific locale, and use `Router.replace()` on the client to fix the path.

Pick one locale that you want to render the index page in (eg. the locale that you expect most users to use). Then on the client replace the URL with the locale-specific page.

Option 1 is more user-friendly, in that you will honor the users' preferred locale, but incurs a network round-trip (the FCP/TTI/… times increase by about 15-100ms depending on network conditions). Option 2 is better if most of your audience uses a known locale.

---

# DO NOT READ BELOW

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
