import React from 'react';

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
          return (
            <>
              <DefaultHeader {...appState} />

              <main>
                <Component {...appState} />
              </main>

              <DefaultFooter style={{textAlign: 'center'}} {...appState} />
            </>
          );
        }}
      </AppContext.Consumer>
    </AppProvider>
  );
}
