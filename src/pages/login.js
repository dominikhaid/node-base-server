import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/Forms/DefaultLoginFrom';
import AuthProvider from '@/components/Auth/AuthListSmall';

export default function Login(props) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  const mainCon = {
    maxWidth: '700px',
    margin: 'auto',
    // border: '1px black solid',
    // borderRadius: '8px',
    boxShadow: '5px 20px 20px rgba(40,40,40,0.1)',
    padding: '2rem',
  };

  return (
    <React.Fragment>
      <div style={mainCon}>
        <LoginForm />
        <AuthProvider />
      </div>
    </React.Fragment>
  );
}
