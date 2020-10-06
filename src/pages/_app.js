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
    //ADD THINGS TO PAGE PROP
    // console.debug('App SERVER', pageProps);
  }

  if (!process.browser) {
    serverFun();
  }

  return (
    <AppProvider>
      <AppContext.Consumer>
        {appState => {
          return (
            <>
              <DefaultHeader {...pageProps} {...appState} />

              <main>
                <Component {...pageProps} {...appState} />
              </main>

              <DefaultFooter
                style={{textAlign: 'center'}}
                {...pageProps}
                {...appState}
              />
            </>
          );
        }}
      </AppContext.Consumer>
    </AppProvider>
  );
}
