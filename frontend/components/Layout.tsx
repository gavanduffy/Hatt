import Head from 'next/head';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export function Layout({ title, description, children }: LayoutProps) {
  const pageTitle = title ? `${title} · Hatt Directory` : 'Hatt Directory';
  const pageDescription =
    description ??
    'Browse and search a curated directory of media download and streaming sources with offline-ready PWA support.';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Head>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}
