import React from 'react';
import DefaultTopBar from '@/components/Elements//Navbars/DefaultTopBar';

export default function DefaultHeader(props) {
  return (
    <>
      {props.children}
      <DefaultTopBar />
    </>
  );
}
