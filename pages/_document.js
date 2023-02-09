import { Html, Head, Main, NextScript } from "next/document";

export default function Document () {

    return (
      <Html lang="fr">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#ED64A6" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
}