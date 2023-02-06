import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { DefaultLayout } from '@/components/layouts/default';
import { theme } from 'theme';

import '../styles/globals.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </MantineProvider>
    </>
  );
}
