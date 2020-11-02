import React from 'react';
import DefaultTopBar from '@/components/Elements//Navbars/DefaultTopBar';

export default function DefaultHeader({appState, children}) {
  return (
    <>
      {children}
      <DefaultTopBar appState={appState} />
    </>
  );
}
