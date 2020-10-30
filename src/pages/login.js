import React from 'react';
import Link from 'next/link';
import LoginForm from '@/components/Forms/DefaultLoginFrom';

export default function Login({appState}) {
  if (!process.browser) {
    //console.debug('Home SERVER');
  } else {
    //console.debug('Home CLIENT', props);
  }

  return (
    <React.Fragment>
      <LoginForm user={appState.user} updateState={appState.updateState} />
    </React.Fragment>
  );
}
