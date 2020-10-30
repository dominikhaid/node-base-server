import React from 'react';
import {Layout} from 'antd';
import {message} from 'antd';
import styled from 'styled-components';
import '../antd/antd.less';

import {AppProvider, AppContext} from '@/context/AppProvider';

import DefaultHeader from '@/components/Layout/DefaultHeader';
import DefaultFooter from '@/components/Layout/DefaultFooter';

export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.debug('METRIC', metric);
  }
}

export default function MyApp({Component, pageProps}) {
  function serverFun() {
    // ADD THINGS TO PAGE PROP
    // console.debug('App SERVER', pageProps);
  }

  if (!process.browser) {
    serverFun();
  }

  const {Header, Content, Footer} = Layout;

  message.config({
    top: '20vh',
    duration: 2,
    maxCount: 3,
    rtl: false,
    prefixCls: 'ant-message',
  });

  const StyledContent = styled(Content)`
    width: calc(100% - 6rem);
    margin: 3rem 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(120, 120, 120, 0.2);
  `;

  const StyledLayout = styled(Layout)`
    grid-template-rows: auto minmax(200px, 1fr) auto;
    position: relative;
    min-height: 100vh;
  `;

  const StyledFooter = styled(Footer)`
    background: inherit;
  `;

  // async function getUser(email) {
  //   let url = `http://localhost/api/customers/search/${email}`;
  //   const response = await fetch(url, {
  //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'no-cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  //     credentials: 'same-origin', // include, *same-origin, omit
  //     headers: {
  //       'Content-Type': 'application/json',
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     redirect: 'follow',
  //     referrerPolicy: 'no-referrer',
  //   });

  //   let data = await response.json();

  //   if (data.success) return data.success;
  //   return false;
  // }

  return (
    <AppProvider>
      <AppContext.Consumer>
        {appState => {
          if (pageProps.products) appState.products = pageProps.products;
          if (pageProps.user) appState.user = pageProps.user;
          if (pageProps.card) appState.card = pageProps.card;

          //TESTING
          if (
            appState.products.length > 0 &&
            !appState.card.products.length > 0 &&
            appState.card.products
          ) {
            appState.card.products = appState.products;
            appState.card.products[0].quantity = appState.products[0].quantity = 10;
          }
          return (
            <>
              <StyledLayout className="layout">
                <Header>
                  <DefaultHeader {...appState} />
                </Header>
                <StyledContent>
                  <Component appState={appState} />
                </StyledContent>
                <StyledFooter>
                  <DefaultFooter {...appState} />
                </StyledFooter>
              </StyledLayout>
            </>
          );
        }}
      </AppContext.Consumer>
    </AppProvider>
  );
}
