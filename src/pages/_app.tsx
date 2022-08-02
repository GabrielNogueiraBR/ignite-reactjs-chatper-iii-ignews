import { AppProps } from "next/app";
import { Header } from "../components/Header";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

import Link from "next/link";
import { PrismicProvider } from "@prismicio/react";
import { PrismicPreview } from "@prismicio/next";
import { linkResolver, ignewsRepository } from "../services/prismicio";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider
        linkResolver={linkResolver}
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={ignewsRepository}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
