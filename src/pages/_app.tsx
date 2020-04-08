import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import {ThemeProvider} from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <>
        <Head>
          <title>My page</title>
          <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}
